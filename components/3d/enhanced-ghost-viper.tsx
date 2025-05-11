"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

export default function EnhancedGhostViper({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  hoveredPart,
  setHoveredPart,
  resetView = false,
  lowDetail = false, // Add lowDetail prop for distance rendering
}) {
  const group = useRef(null)

  // Gentle floating animation
  useFrame((state) => {
    if (!resetView && group.current) {
      group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05
    }
  })

  // Determine detail level based on prop
  const segments = lowDetail
    ? {
        body: 4, // radialSegments for cone
        wings: [1, 1, 1], // [widthSegments, heightSegments, depthSegments]
        sphere: [6, 6], // [widthSegments, heightSegments]
        cylinder: [6, 1], // [radialSegments, heightSegments]
      }
    : {
        body: 16,
        wings: [2, 1, 2],
        sphere: [16, 16],
        cylinder: [16, 1],
      }

  return (
    <group ref={group} position={position} rotation={rotation} scale={0.7}>
      {/* Main body - stealth design */}
      <mesh
        position={[0, 0, 0]}
        onPointerOver={() => setHoveredPart && setHoveredPart("Main Body")}
        onPointerOut={() => setHoveredPart && setHoveredPart(null)}
        castShadow
        receiveShadow
      >
        <coneGeometry args={[0.5, 2, segments.body]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Body details */}
      {!lowDetail && (
        <group position={[0, 0, 0]}>
          {[...Array(lowDetail ? 1 : 3)].map((_, i) => (
            <mesh key={`body-line-${i}`} position={[0, 0, -0.5 + i * 0.5]} castShadow receiveShadow>
              <torusGeometry args={[0.5, 0.01, 8, 8]} />
              <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.1} />
            </mesh>
          ))}
        </group>
      )}

      {/* Stealth coating */}
      <mesh position={[0, 0, 0]} scale={[1.01, 1.01, 1.01]} castShadow receiveShadow>
        <coneGeometry args={[0.5, 2, segments.body]} />
        <meshStandardMaterial color="#0f172a" metalness={0.2} roughness={0.9} transparent opacity={0.7} />
      </mesh>

      {/* Main wings - X configuration */}
      <group>
        {[0, Math.PI / 2].map((rot, i) => (
          <mesh
            key={`wing-${i}`}
            position={[0, 0, 0]}
            rotation={[0, rot, 0]}
            onPointerOver={() => setHoveredPart && setHoveredPart("Wings")}
            onPointerOut={() => setHoveredPart && setHoveredPart(null)}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[2, 0.05, 0.5, segments.wings[0], segments.wings[1], segments.wings[2]]} />
            <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* Wing details */}
      {!lowDetail && (
        <group>
          {[0, Math.PI / 2].map((rot, i) => (
            <group key={`wing-details-${i}`} rotation={[0, rot, 0]}>
              {/* Wing edges */}
              <mesh position={[0.95, 0, 0]} rotation={[0, 0, 0.1]} castShadow receiveShadow>
                <boxGeometry args={[0.1, 0.05, 0.5, 1, 1, 1]} />
                <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
              </mesh>
              <mesh position={[-0.95, 0, 0]} rotation={[0, 0, -0.1]} castShadow receiveShadow>
                <boxGeometry args={[0.1, 0.05, 0.5, 1, 1, 1]} />
                <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
              </mesh>

              {/* Wing reinforcements */}
              {(lowDetail ? [0] : [-0.7, 0, 0.7]).map((x, j) => (
                <mesh key={`wing-reinforce-${i}-${j}`} position={[x, 0, 0]} castShadow receiveShadow>
                  <boxGeometry args={[0.05, 0.07, 0.5, 1, 1, 1]} />
                  <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
                </mesh>
              ))}
            </group>
          ))}
        </group>
      )}

      {/* Warhead - primary payload */}
      <group>
        <mesh
          position={[0, 0, 1]}
          onPointerOver={() => setHoveredPart && setHoveredPart("Warhead")}
          onPointerOut={() => setHoveredPart && setHoveredPart(null)}
          castShadow
          receiveShadow
        >
          <sphereGeometry args={[0.3, segments.sphere[0], segments.sphere[1]]} />
          <meshStandardMaterial color="#ef4444" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Warhead details */}
        {!lowDetail && (
          <>
            <mesh position={[0, 0, 1.15]} castShadow receiveShadow>
              <cylinderGeometry args={[0.15, 0.15, 0.1, segments.cylinder[0]]} />
              <meshStandardMaterial color="#b91c1c" metalness={0.7} roughness={0.3} />
            </mesh>

            {/* Detonator */}
            <mesh position={[0, 0, 1.25]} castShadow receiveShadow>
              <cylinderGeometry args={[0.05, 0.05, 0.1, segments.cylinder[0] / 2]} />
              <meshStandardMaterial color="#7f1d1d" metalness={0.7} roughness={0.3} />
            </mesh>
          </>
        )}
      </group>

      {/* Guidance system */}
      {!lowDetail && (
        <group>
          <mesh
            position={[0, 0.2, 0.7]}
            onPointerOver={() => setHoveredPart && setHoveredPart("Guidance System")}
            onPointerOut={() => setHoveredPart && setHoveredPart(null)}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[0.2, 0.1, 0.2, 1, 1, 1]} />
            <meshStandardMaterial color="#60a5fa" metalness={0.6} roughness={0.4} />
          </mesh>

          {/* Guidance system details */}
          <mesh position={[0, 0.2, 0.8]} castShadow receiveShadow>
            <boxGeometry args={[0.15, 0.05, 0.05, 1, 1, 1]} />
            <meshStandardMaterial
              color="#bfdbfe"
              metalness={0.9}
              roughness={0.1}
              emissive="#60a5fa"
              emissiveIntensity={0.5}
            />
          </mesh>
        </group>
      )}

      {/* Targeting sensors */}
      {!lowDetail && (
        <group position={[0, 0, 0.9]}>
          {[-0.15, 0.15].map((x, i) => (
            <mesh key={`sensor-${i}`} position={[x, 0.1, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.03, 0.03, 0.05, segments.cylinder[0] / 2]} />
              <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
            </mesh>
          ))}
          {[-0.15, 0.15].map((x, i) => (
            <mesh key={`sensor-lens-${i}`} position={[x, 0.1, 0.03]} castShadow receiveShadow>
              <sphereGeometry args={[0.025, segments.sphere[0] / 2, segments.sphere[1] / 2]} />
              <meshStandardMaterial
                color="#60a5fa"
                metalness={0.9}
                roughness={0.1}
                emissive="#60a5fa"
                emissiveIntensity={0.5}
              />
            </mesh>
          ))}
        </group>
      )}

      {/* Engine */}
      <group>
        <mesh
          position={[0, 0, -1]}
          onPointerOver={() => setHoveredPart && setHoveredPart("Engine")}
          onPointerOut={() => setHoveredPart && setHoveredPart(null)}
          castShadow
          receiveShadow
        >
          <cylinderGeometry args={[0.2, 0.3, 0.5, segments.cylinder[0]]} />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Engine details */}
        <mesh position={[0, 0, -1.25]} castShadow receiveShadow>
          <cylinderGeometry args={[0.25, 0.25, 0.1, segments.cylinder[0]]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Engine exhaust */}
        <mesh position={[0, 0, -1.3]} castShadow receiveShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.1, segments.cylinder[0]]} />
          <meshStandardMaterial
            color="#ef4444"
            emissive="#ef4444"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Exhaust glow */}
        {!lowDetail && (
          <mesh position={[0, 0, -1.35]} castShadow receiveShadow>
            <cylinderGeometry args={[0.15, 0.05, 0.1, segments.cylinder[0]]} />
            <meshStandardMaterial
              color="#fef08a"
              emissive="#fef08a"
              emissiveIntensity={1}
              metalness={0.9}
              roughness={0.1}
              transparent
              opacity={0.7}
            />
          </mesh>
        )}
      </group>

      {/* Fuel lines */}
      {!lowDetail && (
        <group>
          {[0, Math.PI / 2].map((rot, i) => (
            <mesh key={`fuel-line-${i}`} position={[0, 0, -0.5]} rotation={[0, rot, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.03, 0.03, 1, segments.cylinder[0] / 2]} />
              <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.2} />
            </mesh>
          ))}
        </group>
      )}

      {/* Stabilizer fins */}
      <group position={[0, 0, -0.8]}>
        {(lowDetail ? [0, Math.PI] : [0, Math.PI / 2, Math.PI, Math.PI * 1.5]).map((rot, i) => (
          <mesh key={`fin-${i}`} position={[0, 0, 0]} rotation={[0, rot, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.5, 0.05, 0.2, 1, 1, 1]} />
            <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* Navigation lights */}
      <group>
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.03, segments.sphere[0] / 2, segments.sphere[1] / 2]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
        </mesh>
        <mesh position={[0, -0.3, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.03, segments.sphere[0] / 2, segments.sphere[1] / 2]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={1} />
        </mesh>
      </group>
    </group>
  )
}
