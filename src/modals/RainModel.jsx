/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import cloud from "../models/rain1.gltf?url";

export default function RainModel(props) {
  const { scene } = useGLTF(cloud);
  const ref = useRef();
  const dropRefs = useRef([]);

  useEffect(() => {
    dropRefs.current = [];

    scene.traverse((child) => {
      if (child.isMesh) {
        const name = child.name.toLowerCase();

        // 🌧 Raindrop material for any "cone" name
        if (name.includes("cone")) {
          child.material = new THREE.MeshStandardMaterial({
            color: "#3498db", // bright blue
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

        // ☁️ Cloud material for "cube" name
        else if (name === "cube") {
          child.material = new THREE.MeshStandardMaterial({
            color: "#888888", // dark gray
            emissive: new THREE.Color("#111111"),
            emissiveIntensity: 0.3,
            metalness: 0.1,
            roughness: 0.9,
          });
        }
      }
    });
  }, [scene]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y += 0.002;
    }

    // 🌧 Animate raindrops only
    dropRefs.current.forEach((drop) => {
      drop.position.y -= 0.15;
      if (drop.position.y < -5) {
        drop.position.y = Math.random() * 5 + 3;
      }
    });
  });

  return <primitive ref={ref} object={scene} {...props} />;
}
