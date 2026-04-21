import { useRef, useMemo, Suspense, useEffect } from "react";
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
  scrollProgress, shieldRef, turretRefs,
}: {
  scrollProgress: { current: number };
  shieldRef: ShieldRef;
  turretRefs: React.MutableRefObject<THREE.Group[]>;
}) {
  const groupRef = useRef<THREE.Group>(null!);
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
    if (groupRef.current) {
      groupRef.current.rotation.y += dt * 0.1;
      const s = 0.65 + scrollProgress.current * 0.08;
      groupRef.current.scale.setScalar(s);
      groupRef.current.position.x = 1.4;
    }
  });

  return (
    <group ref={groupRef}>
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

      {/* 6 turrets — sleeker, lower-profile, chrome */}
      {turretSlots.map((s, i) => (
        <group
          key={i}
          ref={(el) => { if (el) turretRefs.current[i] = el; }}
          position={s.pos}
          quaternion={s.quat}
        >
          {/* recessed base ring */}
          <mesh>
            <torusGeometry args={[0.055, 0.008, 16, 32]} />
            <meshStandardMaterial color="#c8c8d0" metalness={0.95} roughness={0.18} />
          </mesh>
          {/* dome housing */}
          <mesh position={[0, 0.012, 0]}>
            <sphereGeometry args={[0.05, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#1a1a22" metalness={0.9} roughness={0.22} />
          </mesh>
          {/* slim barrel */}
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.008, 0.012, 0.07, 16]} />
            <meshStandardMaterial color="#e8e8ec" metalness={0.95} roughness={0.15} />
          </mesh>
          {/* glowing emitter */}
          <mesh position={[0, 0.085, 0]}>
            <sphereGeometry args={[0.01, 12, 12]} />
            <meshBasicMaterial color="#5dffb0" />
          </mesh>
        </group>
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
  alive: boolean;
  scale: number;
}

interface Laser {
  id: number;
  from: THREE.Vector3;
  to: THREE.Vector3;
  life: number;
  maxLife: number;
  ref: THREE.Group | null;
}

interface Burst {
  id: number;
  pos: THREE.Vector3;
  life: number;
  maxLife: number;
  ref: THREE.Group | null;
}

function spawnAttacker(id: number): Attacker {
  // True 360° spherical distribution (uniform on sphere)
  const u = Math.random();
  const v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  const dist = 3.8 + Math.random() * 1.6;
  const pos = new THREE.Vector3(
    Math.sin(phi) * Math.cos(theta),
    Math.cos(phi),                  // full -1..1 vertical coverage
    Math.sin(phi) * Math.sin(theta),
  ).multiplyScalar(dist);
  // Cinematic approach: mostly toward orange, slight tangential drift
  const toCenter = pos.clone().negate().normalize();
  const tangent = new THREE.Vector3(-toCenter.z, 0, toCenter.x).multiplyScalar((Math.random() - 0.5) * 0.18);
  const vel = toCenter.multiplyScalar(0.65 + Math.random() * 0.55).add(tangent);

  const kinds: AttackerKind[] = ["asteroid", "ship", "shard", "drone"];
  const kind = kinds[Math.floor(Math.random() * kinds.length)];
  return {
    id,
    kind,
    pos,
    vel,
    rotSpeed: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).multiplyScalar(kind === "ship" ? 0.6 : 2.2),
    hp: kind === "ship" ? 2 : 1,
    ref: null,
    alive: true,
    scale: 0.42 + Math.random() * 0.22,
  };
}

function AttackerMesh({ kind }: { kind: AttackerKind }) {
  if (kind === "ship") {
    // Cinematic black alien ship — flat hull + dome + glowing underside
    return (
      <group>
        {/* main hull — flattened ellipsoid */}
        <mesh scale={[1, 0.32, 0.62]}>
          <sphereGeometry args={[0.22, 32, 16]} />
          <meshStandardMaterial color="#06070d" metalness={0.92} roughness={0.22} emissive="#1a0030" emissiveIntensity={0.25} />
        </mesh>
        {/* dorsal ridge */}
        <mesh position={[0, 0.04, 0]} scale={[0.5, 0.18, 0.3]}>
          <sphereGeometry args={[0.22, 24, 12]} />
          <meshStandardMaterial color="#0a0b14" metalness={0.95} roughness={0.18} />
        </mesh>
        {/* glowing underbelly emitter */}
        <mesh position={[0, -0.04, 0]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#ff2d7a" />
        </mesh>
        {/* wingtip lights */}
        <mesh position={[0.2, 0, 0]}><sphereGeometry args={[0.012, 8, 8]} /><meshBasicMaterial color="#ff5da0" /></mesh>
        <mesh position={[-0.2, 0, 0]}><sphereGeometry args={[0.012, 8, 8]} /><meshBasicMaterial color="#5dffb0" /></mesh>
      </group>
    );
  }

  if (kind === "asteroid") {
    // Rocky irregular asteroid
    return (
      <group>
        <mesh>
          <icosahedronGeometry args={[0.16, 1]} />
          <meshStandardMaterial color="#3a2418" roughness={0.95} metalness={0.05} flatShading />
        </mesh>
        {/* dusty halo */}
        <mesh scale={1.6}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshBasicMaterial color="#8a5a3a" transparent opacity={0.06} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      </group>
    );
  }

  // shard / drone — sharp geometric with magenta glow
  const geom = kind === "shard"
    ? <octahedronGeometry args={[0.15]} />
    : <tetrahedronGeometry args={[0.16]} />;
  return (
    <>
      <mesh>
        {geom}
        <meshStandardMaterial color="#0a0c18" emissive="#ff2d7a" emissiveIntensity={0.8} metalness={0.85} roughness={0.18} />
      </mesh>
      <mesh scale={1.005}>
        {geom}
        <meshBasicMaterial color="#ff5da0" wireframe transparent opacity={0.65} />
      </mesh>
    </>
  );
}

function DefenseSystem({
  shieldRef, turretRefs,
}: {
  shieldRef: ShieldRef;
  turretRefs: React.MutableRefObject<THREE.Group[]>;
}) {
  const attackers = useRef<Attacker[]>([]);
  const lasers = useRef<Laser[]>([]);
  const bursts = useRef<Burst[]>([]);
  const idCounter = useRef(0);
  const spawnTimer = useRef(0);
  const fireCooldowns = useRef<number[]>([0, 0, 0, 0, 0, 0]);
  const groupRef = useRef<THREE.Group>(null!);

  useEffect(() => {
    for (let i = 0; i < 35; i++) attackers.current.push(spawnAttacker(idCounter.current++));
  }, []);

  useFrame((_, dt) => {
    const dtClamped = Math.min(dt, 0.05);

    spawnTimer.current -= dtClamped;
    if (spawnTimer.current <= 0 && attackers.current.filter(a => a.alive).length < 55) {
      // heavy burst-spawn — Tower-style swarm
      const burst = 2 + Math.floor(Math.random() * 4);
      for (let i = 0; i < burst; i++) attackers.current.push(spawnAttacker(idCounter.current++));
      spawnTimer.current = 0.08 + Math.random() * 0.18;
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
      if (a.pos.length() < 1.05) {
        a.alive = false;
        shieldRef.value = 1;
        bursts.current.push({
          id: idCounter.current++,
          pos: a.pos.clone().normalize().multiplyScalar(1.05),
          life: 0.55, maxLife: 0.55,
          ref: null,
        });
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
      for (const a of attackers.current) {
        if (!a.alive) continue;
        const d = turretWorld.distanceTo(a.pos);
        if (d < closestDist && d < 6.5) { closestDist = d; closest = a; }
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

        fireCooldowns.current[t] = 0.08 + Math.random() * 0.10;
        // emit laser from barrel tip in world space
        const barrelTip = turretWorld.clone().add(dir.clone().multiplyScalar(0.09));
        lasers.current.push({
          id: idCounter.current++,
          from: barrelTip,
          to: closest.pos.clone(),
          life: 0.18, maxLife: 0.18,
          ref: null,
        });
        closest.hp -= 1;
        if (closest.hp <= 0) {
          closest.alive = false;
          bursts.current.push({
            id: idCounter.current++,
            pos: closest.pos.clone(),
            life: 0.5, maxLife: 0.5,
            ref: null,
          });
        }
      }
    }

    for (const l of lasers.current) {
      l.life -= dtClamped;
      if (l.ref) {
        const t = Math.max(0, l.life / l.maxLife);
        l.ref.children.forEach((child) => {
          const m = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
          if (m && "opacity" in m) m.opacity = (m.userData?.baseOpacity ?? 1) * t;
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

    attackers.current = attackers.current.filter(a => a.alive);
    lasers.current = lasers.current.filter(l => l.life > 0);
    bursts.current = bursts.current.filter(b => b.life > 0);
  });

  return (
    <group ref={groupRef}>
      {attackers.current.map((a) => (
        <group key={a.id} ref={(el) => { if (el) a.ref = el; }} position={a.pos} scale={a.scale}>
          <AttackerMesh kind={a.kind} />
          {/* soft glow halo — color varies by kind */}
          <mesh scale={1.8}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshBasicMaterial
              color={a.kind === "asteroid" ? "#8a5a3a" : a.kind === "ship" ? "#9a30ff" : "#ff2d7a"}
              transparent opacity={0.12} blending={THREE.AdditiveBlending} depthWrite={false}
            />
          </mesh>
        </group>
      ))}

      {lasers.current.map((l) => {
        const mid = l.from.clone().add(l.to).multiplyScalar(0.5);
        const dir = l.to.clone().sub(l.from);
        const len = dir.length();
        const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());

        return (
          <group
            key={l.id}
            ref={(el) => { if (el) l.ref = el; }}
            position={mid}
            quaternion={quat}
          >
            {/* HOT INNER CORE — pure white razor */}
            <mesh>
              <cylinderGeometry args={[0.0015, 0.0015, len, 6, 1, true]} />
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
            {/* THIN ORANGE BEAM */}
            <mesh>
              <cylinderGeometry args={[0.004, 0.004, len, 8, 1, true]} />
              <meshBasicMaterial
                color="#ff8a1f"
                transparent
                opacity={0.95}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                side={THREE.DoubleSide}
                userData={{ baseOpacity: 0.95 }}
              />
            </mesh>
            {/* SOFT OUTER GLOW — narrow */}
            <mesh>
              <cylinderGeometry args={[0.010, 0.010, len, 8, 1, true]} />
              <meshBasicMaterial
                color="#ff5a0f"
                transparent
                opacity={0.32}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                side={THREE.DoubleSide}
                userData={{ baseOpacity: 0.32 }}
              />
            </mesh>
            {/* MUZZLE FLASH */}
            <mesh position={[0, -len / 2, 0]}>
              <sphereGeometry args={[0.035, 12, 12]} />
              <meshBasicMaterial
                color="#fff0c8"
                transparent
                opacity={0.95}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                userData={{ baseOpacity: 0.95 }}
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
            <sphereGeometry args={[0.28, 24, 24]} />
            <meshBasicMaterial color="#5dffb0" transparent opacity={0.8} blending={THREE.AdditiveBlending} depthWrite={false} userData={{ baseOpacity: 0.8 }} />
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

  return (
    <div className={className}>
      <Canvas
        dpr={[1.25, compact ? 2 : 2.5]}
        camera={{ position: [0, 0.15, 4.2], fov: 38 }}
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
          <QuantumOrange scrollProgress={prog} shieldRef={shieldRef} turretRefs={turretRefs} />
          {!reduced && <DefenseSystem shieldRef={shieldRef} turretRefs={turretRefs} />}
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
