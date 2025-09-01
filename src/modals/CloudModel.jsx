import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import cloud from "../models/cloud.gltf?url";

export default function CloudModel(props) {
  const { scene } = useGLTF(cloud);
  const ref = useRef();

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.color.set("#cccccc"); // light gray for cloud
        child.material.emissive = new THREE.Color("#eeeeee"); // soft white glow
        child.material.emissiveIntensity = 0.2;
        child.material.metalness = 0.2;
        child.material.roughness = 0.8;
        child.material.needsUpdate = true;
      }
    });
  }, [scene]);

  useFrame(({ clock }) => {
    if (ref.current) {
      const s = 1 + 0.05 * Math.sin(clock.getElapsedTime() * 1.5);
      ref.current.scale.set(s, s, s);
      ref.current.rotation.y += 0.005;
    }
  });

  return <primitive ref={ref} object={scene} {...props} />;
}
