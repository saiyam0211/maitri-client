// src/components/ProductShowcase/Model3D.jsx
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export function Model3D({ modelPath, rotation = 0.01 }) {
  const modelRef = useRef();
  const { scene } = useGLTF(modelPath);

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += rotation;
    }
  });

  return <primitive ref={modelRef} object={scene} position={[0, 0, 0]} />;
}
