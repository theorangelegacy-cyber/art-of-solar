import { useRef, useMemo, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette, SMAA } from "@react-three/postprocessing";
import * as THREE from "three";

/* =====================================================================
   APPLE-GRADE QUANTUM ORANGE — Tower Defense Hero
   v3 — high-poly orange, refined PBR-ish shading, sleek turrets,
   premium lasers (thin core + soft halo + impact flash), sharp attackers.
   ===================================================================== */

/* ---------- Orange shader: smooth, sculpted, premium ---------- */

const orangeVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vWorldPos;
  varying vec3 vObjectPos;
  uniform float uTime;

  // tiny dimples — much subtler than before, Apple-product-grade
  float hash(vec3 p){ return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453); }
  float vnoise(vec3 p){
    vec3 i = floor(p); vec3 f = fract(p);
    f = f*f*(3.0-2.0*f);
    return mix(
      mix(mix(hash(i+vec3(0,0,0)), hash(i+vec3(1,0,0)), f.x),
          mix(hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)), f.x),
          mix(hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)), f.x), f.y),
      f.z);
  }

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vObjectPos = position;
    // very subtle, smooth dimples — much softer than before
    float n = vnoise(position * 8.0);
    vec3 displaced = position + normal * (n - 0.5) * 0.012;
    vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
    vViewDir = normalize(-mv.xyz);
    vWorldPos = (modelMatrix * vec4(displaced, 1.0)).xyz;
    gl_Position = projectionMatrix * mv;
  }
`;

const orangeFragment = /* glsl */ `
  precision highp float;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vWorldPos;
  varying vec3 vObjectPos;
  uniform float uTime;
  uniform vec3 uDeep;
  uniform vec3 uMid;
  uniform vec3 uHi;
  uniform vec3 uHotSpec;
  uniform vec3 uRim;
  uniform float uShield;

  float hash(vec3 p){ return fract(sin(dot(p, vec3(127.1,311.7,74.7)))*43758.5453); }
  float vnoise(vec3 p){
    vec3 i = floor(p); vec3 f = fract(p);
    f = f*f*(3.0-2.0*f);
    return mix(
      mix(mix(hash(i+vec3(0,0,0)), hash(i+vec3(1,0,0)), f.x),
          mix(hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)), f.x),
          mix(hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)), f.x), f.y),
      f.z);
  }
  float fbm(vec3 p){
    float v = 0.0; float a = 0.5;
    for(int i = 0; i < 4; i++){ v += a * vnoise(p); p *= 2.02; a *= 0.5; }
    return v;
  }

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vViewDir);
    vec3 L1 = normalize(vec3(0.55, 0.85, 0.65));   // key
    vec3 L2 = normalize(vec3(-0.6, -0.2, 0.4));    // fill (cool)

    float ndl1 = max(dot(N, L1), 0.0);
    float ndl2 = max(dot(N, L2), 0.0);
    float fres = pow(1.0 - max(dot(N, V), 0.0), 3.0);

    // Smoother peel: layered fbm at moderate freq — no aliasing pixels
    float peel = fbm(vObjectPos * 12.0);
    peel = smoothstep(0.35, 0.78, peel) * 0.22;

    // Base color: deep -> mid -> hi gradient driven by light direction
    vec3 base = mix(uDeep, uMid, ndl1 * 0.9 + 0.25);
    base = mix(base, uHi, pow(ndl1, 2.4) * 1.0);
    base += uHi * peel * 0.55;

    // Cool fill from opposite side adds dimensionality
    base += vec3(0.12, 0.06, 0.03) * ndl2;

    // Always-on ambient brightness so it never looks dim/pale
    base += uMid * 0.18;

    // Hot specular highlight (the Apple-glass key reflection)
    vec3 H1 = normalize(L1 + V);
    float spec = pow(max(dot(N, H1), 0.0), 96.0);
    base += uHotSpec * spec * 1.1;
    float spec2 = pow(max(dot(N, H1), 0.0), 24.0) * 0.22;
    base += uHotSpec * spec2;

    // Warm rim glow
    base += uRim * fres * 0.55;

    // Shield ripple on hit — bright cyan-green flash
    float ripple = sin(length(vWorldPos.xy) * 24.0 - uTime * 9.0);
    ripple = smoothstep(0.4, 1.0, ripple) * uShield;
    base += vec3(0.3, 1.0, 0.7) * ripple * 0.7;

    // Saturation boost
    float luma = dot(base, vec3(0.299, 0.587, 0.114));
    base = mix(vec3(luma), base, 1.25);

    // Gentle filmic — preserves vibrance better than Reinhard
    base = base / (base + vec3(0.85));
    base = pow(base, vec3(1.0/2.2));

    gl_FragColor = vec4(base, 1.0);
  }
