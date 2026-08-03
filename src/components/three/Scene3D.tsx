"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Campo de partículas 3D inmersivo. Rota lento por sí solo, hace parallax con
 * el cursor y avanza suavemente con el scroll. Color teal de la marca.
 */
function ParticleField({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribución en una capa esférica para dar sensación de profundidad.
      const r = 5 + Math.pow(Math.random(), 0.6) * 12;
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
    // Rotación base + parallax suave con el puntero.
    pts.rotation.y += delta * 0.02;
    pts.rotation.x = THREE.MathUtils.lerp(
      pts.rotation.x,
      state.pointer.y * 0.15 + Math.sin(t * 0.1) * 0.05,
      0.03
    );
    pts.rotation.z = THREE.MathUtils.lerp(pts.rotation.z, state.pointer.x * 0.1, 0.03);
  });

  const geomArgs = useMemo(
    () => [positions, 3] as [Float32Array, number],
    [positions]
  );

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={geomArgs} />
      </bufferGeometry>
      <pointsMaterial
        color="#2fe6da"
        size={0.075}
        sizeAttenuation
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Icosaedro alámbrico grande y lento al fondo, como punto focal de profundidad. */
function WireShape(props: ThreeElements["mesh"]) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    const m = ref.current;
    if (!m) return;
    m.rotation.x += delta * 0.04;
    m.rotation.y += delta * 0.06;
    // Leve avance/retroceso según el scroll de la página.
    const scroll =
      typeof window !== "undefined"
        ? window.scrollY / Math.max(1, window.innerHeight)
        : 0;
    m.position.z = THREE.MathUtils.lerp(m.position.z, -4 - scroll * 2.5, 0.05);
  });
  return (
    <mesh ref={ref} {...props}>
      <icosahedronGeometry args={[3.2, 1]} />
      <meshBasicMaterial color="#03bfb5" wireframe transparent opacity={0.22} />
    </mesh>
  );
}

/** Mueve la cámara con el puntero para reforzar la profundidad 3D. */
function CameraRig() {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      state.pointer.x * 1.2,
      0.03
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      state.pointer.y * 0.8,
      0.03
    );
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Scene3D({ count = 3500 }: { count?: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.75]}
    >
      <fog attach="fog" args={["#05060a", 8, 22]} />
      <ParticleField count={count} />
      <WireShape />
      <CameraRig />
    </Canvas>
  );
}
