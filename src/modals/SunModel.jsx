import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import sunModel from "../models/sun.gltf?url";

export default function SunModel(props) {
  const { scene } = useGLTF(sunModel);
  const ref = useRef();

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.color.set("#ffb347");
        child.material.emissive = new THREE.Color("#ffcc70");
        child.material.emissiveIntensity = 0.5;
        child.material.metalness = 0.4;
        child.material.needsUpdate = true;
      }
    });
  }, [scene]);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.z += 0.01; // rotate around Y-axis
    }
  });

  useFrame(({ clock }) => {
    if (ref.current) {
      const s = 1 + 0.1 * Math.sin(clock.getElapsedTime() * 2);
      ref.current.scale.set(s, s, s);
      ref.current.rotation.y += 0.01;
    }
  });

  return (
    <primitive ref={ref} object={scene} scale={[2.5, 2.5, 2.5]} {...props} />
  );
}
