"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/** Campo de partículas 3D: profundidad, parallax con el cursor y rotación. */
function ParticleField({ count, size }: { count: number; size: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 5 + Math.pow(Math.random(), 0.55) * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    const pts = ref.current;
    if (!pts) return;
    const t = state.clock.elapsedTime;
    pts.rotation.y += delta * 0.025;
    pts.rotation.x = THREE.MathUtils.lerp(
      pts.rotation.x,
      state.pointer.y * 0.2 + Math.sin(t * 0.1) * 0.05,
      0.03
    );
    pts.rotation.z = THREE.MathUtils.lerp(pts.rotation.z, state.pointer.x * 0.12, 0.03);
  });

  const geomArgs = useMemo(() => [positions, 3] as [Float32Array, number], [positions]);

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={geomArgs} />
      </bufferGeometry>
      <pointsMaterial
        color="#7bfff2"
        size={size}
        sizeAttenuation
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Torus knot neón que gira, hace parallax y avanza con el scroll (glow vía bloom). */
function GlowKnot() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    const m = ref.current;
    if (!m) return;
    m.rotation.x += delta * 0.15;
    m.rotation.y += delta * 0.2;
    const scroll =
      typeof window !== "undefined" ? window.scrollY / Math.max(1, window.innerHeight) : 0;
    // Parallax con el puntero + retroceso al hacer scroll.
    m.position.x = THREE.MathUtils.lerp(m.position.x, state.pointer.x * 1.5, 0.04);
    m.position.y = THREE.MathUtils.lerp(m.position.y, state.pointer.y * 1.0, 0.04);
    m.position.z = THREE.MathUtils.lerp(m.position.z, -2 - scroll * 3, 0.05);
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.6) * 0.06;
    m.scale.setScalar(s);
  });
  return (
    <mesh ref={ref} position={[0, 0, -2]}>
      <torusKnotGeometry args={[2.4, 0.06, 220, 32]} />
      {/* Color muy brillante para que el bloom lo haga "glow" neón. */}
      <meshBasicMaterial color={[0.2, 2.6, 2.3]} toneMapped={false} />
    </mesh>
  );
}

/** Anillos alámbricos lentos que refuerzan la profundidad. */
function Rings() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * 0.05;
      ref.current.rotation.x += delta * 0.02;
    }
  });
  return (
    <group ref={ref}>
      {[7, 9.5, 12].map((r, i) => (
        <mesh key={r} rotation={[Math.PI / 2 + i * 0.4, i * 0.6, 0]}>
          <torusGeometry args={[r, 0.015, 8, 140]} />
          <meshBasicMaterial color="#03bfb5" transparent opacity={0.35} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

/** Cámara que sigue suavemente al puntero para reforzar la profundidad. */
function CameraRig() {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 1.4, 0.03);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 1.0, 0.03);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Scene3D({
  count = 4200,
  bloom = true,
  size = 0.08,
}: {
  count?: number;
  bloom?: boolean;
  size?: number;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 62 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.75]}
    >
      <fog attach="fog" args={["#05060a", 9, 24]} />
      <ParticleField count={count} size={size} />
      <GlowKnot />
      <Rings />
      <CameraRig />
      {bloom && (
        <EffectComposer>
          <Bloom
            mipmapBlur
            intensity={1.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            radius={0.8}
          />
        </EffectComposer>
      )}
    </Canvas>
  );
}
