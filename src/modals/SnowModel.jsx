/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import snow from "../models/snow.gltf?url";

export default function SnowModel(props) {
  const { scene } = useGLTF(snow);
  const ref = useRef();
  const snowRefs = useRef([]);
  const cloudRefs = useRef([]);

  useEffect(() => {
    snowRefs.current = [];
    cloudRefs.current = [];

    scene.traverse((child) => {
      if (child.isMesh) {
        const name = child.name.toLowerCase();

        const isSnowflake =
          name === "cylinder_2" ||
          name.startsWith("cylinder_2_") ||
          /cylinder_(\d+)(_)?/.test(name) ||
          /mesh_\d+_instance_\d+/.test(name); // fallback instance pattern

        if (isSnowflake) {
          // ❄ Snowflake material
          child.material = new THREE.MeshStandardMaterial({
            color: "#a0c4ff",
            emissive: new THREE.Color("#a0c4ff"),
            emissiveIntensity: 0.6,
            metalness: 0.1,
            roughness: 0.3,
            transparent: true,
            opacity: 0.85,
            side: THREE.DoubleSide, // Ensure visible from all angles
          });

          // Initialize snowflake properties
          child.userData = {
            speed: 0.02 + Math.random() * 0.03, // Random fall speed
            sway: 0.01 + Math.random() * 0.02, // Horizontal sway amount
            rotationSpeed: (Math.random() - 0.5) * 0.05, // Rotation speed
            startY: Math.random() * 5 + 2, // Store start position for reset
            startX: child.position.x, // Store original X position
          };

          snowRefs.current.push(child);
        } else {
          // ☁ Cloud material
          child.material = new THREE.MeshStandardMaterial({
            color: "#888888",
            emissive: new THREE.Color("#111111"),
            emissiveIntensity: 0.2,
            roughness: 0.8,
            metalness: 0.05,
          });

          // Initialize cloud properties
          child.userData = {
            driftSpeed: 0.01 + Math.random() * 0.02, // Drift speed
            rotationSpeed: (Math.random() - 0.5) * 0.005, // Gentle rotation
            startX: child.position.x, // Store original positions
            startY: child.position.y,
            startZ: child.position.z,
            offset: Math.random() * 100, // Random phase offset
          };

          cloudRefs.current.push(child);
        }

        child.material.needsUpdate = true;
      }
    });
  }, [scene]);

  // 🌨 Animate snow + ☁ drifting clouds
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // ❄ Animate snowflakes - enhanced falling animation

    // ☁ Animate clouds - floating left/right & up/down only (no Z drift)
    cloudRefs.current.forEach((cloud, i) => {
      const data = cloud.userData;
      const phase = t * data.driftSpeed + data.offset;

      cloud.position.x = data.startX + Math.sin(phase) * 0.1;
      cloud.position.y = data.startY + Math.cos(phase * 0.7) * 0.05;
      cloud.position.z = data.startZ; // Lock Z

      // Faster rotation
      cloud.rotation.y += data.rotationSpeed * 2;
      // cloud.rotation.z += data.rotationSpeed * 1;

      const scale = 1 + Math.sin(phase * 2) * 0.001;
      cloud.scale.set(scale, scale, scale);
    });
  });

  return <primitive ref={ref} object={scene} {...props} />;
}
