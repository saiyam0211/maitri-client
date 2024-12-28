// src/components/ProductShowcase/Model.jsx
import React from 'react';
import { useGLTF } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';

function Model({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  
  return (
    <>
      <primitive 
        object={scene} 
        scale={2}
        position={[0, 0, 0]} 
      />
      <Environment preset="studio" />
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={4}
      />
    </>
  );
}

export default Model;