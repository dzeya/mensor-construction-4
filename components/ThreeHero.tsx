import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, PerspectiveCamera, ContactShadows, Edges, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const MensorObject = () => {
  const meshRef = useRef<THREE.Group>(null);
  
  // Create geometry once
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(2.8, 0), []);

  useFrame((state) => {
    if (meshRef.current) {
      // Elegant, slow rotation to showcase the geometry
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {/* The Solid Black Core - Brutal, Matte, Metallic */}
      <mesh geometry={geometry}>
        <meshPhysicalMaterial 
          color="#151515"      // Dark charcoal for better light reaction than pure black
          roughness={0.7}      // Matte finish but catches light
          metalness={0.8}      // Metallic feel
          flatShading={true}   // Faceted "low-poly" look for texture
          clearcoat={0.1}      // Slight clearcoat for premium feel
          clearcoatRoughness={0.5}
        />
        
        {/* Thick Orange Edges - Industrial Look */}
        <Edges 
          scale={1.005} 
          threshold={15} // Only show edges at sharp angles
          color="#E33E2B"
          linewidth={2}  // Precise lines
        />
      </mesh>

      {/* Internal "Structure" - Adds depth/complexity */}
      <mesh scale={[0.9, 0.9, 0.9]}>
        <icosahedronGeometry args={[2.8, 1]} />
        <meshBasicMaterial 
          color="#E33E2B" 
          wireframe 
          transparent 
          opacity={0.03} 
        />
      </mesh>
    </group>
  );
};

const ThreeHero = () => {
  return (
    <div className="absolute inset-0 z-0 bg-mensor-dark">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.0 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />
        
        {/* Cinematic, Dramatic Lighting */}
        <ambientLight intensity={0.2} />
        
        {/* Main Key Light - Cool white for contrast */}
        <spotLight 
          position={[15, 15, 15]} 
          angle={0.3} 
          penumbra={1} 
          intensity={30} 
          castShadow 
          color="#ffffff"
        />
        
        {/* Rim Light - Mensor Red */}
        <spotLight 
          position={[-10, 5, -10]} 
          intensity={30} 
          color="#E33E2B" 
          angle={0.5}
          penumbra={1}
        />

        {/* Fill from bottom - warm gray */}
        <pointLight position={[0, -10, 5]} intensity={5} color="#444" />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <MensorObject />
        </Float>
        
        {/* ATMOSPHERIC PARTICLES / DUST */}
        <Sparkles 
          count={150} 
          scale={12} 
          size={2} 
          speed={0.4} 
          opacity={0.4} 
          color="#E33E2B" // Red dust
          noise={0.1}
        />
        <Sparkles 
          count={200} 
          scale={15} 
          size={1} 
          speed={0.2} 
          opacity={0.3} 
          color="#ffffff" // White dust
        />

        {/* Sharp shadow to ground the object */}
        <ContactShadows 
          position={[0, -4.5, 0]} 
          opacity={0.5} 
          scale={20} 
          blur={2.5} 
          color="#000000" 
          far={5} 
        />
        
        {/* Warehouse environment for industrial reflections */}
        <Environment preset="city" background={false} />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={2 * Math.PI / 3}
        />
      </Canvas>
      
      {/* Vignette & Grain Overlay for Cinematic Feel */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,#050505_120%)] pointer-events-none opacity-90" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
};

export default ThreeHero;