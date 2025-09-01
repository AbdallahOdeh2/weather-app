/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import thunder from "../models/thunder.gltf?url";

export default function ThunderModel(props) {
  const { scene } = useGLTF(thunder);
  const ref = useRef();
  const dropRefs = useRef([]);

  useEffect(() => {
    dropRefs.current = [];

    scene.traverse((child) => {
      if (child.isMesh) {
        const name = child.name.toLowerCase();

        // 🌧 Raindrop material for "cone"
        if (name.includes("cone")) {
          child.material = new THREE.MeshStandardMaterial({
            color: "#3498db",
            emissive: new THREE.Color("#2980b9"),
            emissiveIntensity: 0.8,
            metalness: 0.2,
            roughness: 0.3,
            transparent: true,
            opacity: 0.7,
          });

          dropRefs.current.push(child);
          child.position.y = Math.random() * 5 + 3;
        }

        // ☁️ Cloud material for "cube"
        else if (name === "cube") {
          child.material = new THREE.MeshStandardMaterial({
            color: "#888888",
            emissive: new THREE.Color("#111111"),
            emissiveIntensity: 0.3,
            metalness: 0.1,
            roughness: 0.9,
          });
        }

        // ⚡ Thunder material + adjusted position
        else if (name.includes("thunder")) {
          child.material = new THREE.MeshStandardMaterial({
            color: "#ffffff", // pure white
            emissive: new THREE.Color("#d0eaff"), // bluish-white glow
            emissiveIntensity: 1.5,
            metalness: 0.1,
            roughness: 0.2,
            transparent: true,
            opacity: 0.9,
          });

          dropRefs.current.push(child);
          // Lower range: closer to cloud base
          child.position.y = Math.random() * 2 + 1; // between y=1 and y=3
        }
      }
    });
  }, [scene]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y += 0.002;
    }

    dropRefs.current.forEach((drop) => {
      drop.position.y -= 0.15;
      if (drop.name.toLowerCase().includes("thunder")) {
        if (drop.position.y < 0) {
          drop.position.y = Math.random() * 2 + 1;
        }
      } else {
        if (drop.position.y < -5) {
          drop.position.y = Math.random() * 5 + 3;
        }
      }
    });
  });

  return <primitive ref={ref} object={scene} {...props} />;
}
