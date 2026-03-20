"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

function MatrixParticles() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(4000 * 3);
    for (let i = 0; i < 4000; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.04;
      ref.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#00ff41" size={0.012} sizeAttenuation depthWrite={false} opacity={0.7} />
    </Points>
  );
}

function NeonSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  const time = useRef(0);
  useFrame((_, delta) => {
    time.current += delta;
    const t = time.current;
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.15;
      meshRef.current.rotation.y = t * 0.25;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.5;
    if (ring2Ref.current) ring2Ref.current.rotation.x = t * 0.35;
    if (ring3Ref.current) ring3Ref.current.rotation.y = t * 0.6;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      {/* Core sphere */}
      <Sphere ref={meshRef} args={[1.2, 64, 64]}>
        <MeshDistortMaterial
          color="#071407"
          wireframe={false}
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.9}
          emissive="#00ff41"
          emissiveIntensity={0.1}
        />
      </Sphere>

      {/* Wireframe outer sphere */}
      <Sphere args={[1.25, 16, 16]}>
        <meshBasicMaterial color="#00ff41" wireframe transparent opacity={0.12} />
      </Sphere>

      {/* Orbital rings */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.7, 0.008, 2, 80]} />
        <meshBasicMaterial color="#00ff41" transparent opacity={0.6} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.0, 0.005, 2, 80]} />
        <meshBasicMaterial color="#00ffcc" transparent opacity={0.35} />
      </mesh>
      <mesh ref={ring3Ref} rotation={[Math.PI / 6, Math.PI / 4, 0]}>
        <torusGeometry args={[2.3, 0.004, 2, 80]} />
        <meshBasicMaterial color="#00ff41" transparent opacity={0.2} />
      </mesh>
    </Float>
  );
}

function OrbitingNodes() {
  const nodes = useMemo(() => [
    { speed: 0.7, radius: 2.6, yOffset: 0.3, color: "#00ff41", size: 0.06 },
    { speed: -0.5, radius: 2.2, yOffset: -0.4, color: "#00ffcc", size: 0.05 },
    { speed: 1.1, radius: 2.9, yOffset: 0.1, color: "#39ff14", size: 0.04 },
    { speed: -0.8, radius: 2.4, yOffset: 0.5, color: "#00ff41", size: 0.05 },
    { speed: 0.6, radius: 2.7, yOffset: -0.2, color: "#00ffcc", size: 0.04 },
  ], []);

  return (
    <>
      {nodes.map((n, i) => (
        <OrbitNode key={i} {...n} offset={i * 1.3} />
      ))}
    </>
  );
}

function OrbitNode({ speed, radius, yOffset, color, size, offset }: {
  speed: number; radius: number; yOffset: number; color: string; size: number; offset: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.Mesh>(null);

  const time = useRef(0);
  useFrame((_, delta) => {
    time.current += delta;
    const t = time.current * speed + offset;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      ref.current.position.y = Math.sin(t * 0.5) * yOffset;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 12, 12]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} />
    </mesh>
  );
}

function GridPlane() {
  const ref = useRef<THREE.GridHelper>(null);
  const time = useRef(0);
  useFrame((_, delta) => {
    time.current += delta;
    if (ref.current) ref.current.position.z = (time.current * 0.5) % 1;
  });
  return (
    <gridHelper
      ref={ref}
      args={[20, 20, "#003a10", "#001a08"]}
      position={[0, -3, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

export default function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.05} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#00ff41" />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color="#00ffcc" />
      <pointLight position={[0, 5, -5]} intensity={0.5} color="#39ff14" />
      <MatrixParticles />
      <NeonSphere />
      <OrbitingNodes />
      <GridPlane />
    </Canvas>
  );
}
