// src/components/ProductShowcase/ProductScene.jsx
import React from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function ProductScene({ modelPath }) {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 45 }}>
      <PresentationControls
        global
        rotation={[0, -0.3, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Stage environment="city" intensity={0.6}>
          <Model url={modelPath} />
        </Stage>
      </PresentationControls>
    </Canvas>
  );
}
