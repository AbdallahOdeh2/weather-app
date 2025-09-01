import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import SunModel from "../modals/SunModel";

export default function SunScene() {
  return (
    <Canvas camera={{ position: [0, 2, 3], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 3, 5]} intensity={2} />
      <SunModel />
      <OrbitControls />
      <EffectComposer>
        <Bloom
          intensity={4}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.8}
        />
      </EffectComposer>
    </Canvas>
  );
}
