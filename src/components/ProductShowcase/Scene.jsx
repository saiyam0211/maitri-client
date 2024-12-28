// src/components/ProductShowcase/Scene.jsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import Model from './Model';

function Scene({ modelPath }) {
  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <color attach="background" args={['transparent']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Model modelPath={modelPath} />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
}

export default Scene;