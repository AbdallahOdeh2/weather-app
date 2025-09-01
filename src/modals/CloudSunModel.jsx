import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import cloudsun from "../models/cloudsun.gltf?url";

export default function CloudModel(props) {
  const { scene } = useGLTF(cloudsun);
  const ref = useRef();
  const sunRefs = useRef([]);
  const cloudRefs = useRef([]);

  useEffect(() => {
    sunRefs.current = [];
    cloudRefs.current = [];

    scene.traverse((child) => {
      if (child.isMesh) {
        const name = child.name.toLowerCase();

        if (name === "sun" || name === "cone") {
          child.material = new THREE.MeshStandardMaterial({
            color: "#ffb347",
            emissive: new THREE.Color("#ffcc70"),
            emissiveIntensity: 0.5,
            metalness: 0.4,
            roughness: 0.4,
          });
          sunRefs.current.push(child);
        } else if (name === "cloud" || name.includes("mesh_0_instance")) {
          child.material = new THREE.MeshStandardMaterial({
            color: "#dddddd",
            emissive: new THREE.Color("#aaaaaa"),
            emissiveIntensity: 0.15,
            metalness: 0.1,
            roughness: 0.85,
          });
          cloudRefs.current.push(child);
        }

        child.material.needsUpdate = true;
      }
    });
  }, [scene]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (ref.current) {
      const scale = 1 + 0.03 * Math.sin(t * 1.5);
      ref.current.scale.set(scale, scale, scale);
      ref.current.rotation.y += 0.002;
    }

    // ☀ Animate sun glow and rotation
    sunRefs.current.forEach((sun, i) => {
      sun.rotation.z += 0.01;
      sun.material.emissiveIntensity = 0.5 + 0.3 * Math.sin(t * 2 + i);
    });

    // ☁ Animate clouds with slight vertical float
    cloudRefs.current.forEach((cloud, i) => {
      cloud.position.y += Math.sin(t * 0.5 + i) * 0.001;
    });
  });

  return <primitive ref={ref} object={scene} {...props} />;
}
