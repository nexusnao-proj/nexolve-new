"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Signature 3D visual: an abstract dimensional ribbon inspired by the
 * Nexolve ribbon, flowing Deep Navy → Signal Blue → Deep Navy.
 *
 * Performance contract:
 * - loaded only via dynamic import (never in the main bundle)
 * - DPR clamped; geometry density reduced on small screens
 * - frameloop switched to "never" when off-screen or tab hidden (prop)
 * - slow, elegant motion + subtle pointer response; no aggressive spinning
 * - geometry and materials disposed on unmount
 */

const BRAND_STOPS = ["#0b2a44", "#4aa3dd", "#1a5a8a", "#0b2a44"].map(
  (c) => new THREE.Color(c),
);

function gradientColor(t: number): THREE.Color {
  const scaled = Math.min(0.9999, Math.max(0, t)) * (BRAND_STOPS.length - 1);
  const i = Math.floor(scaled);
  const a = BRAND_STOPS[i] ?? BRAND_STOPS[0]!;
  const b = BRAND_STOPS[i + 1] ?? a;
  return a.clone().lerp(b, scaled - i);
}

function buildRibbonGeometry(segments: number, width: number): THREE.BufferGeometry {
  // A flowing curve that folds like the logo's ribbon "N".
  const curve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-2.6, 1.55, 0.35),
      new THREE.Vector3(-2.75, 0.1, -0.15),
      new THREE.Vector3(-2.0, -1.35, -0.45),
      new THREE.Vector3(-0.7, -0.55, 0.5),
      new THREE.Vector3(0.7, 0.7, -0.35),
      new THREE.Vector3(2.0, 1.45, 0.3),
      new THREE.Vector3(2.75, 0.2, 0.5),
      new THREE.Vector3(2.35, -1.5, -0.25),
    ],
    false,
    "catmullrom",
    0.6,
  );

  const frames = curve.computeFrenetFrames(segments, false);
  const positions = new Float32Array((segments + 1) * 2 * 3);
  const colors = new Float32Array((segments + 1) * 2 * 3);
  const indices: number[] = [];
  const half = width / 2;

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const point = curve.getPointAt(t);
    const binormal = frames.binormals[i] ?? new THREE.Vector3(0, 1, 0);
    // Gentle twist along the length so the ribbon "folds" in space.
    const twist = Math.sin(t * Math.PI * 2.2) * 0.85;
    const side = binormal
      .clone()
      .applyAxisAngle(frames.tangents[i] ?? new THREE.Vector3(1, 0, 0), twist);

    const color = gradientColor(t);
    for (const dir of [-1, 1] as const) {
      const idx = (i * 2 + (dir === -1 ? 0 : 1)) * 3;
      positions[idx] = point.x + side.x * half * dir;
      positions[idx + 1] = point.y + side.y * half * dir;
      positions[idx + 2] = point.z + side.z * half * dir;
      colors[idx] = color.r;
      colors[idx + 1] = color.g;
      colors[idx + 2] = color.b;
    }
    if (i < segments) {
      const a = i * 2;
      indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function Ribbon({ detail }: { detail: "full" | "reduced" }) {
  const groupRef = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const geometry = useMemo(
    () => buildRibbonGeometry(detail === "full" ? 240 : 120, 0.62),
    [detail],
  );
  const nodeGeometry = useMemo(() => new THREE.SphereGeometry(0.045, 12, 12), []);
  const nodePositions = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-2.9, 1.9, -0.6),
        new THREE.Vector3(-1.2, -1.9, 0.7),
        new THREE.Vector3(0.4, 1.9, 0.8),
        new THREE.Vector3(1.7, -1.7, -0.7),
        new THREE.Vector3(3.0, 1.4, -0.4),
      ],
      false,
    );
    const count = detail === "full" ? 14 : 8;
    return Array.from({ length: count }, (_, i) => {
      const t = i / (count - 1);
      const p = curve.getPointAt(t);
      return { position: [p.x, p.y, p.z] as [number, number, number], t };
    });
  }, [detail]);

  useEffect(() => {
    // Pointer parallax — throttled by useFrame's rAF loop (we only store here).
    const onPointer = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => window.removeEventListener("pointermove", onPointer);
  }, []);

  useEffect(() => {
    return () => {
      geometry.dispose();
      nodeGeometry.dispose();
    };
  }, [geometry, nodeGeometry]);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;
    const t = state.clock.elapsedTime;
    // Slow, elegant sway — never a full spin.
    const targetY = Math.sin(t * 0.14) * 0.32 + pointer.current.x * 0.16;
    const targetX = Math.cos(t * 0.11) * 0.14 - pointer.current.y * 0.1;
    group.rotation.y += (targetY - group.rotation.y) * 0.04;
    group.rotation.x += (targetX - group.rotation.x) * 0.04;
    group.position.y = Math.sin(t * 0.25) * 0.08;
  });

  return (
    <group ref={groupRef} rotation={[0.05, -0.15, -0.18]}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          vertexColors
          side={THREE.DoubleSide}
          roughness={0.38}
          metalness={0.08}
        />
      </mesh>
      {nodePositions.map((node, i) => (
        <mesh key={i} geometry={nodeGeometry} position={node.position}>
          <meshBasicMaterial color={gradientColor(node.t)} transparent opacity={0.55} />
        </mesh>
      ))}
    </group>
  );
}

export type RibbonSceneProps = {
  /** "always" renders; "never" fully pauses (off-screen / hidden tab). */
  frameloop: "always" | "never";
  detail: "full" | "reduced";
};

export default function RibbonScene({ frameloop, detail }: RibbonSceneProps) {
  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5.4], fov: 42 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      aria-hidden="true"
    >
      <ambientLight intensity={1.15} />
      <directionalLight position={[3, 4, 6]} intensity={1.1} />
      <directionalLight position={[-4, -2, 3]} intensity={0.45} color="#4aa3dd" />
      <Ribbon detail={detail} />
    </Canvas>
  );
}
