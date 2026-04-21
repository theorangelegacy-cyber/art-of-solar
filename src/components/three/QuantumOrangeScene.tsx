import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

/* =====================================================================
   Quantum Orange Shader — orange-peel dimples, energy veins, fresnel rim
   ===================================================================== */

const orangeVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewPos;
  varying vec3 vWorldPos;
  varying vec2 vUv;
  uniform float uTime;

  // simple displacement to fake orange-peel dimples
  float hash(vec3 p) {
    return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
  }

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec3 displaced = position;
    float h = hash(floor(position * 18.0));
    displaced += normal * (h - 0.5) * 0.018;
    // gentle quantum breathing
    displaced += normal * sin(uTime * 0.8 + position.y * 4.0) * 0.005;
    vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
    vViewPos = -mv.xyz;
    vWorldPos = (modelMatrix * vec4(displaced, 1.0)).xyz;
    gl_Position = projectionMatrix * mv;
  }
`;

const orangeFragment = /* glsl */ `
  precision highp float;
  varying vec3 vNormal;
  varying vec3 vViewPos;
  varying vec3 vWorldPos;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3  uColorCore;     // deep orange
  uniform vec3  uColorBright;   // light orange
  uniform vec3  uRim;           // bioluminescent green

  // hash + value noise
  float hash(vec3 p){ return fract(sin(dot(p, vec3(127.1,311.7,74.7)))*43758.5453); }
  float noise(vec3 p){
    vec3 i = floor(p); vec3 f = fract(p);
    f = f*f*(3.0-2.0*f);
    float n = mix(
      mix(mix(hash(i+vec3(0,0,0)), hash(i+vec3(1,0,0)), f.x),
          mix(hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)), f.x),
          mix(hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)), f.x), f.y),
      f.z);
    return n;
  }

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vViewPos);
    float fres = pow(1.0 - max(dot(N, V), 0.0), 2.4);

    // peel dimples via high freq noise
    float dimples = noise(vWorldPos * 32.0);
    dimples = smoothstep(0.35, 0.85, dimples);

    // energy veins — animated low freq noise
    float veins = noise(vWorldPos * 3.5 + vec3(uTime * 0.25));
    veins = smoothstep(0.55, 0.85, veins);
    float veinPulse = 0.5 + 0.5 * sin(uTime * 1.6 + veins * 8.0);

    // base color
    vec3 base = mix(uColorCore, uColorBright, dimples * 0.7);
    // add veins glow
    base += uColorBright * veins * (0.6 + 0.4 * veinPulse);

    // rim glow in green
    base += uRim * fres * 1.4;

    // subtle inner shading
    float lambert = max(dot(N, normalize(vec3(0.6, 0.8, 0.7))), 0.0);
    base *= 0.45 + 0.65 * lambert;

    gl_FragColor = vec4(base, 1.0);
  }
`;

function QuantumOrange({ scrollProgress }: { scrollProgress: { current: number } }) {
  const matRef = useRef<THREE.ShaderMaterial>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColorCore: { value: new THREE.Color("#a83806") },
    uColorBright: { value: new THREE.Color("#ff8a3c") },
    uRim: { value: new THREE.Color("#3df3a0") },
  }), []);

  useFrame((state, dt) => {
    uniforms.uTime.value += dt;
    if (groupRef.current) {
      groupRef.current.rotation.y += dt * 0.18;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
      const s = 1 + scrollProgress.current * 0.15;
      groupRef.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[1, 64]} />
        <shaderMaterial
          ref={matRef}
          vertexShader={orangeVertex}
          fragmentShader={orangeFragment}
          uniforms={uniforms}
        />
      </mesh>
      {/* inner core glow */}
      <mesh scale={0.6}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#ffb347" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

/* =====================================================================
   Electron rings
   ===================================================================== */

function ElectronRing({
  radius, tilt, speed, color, count = 28,
}: { radius: number; tilt: [number, number, number]; speed: number; color: string; count?: number }) {
  const groupRef = useRef<THREE.Group>(null!);
  const positions = useMemo(() => {
    return new Array(count).fill(0).map((_, i) => (i / count) * Math.PI * 2);
  }, [count]);

  useFrame((_, dt) => {
    if (groupRef.current) groupRef.current.rotation.z += dt * speed;
  });

  return (
    <group rotation={tilt}>
      {/* the ring itself */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.004, 8, 200]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>
      <group ref={groupRef}>
        {positions.map((a, i) => (
          <mesh key={i} position={[Math.cos(a) * radius, Math.sin(a) * radius, 0]}>
            <sphereGeometry args={[0.022, 12, 12]} />
            <meshBasicMaterial color={color} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* =====================================================================
   Particle field — drifting points that gently react to mouse
   ===================================================================== */

function ParticleField({ count = 1800 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const { mouse } = useThree();

  const { positions, sizes, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const col = new Float32Array(count * 3);
    const cOrange = new THREE.Color("#ffb347");
    const cGreen = new THREE.Color("#39ff9c");
    for (let i = 0; i < count; i++) {
      const r = 2.5 + Math.random() * 5.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      sz[i] = Math.random() * 1.4 + 0.2;
      const c = Math.random() > 0.7 ? cGreen : cOrange;
      col[i * 3 + 0] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    return { positions: pos, sizes: sz, colors: col };
  }, [count]);

  useFrame((state, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.03;
    ref.current.rotation.x = mouse.y * 0.15;
    ref.current.position.x = -mouse.x * 0.3;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={sizes.length} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
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

  return (
    <div className={className}>
      <Canvas
        dpr={[1, compact ? 1.5 : 2]}
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#05060f"]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[3, 3, 3]} intensity={1.2} color="#ffb347" />
        <pointLight position={[-3, -2, 2]} intensity={0.7} color="#39ff9c" />

        <Suspense fallback={null}>
          <QuantumOrange scrollProgress={prog} />
          {!reduced && (
            <>
              <ElectronRing radius={1.55} tilt={[0.4, 0.2, 0.0]} speed={0.45} color="#ffb347" count={compact ? 18 : 28} />
              <ElectronRing radius={1.85} tilt={[-0.6, 0.5, 0.3]} speed={-0.32} color="#39ff9c" count={compact ? 14 : 22} />
              <ElectronRing radius={2.2} tilt={[0.2, -0.4, 0.6]} speed={0.22} color="#ffd9a8" count={compact ? 12 : 18} />
              <ParticleField count={compact ? 700 : 1800} />
            </>
          )}
        </Suspense>

        {enablePostprocessing && !reduced && !compact && (
          <EffectComposer>
            <Bloom intensity={0.85} luminanceThreshold={0.35} luminanceSmoothing={0.7} mipmapBlur />
            <ChromaticAberration
              offset={[0.0004, 0.0006] as any}
              radialModulation={false}
              modulationOffset={0}
              blendFunction={BlendFunction.NORMAL}
            />
            <Vignette eskil={false} offset={0.25} darkness={0.9} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
