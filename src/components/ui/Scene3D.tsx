"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function TechArtifact() {
  const meshRef = useRef<THREE.Mesh>(null);
  const time = useRef(0);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Use delta to increment time manually, avoiding the deprecated THREE.Clock
    time.current += state.clock.getDelta();

    meshRef.current.rotation.x = time.current * 0.1;
    meshRef.current.rotation.y = time.current * 0.15;
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.3, 64, 16]} />
        <meshStandardMaterial
          color="#2e5bff"
          wireframe
          emissive="#2e5bff"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <Canvas
        dpr={[1, 1]} // Cap DPR at 1 for significantly better performance on high-res screens
        gl={{
          antialias: false, // Disable antialiasing for a huge performance boost (looks fine with wireframes)
          powerPreference: "high-performance"
        }}
        camera={{ position: [0, 0, 5], fov: 45 }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#2e5bff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />

        <group position={[0, 0, 0]}>
           <TechArtifact />
        </group>
      </Canvas>
    </div>
  );
}
