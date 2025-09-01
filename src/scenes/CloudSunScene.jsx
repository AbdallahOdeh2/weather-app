import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import CloudSunModel from "../modals/CloudSunModel";

export default function CloudScene() {
  return (
    <Canvas camera={{ position: [0, 2, 3], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 5]} intensity={1.5} />
      <CloudSunModel />
      <OrbitControls />
      <EffectComposer>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.4}
          luminanceSmoothing={0.9}
        />
      </EffectComposer>
    </Canvas>
  );
}
