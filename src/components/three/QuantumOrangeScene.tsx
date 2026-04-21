import { useRef, useMemo, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

/* =====================================================================
   APPLE-GRADE QUANTUM ORANGE — Tower Defense Hero
   Sculpted 3D orange (procedural, no photo) auto-targeting incoming
   geometric attackers with laser turrets. Physics + particles.
   ===================================================================== */

/* ---------- Orange shader: soft, sculpted, premium ---------- */

const orangeVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vWorldPos;
  uniform float uTime;

  // tiny dimples — much subtler than before, Apple-product-grade
  float hash(vec3 p){ return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453); }

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec3 displaced = position;
    float h = hash(floor(position * 24.0));
    displaced += normal * (h - 0.5) * 0.006; // very subtle peel
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
  uniform float uTime;
  uniform vec3 uDeep;     // shadow side
  uniform vec3 uMid;      // mid orange
  uniform vec3 uHi;       // highlight peach
  uniform vec3 uRim;      // green rim
  uniform float uShield;  // 0..1 shield flash on hit

  float hash(vec3 p){ return fract(sin(dot(p, vec3(127.1,311.7,74.7)))*43758.5453); }
  float noise(vec3 p){
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
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vViewDir);
    vec3 L = normalize(vec3(0.55, 0.75, 0.6)); // key light, top-right

    float ndl = max(dot(N, L), 0.0);
    float fres = pow(1.0 - max(dot(N, V), 0.0), 2.6);

    // micro peel texture — keeps it tactile but soft
    float peel = noise(vWorldPos * 28.0);
    peel = smoothstep(0.4, 0.85, peel) * 0.18;

    // base gradient (deep -> mid -> hi)
    vec3 base = mix(uDeep, uMid, ndl);
    base = mix(base, uHi, pow(ndl, 4.0) * 0.85);
    base += uHi * peel * 0.35;

    // soft specular highlight (Apple key light)
    vec3 H = normalize(L + V);
    float spec = pow(max(dot(N, H), 0.0), 64.0) * 0.55;
    base += vec3(spec);

    // subtle green bioluminescent rim
    base += uRim * fres * 0.55;

    // shield ripple on hit — concentric pulse
    float ripple = sin(length(vWorldPos.xy) * 22.0 - uTime * 8.0);
    ripple = smoothstep(0.3, 1.0, ripple) * uShield;
    base += vec3(0.2, 0.9, 0.55) * ripple * 0.6;

    gl_FragColor = vec4(base, 1.0);
  }
