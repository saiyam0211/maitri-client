// src/components/ProductShowcase/Scene3D.jsx
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Stage } from "@react-three/drei";
import { Model3D } from "./Model3D";

export function Scene3D({ modelPath, isCentered = true }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <Stage environment="city" intensity={0.6}>
          <Model3D modelPath={modelPath} rotation={isCentered ? 0.005 : 0.01} />
        </Stage>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Suspense>
    </Canvas>
  );
}