`;

/* =====================================================================
   THE ORANGE
   ===================================================================== */

type ShieldRef = { value: number };

function QuantumOrange({
  scrollProgress, shieldRef, turretRefs, compact, orangeRef,
}: {
  scrollProgress: { current: number };
  shieldRef: ShieldRef;
  turretRefs: React.MutableRefObject<THREE.Group[]>;
  compact?: boolean;
  orangeRef: React.MutableRefObject<THREE.Group | null>;
}) {
  const matRef = useRef<THREE.ShaderMaterial>(null!);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uDeep: { value: new THREE.Color("#b22500") },   // deep orange-red
    uMid:  { value: new THREE.Color("#ff6a0a") },   // true vivid orange (less yellow)
    uHi:   { value: new THREE.Color("#ff9430") },   // warm orange highlight (not yellow)
    uHotSpec: { value: new THREE.Color("#fff0d8") },
    uRim:  { value: new THREE.Color("#ff7a1f") },
    uShield: { value: 0 },
  }), []);

  // 6 turret slots — golden-ratio sphere distribution
  const turretSlots = useMemo(() => {
    const slots: { pos: THREE.Vector3; quat: THREE.Quaternion }[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < 6; i++) {
      const y = 1 - (i / 5) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const pos = new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(1.0);
      const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), pos.clone().normalize());
      slots.push({ pos, quat });
    }
    return slots;
  }, []);

  useFrame((state, dt) => {
    uniforms.uTime.value += dt;
    shieldRef.value = Math.max(0, shieldRef.value - dt * 2.5);
    uniforms.uShield.value = shieldRef.value;
    if (orangeRef.current) {
      orangeRef.current.rotation.y += dt * 0.1;
      const baseScale = compact ? 0.42 : 0.65;
      const s = baseScale + scrollProgress.current * 0.08;
      orangeRef.current.scale.setScalar(s);
      orangeRef.current.position.x = compact ? 0 : 1.4;
      orangeRef.current.position.y = compact ? 0.05 : 0;
    }
  });

  return (
    <group ref={orangeRef}>
      {/* Main orange — high poly sphere for smooth silhouette */}
      <mesh>
        <sphereGeometry args={[1, 256, 256]} />
        <shaderMaterial
          ref={matRef}
          vertexShader={orangeVertex}
          fragmentShader={orangeFragment}
          uniforms={uniforms}
        />
      </mesh>

      {/* Outer atmospheric halo — soft fresnel sphere */}
      <mesh scale={1.04}>
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={{ uColor: { value: new THREE.Color("#ff8a3c") } }}
          vertexShader={`
            varying vec3 vN; varying vec3 vV;
            void main(){
              vN = normalize(normalMatrix * normal);
              vec4 mv = modelViewMatrix * vec4(position, 1.0);
              vV = normalize(-mv.xyz);
              gl_Position = projectionMatrix * mv;
            }
          `}
          fragmentShader={`
            varying vec3 vN; varying vec3 vV;
            uniform vec3 uColor;
            void main(){
              float fres = pow(1.0 - max(dot(normalize(vN), normalize(vV)), 0.0), 3.5);
              gl_FragColor = vec4(uColor, fres * 0.45);
            }
          `}
        />
      </mesh>

      {/* Stem — short woody nub */}
      <mesh position={[0, 1.005, 0]}>
        <cylinderGeometry args={[0.028, 0.045, 0.06, 24]} />
        <meshStandardMaterial color="#4a2410" roughness={0.85} metalness={0} />
      </mesh>

      {/* Leaf — larger, more prominent teardrop, double-sided */}
      <group position={[0.04, 1.04, 0]} rotation={[-0.32, 0.5, -0.6]} scale={1.7}>
        <mesh>
          <shapeGeometry args={[(() => {
            const s = new THREE.Shape();
            s.moveTo(0, 0);
            s.bezierCurveTo(0.06, 0.04, 0.13, 0.18, 0.10, 0.30);
            s.bezierCurveTo(0.07, 0.36, 0.02, 0.38, 0, 0.40);
            s.bezierCurveTo(-0.02, 0.38, -0.07, 0.36, -0.10, 0.30);
            s.bezierCurveTo(-0.13, 0.18, -0.06, 0.04, 0, 0);
            return s;
          })()]} />
          <meshStandardMaterial
            color="#3aa84a"
            roughness={0.5}
            metalness={0.08}
            side={THREE.DoubleSide}
            emissive="#0e4a20"
            emissiveIntensity={0.28}
          />
        </mesh>
        <mesh position={[0, 0.2, 0.001]}>
          <boxGeometry args={[0.008, 0.36, 0.001]} />
          <meshStandardMaterial color="#1a5a26" roughness={0.7} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* 6 invisible emitter anchors — the orange itself fires the lasers from these surface points */}
      {turretSlots.map((s, i) => (
        <group
          key={i}
          ref={(el) => { if (el) turretRefs.current[i] = el; }}
          position={s.pos}
          quaternion={s.quat}
        />
      ))}
    </group>
  );
}

/* =====================================================================
   ATTACKERS — geometric shapes with edge glow
   ===================================================================== */

type AttackerKind = "asteroid" | "ship" | "shard" | "drone";

interface Attacker {
  id: number;
  kind: AttackerKind;
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  rotSpeed: THREE.Vector3;
  hp: number;
  ref: THREE.Group | null;
  trailRef: THREE.Mesh | null;
  trailPositions: THREE.Vector3[];
  alive: boolean;
  scale: number;
  hue: number;
}

interface Laser {
  id: number;
  from: THREE.Vector3;
  to: THREE.Vector3;
  life: number;
  maxLife: number;
  phase: number;
  ref: THREE.Group | null;
}

interface Burst {
  id: number;
  pos: THREE.Vector3;
  life: number;
  maxLife: number;
  ref: THREE.Group | null;
  kind?: AttackerKind;
  debris?: {
    dir: THREE.Vector3;
    rot: THREE.Vector3;
    scale: number;
    shape: number; // 0..1 picks geometry variant
    tone: string;
  }[];
}

function spawnAttacker(id: number, center: THREE.Vector3, orangeRadius: number): Attacker {
  // True 360° spherical distribution (uniform on sphere)
  const u = Math.random();
  const v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  const dist = orangeRadius * (6.6 + Math.random() * 3.2);
  const direction = new THREE.Vector3(
    Math.sin(phi) * Math.cos(theta),
    Math.cos(phi),
    Math.sin(phi) * Math.sin(theta),
  );
  const pos = direction.clone().multiplyScalar(dist).add(center);
  const toCenter = center.clone().sub(pos).normalize();
  const tangentSeed = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
  const tangent = new THREE.Vector3().crossVectors(toCenter, tangentSeed);
  if (tangent.lengthSq() > 0) tangent.normalize().multiplyScalar((Math.random() - 0.5) * 0.1);
  const vel = toCenter.multiplyScalar(0.28 + Math.random() * 0.12).add(tangent);

  const kinds: AttackerKind[] = ["asteroid", "asteroid", "asteroid", "asteroid", "ship", "shard", "drone"];
  const kind = kinds[Math.floor(Math.random() * kinds.length)];
  const baseScale =
    kind === "ship" ? 0.15 + Math.random() * 0.09 :
    kind === "asteroid" ? 0.16 + Math.random() * 0.2 :
    kind === "shard" ? 0.14 + Math.random() * 0.08 :
    0.12 + Math.random() * 0.08;
  return {
    id,
    kind,
    pos,
    vel,
    rotSpeed: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).multiplyScalar(kind === "ship" ? 0.6 : 2.2),
    hp: kind === "ship" ? 3 : kind === "asteroid" ? 2 : 1,
    ref: null,
    trailRef: null,
    trailPositions: [],
    alive: true,
    scale: baseScale,
    hue: Math.random(),
  };
}

function AttackerMesh({ kind }: { kind: AttackerKind }) {
  if (kind === "ship") {
    // Cinematic alien ship — sleek dark hull, glowing cyan core, wingtip lights, engine glow
    return (
      <group>
        {/* main hull — flattened ellipsoid */}
        <mesh scale={[1, 0.34, 0.7]}>
          <sphereGeometry args={[0.26, 40, 20]} />
          <meshStandardMaterial color="#080912" metalness={0.95} roughness={0.18} emissive="#1a0040" emissiveIntensity={0.35} />
        </mesh>
        {/* dorsal canopy — translucent dome */}
        <mesh position={[0, 0.05, 0.02]} scale={[0.55, 0.22, 0.36]}>
          <sphereGeometry args={[0.26, 28, 14]} />
          <meshStandardMaterial color="#1d2540" metalness={0.6} roughness={0.05} emissive="#00d4ff" emissiveIntensity={0.6} transparent opacity={0.85} />
        </mesh>
        {/* underbelly plasma core */}
        <mesh position={[0, -0.05, 0]}>
          <sphereGeometry args={[0.07, 20, 20]} />
          <meshBasicMaterial color="#ff2d7a" />
        </mesh>
        <mesh position={[0, -0.05, 0]} scale={2.2}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color="#ff5da0" transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        {/* engine exhaust */}
        <mesh position={[0, 0, -0.18]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.05, 0.18, 12, 1, true]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
        </mesh>
        {/* wingtip lights */}
        <mesh position={[0.24, 0, 0]}><sphereGeometry args={[0.022, 10, 10]} /><meshBasicMaterial color="#ff5da0" /></mesh>
        <mesh position={[-0.24, 0, 0]}><sphereGeometry args={[0.022, 10, 10]} /><meshBasicMaterial color="#5dffb0" /></mesh>
        {/* wingtip halos */}
        <mesh position={[0.24, 0, 0]} scale={3}><sphereGeometry args={[0.022, 10, 10]} /><meshBasicMaterial color="#ff5da0" transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} /></mesh>
        <mesh position={[-0.24, 0, 0]} scale={3}><sphereGeometry args={[0.022, 10, 10]} /><meshBasicMaterial color="#5dffb0" transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} /></mesh>
      </group>
    );
  }

  if (kind === "asteroid") {
    // Rocky asteroid silhouette — cratered, dusty, no neon glow
    return (
      <group>
        <mesh rotation={[0.4, 0.8, 0.2]} scale={[1, 0.9, 0.82]}>
          <icosahedronGeometry args={[0.26, 1]} />
          <meshStandardMaterial color="#4b4038" roughness={1} metalness={0.02} flatShading />
        </mesh>
        <mesh position={[0.1, -0.03, 0.05]} scale={[0.45, 0.34, 0.4]} rotation={[0.2, 0.6, 1]}>
          <icosahedronGeometry args={[0.22, 0]} />
          <meshStandardMaterial color="#65554b" roughness={1} metalness={0.01} flatShading />
        </mesh>
        <mesh position={[-0.09, 0.05, -0.08]} scale={[0.24, 0.22, 0.22]}>
          <sphereGeometry args={[0.22, 10, 10]} />
          <meshStandardMaterial color="#3d332c" roughness={1} metalness={0} />
        </mesh>
        <mesh scale={1.12}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshBasicMaterial color="#8d7768" transparent opacity={0.08} depthWrite={false} />
        </mesh>
      </group>
    );
  }

  // shard / drone — sharp geometric with magenta/cyan glow + energy halo
  const isShard = kind === "shard";
  const accent = isShard ? "#ff2d7a" : "#00e5ff";
  const accentSoft = isShard ? "#ff5da0" : "#5deaff";
  const geom = isShard
    ? <octahedronGeometry args={[0.22]} />
    : <tetrahedronGeometry args={[0.24]} />;
  return (
    <>
      <mesh>
        {geom}
        <meshStandardMaterial color="#0a0c18" emissive={accent} emissiveIntensity={1.0} metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh scale={1.04}>
        {geom}
        <meshBasicMaterial color={accentSoft} wireframe transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* energy aura */}
      <mesh scale={1.8}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshBasicMaterial color={accent} transparent opacity={0.18} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* tiny pulsing core */}
      <mesh scale={0.35}>
        <sphereGeometry args={[0.18, 12, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </>
  );
}

function DefenseSystem({
  shieldRef, turretRefs, orangeRef,
}: {
  shieldRef: ShieldRef;
  turretRefs: React.MutableRefObject<THREE.Group[]>;
  orangeRef: React.MutableRefObject<THREE.Group | null>;
}) {
  const attackers = useRef<Attacker[]>([]);
  const lasers = useRef<Laser[]>([]);
  const bursts = useRef<Burst[]>([]);
  const idCounter = useRef(0);
  const spawnTimer = useRef(0);
  const fireCooldowns = useRef<number[]>([0, 0, 0, 0, 0, 0]);
  const groupRef = useRef<THREE.Group>(null!);
  const [, setRenderVersion] = useState(0);

  const getOrangeState = () => {
    const center = new THREE.Vector3();
    const scale = new THREE.Vector3(1, 1, 1);
    orangeRef.current?.getWorldPosition(center);
    orangeRef.current?.getWorldScale(scale);
    return { center, radius: scale.x || 1 };
  };

  useEffect(() => {
    const { center, radius } = getOrangeState();
    for (let i = 0; i < 20; i++) attackers.current.push(spawnAttacker(idCounter.current++, center, radius));
    setRenderVersion((v) => v + 1);
  }, []);

  useFrame((_, dt) => {
    const dtClamped = Math.min(dt, 0.05);
    let didMutate = false;
    const { center: orangeCenter, radius: orangeRadius } = getOrangeState();

    spawnTimer.current -= dtClamped;
    const aliveCount = attackers.current.filter((a) => a.alive).length;
    const target = 20;
    if (spawnTimer.current <= 0) {
      const toSpawn = aliveCount < target - 3 ? 2 : 1;
      for (let i = 0; i < toSpawn; i++) attackers.current.push(spawnAttacker(idCounter.current++, orangeCenter, orangeRadius));
      spawnTimer.current = 0.24 + Math.random() * 0.12 + (aliveCount > target ? 0.15 : 0);
      didMutate = true;
    }

    for (const a of attackers.current) {
      if (!a.alive) continue;
      a.pos.addScaledVector(a.vel, dtClamped);
      if (a.ref) {
        a.ref.position.copy(a.pos);
        a.ref.rotation.x += a.rotSpeed.x * dtClamped;
        a.ref.rotation.y += a.rotSpeed.y * dtClamped;
        a.ref.rotation.z += a.rotSpeed.z * dtClamped;
      }
      if (a.pos.distanceTo(orangeCenter) < orangeRadius * 1.05) {
        a.alive = false;
        shieldRef.value = 1;
        bursts.current.push({
          id: idCounter.current++,
          pos: a.pos.clone().sub(orangeCenter).normalize().multiplyScalar(orangeRadius * 1.05).add(orangeCenter),
          life: 0.6, maxLife: 0.6,
          ref: null,
        });
        didMutate = true;
      }
    }

    for (let t = 0; t < 6; t++) {
      fireCooldowns.current[t] -= dtClamped;
      const turret = turretRefs.current[t];
      if (!turret) continue;
      const turretWorld = new THREE.Vector3();
      turret.getWorldPosition(turretWorld);

      let closest: Attacker | null = null;
      let closestDist = Infinity;
      const fireRange = orangeRadius * 4.8;
      for (const a of attackers.current) {
        if (!a.alive) continue;
        const d = turretWorld.distanceTo(a.pos);
        if (d < closestDist && d < fireRange) { closestDist = d; closest = a; }
      }

      if (closest && fireCooldowns.current[t] <= 0) {
        const dir = closest.pos.clone().sub(turretWorld).normalize();
        const targetQuat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
        const parent = turret.parent;
        if (parent) {
          const parentQuat = new THREE.Quaternion();
          parent.getWorldQuaternion(parentQuat);
          turret.quaternion.copy(parentQuat.invert().multiply(targetQuat));
        }

        fireCooldowns.current[t] = 0.16 + Math.random() * 0.08;
        const barrelTip = turretWorld.clone();
        lasers.current.push({
          id: idCounter.current++,
          from: barrelTip,
          to: closest.pos.clone(),
          life: 0.3, maxLife: 0.3,
          phase: Math.random() * Math.PI * 2,
          ref: null,
        });
        closest.hp -= 1;
        didMutate = true;

        if (closest.hp <= 0) {
          closest.alive = false;
          bursts.current.push({
            id: idCounter.current++,
            pos: closest.pos.clone(),
            life: 0.52, maxLife: 0.52,
            ref: null,
          });
        }
      }
    }

    for (const l of lasers.current) {
      l.life -= dtClamped;
      if (l.ref) {
        const t = Math.max(0, l.life / l.maxLife);
        const lifeProgress = 1 - t;
        const pulse = 0.7 + Math.sin(lifeProgress * Math.PI * 3 + l.phase) * 0.3;
        const baseMid = l.from.clone().add(l.to).multiplyScalar(0.5);
        l.ref.position.copy(baseMid);
        l.ref.children.forEach((child, index) => {
          const m = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
          if (m && "opacity" in m) {
            const childPulse = index < 3 ? pulse : 0.9 + pulse * 0.1;
            m.opacity = (m.userData?.baseOpacity ?? 1) * t * childPulse;
          }

          if (index === 0) child.scale.setScalar(0.92 + pulse * 0.08);
          if (index === 1) child.scale.setScalar(0.9 + pulse * 0.16);
          if (index === 2) child.scale.setScalar(0.95 + pulse * 0.28);
          if (index >= 3) child.scale.setScalar(0.9 + pulse * 0.2);
        });
      }
    }

    for (const b of bursts.current) {
      b.life -= dtClamped;
      if (b.ref) {
        const t = 1 - b.life / b.maxLife;
        b.ref.scale.setScalar(0.15 + t * 1.6);
        b.ref.children.forEach((child) => {
          const m = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
          if (m) m.opacity = (m.userData?.baseOpacity ?? 1) * Math.max(0, b.life / b.maxLife);
        });
      }
    }

    const prevAttackers = attackers.current.length;
    const prevLasers = lasers.current.length;
    const prevBursts = bursts.current.length;

    attackers.current = attackers.current.filter((a) => a.alive);
    lasers.current = lasers.current.filter((l) => l.life > 0);
    bursts.current = bursts.current.filter((b) => b.life > 0);

    if (
      didMutate ||
      prevAttackers !== attackers.current.length ||
      prevLasers !== lasers.current.length ||
      prevBursts !== bursts.current.length
    ) {
      setRenderVersion((v) => (v + 1) % 1000000);
    }
  });

  return (
    <group ref={groupRef}>
      {attackers.current.map((a) => {
        const haloColor =
          a.kind === "asteroid" ? "#8d7768" :
          a.kind === "ship" ? "#9a30ff" :
          a.kind === "shard" ? "#ff2d7a" : "#00e5ff";
        const trailColor =
          a.kind === "asteroid" ? "#6f6054" :
          a.kind === "ship" ? "#00f0ff" :
          a.kind === "shard" ? "#ff5da0" : "#5deaff";
        const haloOpacity = a.kind === "asteroid" ? 0.04 : 0.22;
        const haloOuterOpacity = a.kind === "asteroid" ? 0.015 : 0.08;
        const trailCoreOpacity = a.kind === "asteroid" ? 0.18 : 0.55;
        const trailOuterOpacity = a.kind === "asteroid" ? 0.06 : 0.18;
        return (
          <group key={a.id}>
            <group ref={(el) => { if (el) a.ref = el; }} position={a.pos} scale={a.scale}>
              <AttackerMesh kind={a.kind} />
              <mesh scale={2.4}>
                <sphereGeometry args={[0.16, 16, 16]} />
                <meshBasicMaterial
                  color={haloColor}
                  transparent opacity={haloOpacity} blending={THREE.AdditiveBlending} depthWrite={false}
                />
              </mesh>
              <mesh scale={3.6}>
                <sphereGeometry args={[0.16, 12, 12]} />
                <meshBasicMaterial
                  color={haloColor}
                  transparent opacity={haloOuterOpacity} blending={THREE.AdditiveBlending} depthWrite={false}
                />
              </mesh>
            </group>
            {(() => {
              const speed = a.vel.length();
              const trailLen = Math.min(0.9, 0.35 + speed * 0.6) * a.scale;
              const dirNeg = a.vel.clone().normalize().multiplyScalar(-1);
              const mid = a.pos.clone().add(dirNeg.clone().multiplyScalar(trailLen * 0.5));
              const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dirNeg);
              return (
                <group position={mid} quaternion={quat}>
                  <mesh>
                    <coneGeometry args={[0.05 * a.scale, trailLen, 12, 1, true]} />
                    <meshBasicMaterial color={trailColor} transparent opacity={trailCoreOpacity} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
                  </mesh>
                  <mesh>
                    <coneGeometry args={[0.10 * a.scale, trailLen, 12, 1, true]} />
                    <meshBasicMaterial color={trailColor} transparent opacity={trailOuterOpacity} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
                  </mesh>
                </group>
              );
            })()}
          </group>
        );
      })}

      {lasers.current.map((l) => {
        const mid = l.from.clone().add(l.to).multiplyScalar(0.5);
        const dir = l.to.clone().sub(l.from);
        const len = dir.length();
        const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
        const pulseT = 1 - l.life / l.maxLife;
        const radiusPulse = 1 + Math.sin(pulseT * Math.PI * 3 + l.phase) * 0.16;

        return (
          <group
            key={l.id}
            ref={(el) => { if (el) l.ref = el; }}
            position={mid}
            quaternion={quat}
          >
            {/* hot white core */}
            <mesh>
              <cylinderGeometry args={[0.0015 * radiusPulse, 0.0015 * radiusPulse, len, 8, 1, true]} />
              <meshBasicMaterial
                color="#ffffff"
                transparent
                opacity={1}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                side={THREE.DoubleSide}
                userData={{ baseOpacity: 1 }}
              />
            </mesh>
            {/* inner orange plasma */}
            <mesh>
              <cylinderGeometry args={[0.004 * radiusPulse, 0.004 * radiusPulse, len, 12, 1, true]} />
              <meshBasicMaterial
                color="#ffb060"
                transparent
                opacity={0.95}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                side={THREE.DoubleSide}
                userData={{ baseOpacity: 0.95 }}
              />
            </mesh>
            {/* soft breathing field */}
            <mesh>
              <cylinderGeometry args={[0.01 * radiusPulse, 0.01 * radiusPulse, len, 12, 1, true]} />
              <meshBasicMaterial
                color="#ff6a1f"
                transparent
                opacity={0.42}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                side={THREE.DoubleSide}
                userData={{ baseOpacity: 0.42 }}
              />
            </mesh>
            {/* impact flash at target end */}
            <mesh position={[0, -len / 2, 0]}>
              <sphereGeometry args={[0.07, 16, 16]} />
              <meshBasicMaterial
                color="#fff0c8"
                transparent
                opacity={1}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                userData={{ baseOpacity: 1 }}
              />
            </mesh>
            <mesh position={[0, -len / 2, 0]} scale={2.2}>
              <sphereGeometry args={[0.07, 16, 16]} />
              <meshBasicMaterial
                color="#ff8a3c"
                transparent
                opacity={0.55}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                userData={{ baseOpacity: 0.55 }}
              />
            </mesh>
            {/* muzzle flash at turret end */}
            <mesh position={[0, len / 2, 0]} scale={1.4}>
              <sphereGeometry args={[0.04, 12, 12]} />
              <meshBasicMaterial
                color="#ffffff"
                transparent
                opacity={0.9}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                userData={{ baseOpacity: 0.9 }}
              />
            </mesh>
          </group>
        );
      })}

      {bursts.current.map((b) => (
        <group key={b.id} ref={(el) => { if (el) b.ref = el; }} position={b.pos}>
          <mesh>
            <sphereGeometry args={[0.16, 24, 24]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={1} blending={THREE.AdditiveBlending} depthWrite={false} userData={{ baseOpacity: 1 }} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.22, 24, 24]} />
            <meshBasicMaterial color="#ffb060" transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} userData={{ baseOpacity: 0.85 }} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.42, 24, 24]} />
            <meshBasicMaterial color="#ff8a3c" transparent opacity={0.45} blending={THREE.AdditiveBlending} depthWrite={false} userData={{ baseOpacity: 0.45 }} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* =====================================================================
   Background — soft star particles + nebula gradient
   ===================================================================== */

function StarField({ count = 1200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const { mouse } = useThree();
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, [count]);

  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.012;
    ref.current.rotation.x = mouse.y * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#ffffff"
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

/* =====================================================================
   Public component
   ===================================================================== */

export interface QuantumOrangeSceneProps {
  intensity?: "full" | "compact";
  scrollProgress?: { current: number };
  className?: string;
  enablePostprocessing?: boolean;
}

export default function QuantumOrangeScene({
  intensity = "full",
  scrollProgress,
  className,
  enablePostprocessing = true,
}: QuantumOrangeSceneProps) {
  const localProg = useRef(0);
  const prog = scrollProgress ?? localProg;
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const compact = intensity === "compact" || isMobile;

  const shieldRef = useRef<{ value: number }>({ value: 0 }).current;
  const turretRefs = useRef<THREE.Group[]>([]);
  const orangeRef = useRef<THREE.Group | null>(null);

  return (
    <div className={className}>
      <Canvas
        dpr={[1.25, compact ? 2 : 2.5]}
        camera={{ position: [0, 0.15, compact ? 5.2 : 4.2], fov: compact ? 42 : 38 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
      >
        <color attach="background" args={["#05060f"]} />

        {/* Premium three-point lighting — Apple product photography */}
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 6, 4]} intensity={2.4} color="#fff5e6" />
        <directionalLight position={[-4, -1, 2]} intensity={0.8} color="#7af0c0" />
        <pointLight position={[0, 0, 3.5]} intensity={0.7} color="#ffb380" />
        <pointLight position={[2, -3, -2]} intensity={0.5} color="#ff6a1f" />
        <pointLight position={[1.4, 0, 1.5]} intensity={0.6} color="#ffd86b" />

        <Suspense fallback={null}>
          <QuantumOrange scrollProgress={prog} shieldRef={shieldRef} turretRefs={turretRefs} compact={compact} orangeRef={orangeRef} />
          <DefenseSystem shieldRef={shieldRef} turretRefs={turretRefs} orangeRef={orangeRef} />
          <StarField count={compact ? 600 : 1200} />
        </Suspense>

        {enablePostprocessing && !reduced && (
          <EffectComposer multisampling={0}>
            <SMAA />
            <Bloom intensity={1.15} luminanceThreshold={0.5} luminanceSmoothing={0.9} mipmapBlur radius={0.95} />
            <Vignette eskil={false} offset={0.32} darkness={0.85} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