`;

/* =====================================================================
   THE ORANGE — premium sphere with 6 micro turrets at orbiting positions
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
    uDeep: { value: new THREE.Color("#7a2604") },
    uMid: { value: new THREE.Color("#ff6a1a") },
    uHi: { value: new THREE.Color("#ffd29a") },
    uRim: { value: new THREE.Color("#3df3a0") },
    uShield: { value: 0 },
  }), []);

  // 6 turret slots distributed around the sphere
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
    // shield decays
    shieldRef.value = Math.max(0, shieldRef.value - dt * 2.5);
    uniforms.uShield.value = shieldRef.value;
    if (groupRef.current) {
      groupRef.current.rotation.y += dt * 0.12;
      const s = 1 + scrollProgress.current * 0.12;
      groupRef.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={groupRef}>
      {/* main orange */}
      <mesh>
        <sphereGeometry args={[1, 128, 128]} />
        <shaderMaterial ref={matRef} vertexShader={orangeVertex} fragmentShader={orangeFragment} uniforms={uniforms} />
      </mesh>

      {/* stem nub */}
      <mesh position={[0, 1.02, 0]}>
        <cylinderGeometry args={[0.04, 0.06, 0.08, 16]} />
        <meshStandardMaterial color="#3a1a08" roughness={0.7} />
      </mesh>

      {/* leaf */}
      <mesh position={[0.06, 1.08, 0]} rotation={[0, 0, -0.6]}>
        <sphereGeometry args={[0.12, 16, 8]} />
        <meshStandardMaterial color="#1f6b3a" roughness={0.5} metalness={0.1} />
      </mesh>

      {/* 6 turrets — small chrome cylinders pointing outward */}
      {turretSlots.map((s, i) => (
        <group
          key={i}
          ref={(el) => { if (el) turretRefs.current[i] = el; }}
          position={s.pos}
          quaternion={s.quat}
        >
          {/* base ring */}
          <mesh>
            <torusGeometry args={[0.06, 0.012, 8, 24]} />
            <meshStandardMaterial color="#1a1a1f" metalness={0.9} roughness={0.25} />
          </mesh>
          {/* turret barrel — points along local +Y */}
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.018, 0.026, 0.1, 16]} />
            <meshStandardMaterial color="#e8e8ec" metalness={0.95} roughness={0.18} />
          </mesh>
          {/* glowing tip */}
          <mesh position={[0, 0.105, 0]}>
            <sphereGeometry args={[0.018, 12, 12]} />
            <meshBasicMaterial color="#3df3a0" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* =====================================================================
   ATTACKERS — futuristic geometric shapes incoming from outer ring
   ===================================================================== */

type AttackerKind = "tetra" | "octa" | "cube" | "cone";

interface Attacker {
  id: number;
  kind: AttackerKind;
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  rotSpeed: THREE.Vector3;
  hp: number;
  ref: THREE.Group | null;
  alive: boolean;
}

interface Laser {
  id: number;
  from: THREE.Vector3;
  to: THREE.Vector3;
  life: number;
  ref: THREE.Mesh | null;
}

interface Burst {
  id: number;
  pos: THREE.Vector3;
  life: number;
  ref: THREE.Group | null;
}

function spawnAttacker(id: number): Attacker {
  // spawn from random direction at distance ~5
  const phi = Math.acos(2 * Math.random() - 1);
  const theta = Math.random() * Math.PI * 2;
  const dist = 4.5 + Math.random() * 1.5;
  const pos = new THREE.Vector3(
    Math.sin(phi) * Math.cos(theta),
    Math.sin(phi) * Math.sin(theta),
    Math.cos(phi),
  ).multiplyScalar(dist);
  // velocity heads toward origin
  const vel = pos.clone().negate().normalize().multiplyScalar(0.45 + Math.random() * 0.35);
  const kinds: AttackerKind[] = ["tetra", "octa", "cube", "cone"];
  return {
    id,
    kind: kinds[Math.floor(Math.random() * kinds.length)],
    pos,
    vel,
    rotSpeed: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).multiplyScalar(2),
    hp: 1,
    ref: null,
    alive: true,
  };
}

function AttackerMesh({ kind }: { kind: AttackerKind }) {
  const mat = (
    <meshStandardMaterial
      color="#0b0d18"
      emissive="#ff3a8a"
      emissiveIntensity={0.6}
      metalness={0.7}
      roughness={0.25}
    />
  );
  switch (kind) {
    case "tetra": return <mesh><tetrahedronGeometry args={[0.18]} />{mat}</mesh>;
    case "octa":  return <mesh><octahedronGeometry args={[0.18]} />{mat}</mesh>;
    case "cube":  return <mesh><boxGeometry args={[0.22, 0.22, 0.22]} />{mat}</mesh>;
    case "cone":  return <mesh><coneGeometry args={[0.14, 0.32, 6]} />{mat}</mesh>;
  }
}

/* ---------- The defense system orchestrator ---------- */

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

  // Initial wave
  useEffect(() => {
    for (let i = 0; i < 4; i++) attackers.current.push(spawnAttacker(idCounter.current++));
  }, []);

  useFrame((_, dt) => {
    const dtClamped = Math.min(dt, 0.05);

    // spawn new attackers
    spawnTimer.current -= dtClamped;
    if (spawnTimer.current <= 0 && attackers.current.filter(a => a.alive).length < 7) {
      attackers.current.push(spawnAttacker(idCounter.current++));
      spawnTimer.current = 0.9 + Math.random() * 1.2;
    }

    // update attackers
    for (const a of attackers.current) {
      if (!a.alive) continue;
      a.pos.addScaledVector(a.vel, dtClamped);
      if (a.ref) {
        a.ref.position.copy(a.pos);
        a.ref.rotation.x += a.rotSpeed.x * dtClamped;
        a.ref.rotation.y += a.rotSpeed.y * dtClamped;
        a.ref.rotation.z += a.rotSpeed.z * dtClamped;
      }
      // hit the orange — shield flash + destroy attacker
      if (a.pos.length() < 1.05) {
        a.alive = false;
        shieldRef.value = 1;
        bursts.current.push({
          id: idCounter.current++,
          pos: a.pos.clone().normalize().multiplyScalar(1.05),
          life: 0.5,
          ref: null,
        });
      }
    }

    // turrets fire at nearest alive attacker
    for (let t = 0; t < 6; t++) {
      fireCooldowns.current[t] -= dtClamped;
      const turret = turretRefs.current[t];
      if (!turret) continue;
      // turret world position
      const turretWorld = new THREE.Vector3();
      turret.getWorldPosition(turretWorld);

      // find closest alive attacker
      let closest: Attacker | null = null;
      let closestDist = Infinity;
      for (const a of attackers.current) {
        if (!a.alive) continue;
        const d = turretWorld.distanceTo(a.pos);
        if (d < closestDist && d < 4.5) { closestDist = d; closest = a; }
      }

      if (closest && fireCooldowns.current[t] <= 0) {
        // aim turret at target (rotate group so local +Y points at target)
        const dir = closest.pos.clone().sub(turretWorld).normalize();
        const targetQuat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
        // since turret is child of orange group, convert world quat to local
        const parent = turret.parent;
        if (parent) {
          const parentQuat = new THREE.Quaternion();
          parent.getWorldQuaternion(parentQuat);
          turret.quaternion.copy(parentQuat.invert().multiply(targetQuat));
        }

        // fire
        fireCooldowns.current[t] = 0.35 + Math.random() * 0.2;
        lasers.current.push({
          id: idCounter.current++,
          from: turretWorld.clone(),
          to: closest.pos.clone(),
          life: 0.12,
          ref: null,
        });
        closest.hp -= 1;
        if (closest.hp <= 0) {
          closest.alive = false;
          bursts.current.push({
            id: idCounter.current++,
            pos: closest.pos.clone(),
            life: 0.45,
            ref: null,
          });
        }
      }
    }

    // update lasers
    for (const l of lasers.current) {
      l.life -= dtClamped;
      if (l.ref) {
        const opacity = Math.max(0, l.life / 0.12);
        (l.ref.material as THREE.MeshBasicMaterial).opacity = opacity;
      }
    }

    // update bursts
    for (const b of bursts.current) {
      b.life -= dtClamped;
      if (b.ref) {
        const t = 1 - b.life / 0.45;
        b.ref.scale.setScalar(0.2 + t * 1.4);
        b.ref.children.forEach((child) => {
          const m = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
          if (m) m.opacity = Math.max(0, b.life / 0.45);
        });
      }
    }

    // GC
    attackers.current = attackers.current.filter(a => a.alive || (a.ref && false));
    attackers.current = attackers.current.filter(a => a.alive);
    lasers.current = lasers.current.filter(l => l.life > 0);
    bursts.current = bursts.current.filter(b => b.life > 0);
  });

  return (
    <group ref={groupRef}>
      {attackers.current.map((a) => (
        <group key={a.id} ref={(el) => { if (el) a.ref = el; }} position={a.pos}>
          <AttackerMesh kind={a.kind} />
          {/* glow halo */}
          <mesh scale={1.6}>
            <sphereGeometry args={[0.14, 12, 12]} />
            <meshBasicMaterial color="#ff3a8a" transparent opacity={0.12} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        </group>
      ))}

      {lasers.current.map((l) => {
        const mid = l.from.clone().add(l.to).multiplyScalar(0.5);
        const dir = l.to.clone().sub(l.from);
        const len = dir.length();
        const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
        return (
          <mesh
            key={l.id}
            ref={(el) => { if (el) l.ref = el; }}
            position={mid}
            quaternion={quat}
          >
            <cylinderGeometry args={[0.012, 0.012, len, 8]} />
            <meshBasicMaterial color="#5dffb0" transparent opacity={1} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        );
      })}

      {bursts.current.map((b) => (
        <group key={b.id} ref={(el) => { if (el) b.ref = el; }} position={b.pos}>
          <mesh>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshBasicMaterial color="#5dffb0" transparent opacity={1} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.32, 16, 16]} />
            <meshBasicMaterial color="#ff8a3c" transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* =====================================================================
   Background — soft star particles, no busy rings
   ===================================================================== */

function StarField({ count = 800 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const { mouse } = useThree();
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 8;
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
    ref.current.rotation.y += dt * 0.015;
    ref.current.rotation.x = mouse.y * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#ffffff" transparent opacity={0.55} depthWrite={false} blending={THREE.AdditiveBlending} />
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
        dpr={[1, compact ? 1.5 : 2]}
        camera={{ position: [0, 0.2, 4.4], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#05060f"]} />

        {/* Soft Apple-style three-point lighting */}
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 5, 3]} intensity={1.4} color="#fff5e6" />
        <directionalLight position={[-3, -2, 2]} intensity={0.5} color="#7af0c0" />
        <pointLight position={[0, 0, 3]} intensity={0.4} color="#ffb380" />

        <Suspense fallback={null}>
          <QuantumOrange scrollProgress={prog} shieldRef={shieldRef} turretRefs={turretRefs} />
          {!reduced && <DefenseSystem shieldRef={shieldRef} turretRefs={turretRefs} />}
          <StarField count={compact ? 400 : 800} />
        </Suspense>

        {enablePostprocessing && !reduced && (
          <EffectComposer>
            <Bloom intensity={0.7} luminanceThreshold={0.4} luminanceSmoothing={0.85} mipmapBlur />
            <Vignette eskil={false} offset={0.3} darkness={0.85} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
