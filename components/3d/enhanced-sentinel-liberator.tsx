"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

export default function EnhancedSentinelLiberator({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  setHoveredPart,
  resetView = false,
}) {
  const group = useRef(null)

  useFrame((state) => {
    if (!resetView && group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() / 2) * 0.05
      group.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1
    }
  })

  return (
    <group ref={group} position={position} rotation={rotation} scale={0.7}>
      {/* Main body */}
      <mesh
        position={[0, 0, 0]}
        onPointerOver={() => setHoveredPart && setHoveredPart("Main Body")}
        onPointerOut={() => setHoveredPart && setHoveredPart(null)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[2, 0.5, 1]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Wings */}
      <mesh
        position={[0, 0.75, 0]}
        rotation={[0, Math.PI / 4, 0]}
        onPointerOver={() => setHoveredPart && setHoveredPart("Wings")}
        onPointerOut={() => setHoveredPart && setHoveredPart(null)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[4, 0.1, 0.5]} />
        <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.75, 0]} rotation={[0, -Math.PI / 4, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.1, 0.5]} />
        <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Engines */}
      <mesh
        position={[1.2, 0, 0]}
        onPointerOver={() => setHoveredPart && setHoveredPart("Engine")}
        onPointerOut={() => setHoveredPart && setHoveredPart(null)}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[0.3, 0.3, 1, 16]} />
        <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-1.2, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.3, 1, 16]} />
        <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Stabilizers */}
      <mesh position={[0, -0.5, 0.6]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.1, 0.5]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.5, -0.6]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.1, 0.5]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Sensors */}
      <mesh
        position={[0, 0.2, 0.6]}
        onPointerOver={() => setHoveredPart && setHoveredPart("Sensors")}
        onPointerOut={() => setHoveredPart && setHoveredPart(null)}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[0.2, 0.2, 0.3, 16]} />
        <meshStandardMaterial color="#60a5fa" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  )
}
