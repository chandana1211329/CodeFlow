import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface StackCubeProps {
  position: [number, number, number];
  value: any;
  index: number;
  isChanged?: boolean;
}

const StackCube: React.FC<StackCubeProps> = ({ position, value, index, isChanged }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Gentle hover/rotation micro-animation of the box and value text together
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2.5 + index) * 0.08;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.05;
    }
  });

  const displayValue = typeof value === 'string' ? `"${value}"` : String(value);
  // Premium HSL-based colors (Deep Slate/Blue to Cyan)
  const color = isChanged ? '#3b82f6' : '#1e1b4b'; // Dark blue-violet

  return (
    <group position={position}>
      {/* Floating subgroup for the cube and value text */}
      <group ref={groupRef}>
        <RoundedBox
          args={[1.5, 1.4, 1.5]}
          radius={0.12}
          smoothness={4}
        >
          <meshStandardMaterial
            color={color}
            roughness={0.2}
            metalness={0.5}
            emissive={isChanged ? '#3b82f6' : '#4338ca'}
            emissiveIntensity={isChanged ? 0.6 : 0.2}
          />
        </RoundedBox>

        {/* Value Label (floats with the box) */}
        <Text
          position={[0, 0, 0.81]}
          fontSize={0.45}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.3}
          fontWeight="bold"
        >
          {displayValue}
        </Text>
      </group>

      {/* Index Label (faded on the side, stays static) */}
      <Text
        position={[-1.2, 0, 0]}
        fontSize={0.25}
        color="#a5b4fc"
        anchorX="right"
        anchorY="middle"
      >
        {`[${index}]`}
      </Text>
    </group>
  );
};

interface ThreeDStackProps {
  name: string;
  elements: any[];
  yOffset: number;
  capacity?: number;
}

const ThreeDStack: React.FC<ThreeDStackProps> = ({ name, elements, yOffset, capacity = 5 }) => {
  // Let the stack container height grow dynamically based on the elements, plus 1 empty slot,
  // up to the maximum capacity of the stack.
  const displayCapacity = Math.max(elements.length + 1, 3);
  const containerHeight = Math.min(capacity, displayCapacity) * 1.8;
  const containerY = (containerHeight / 2) - 0.9;

  return (
    <group position={[0, yOffset, 0]}>
      {/* Label for the Stack Variable */}
      <Text
        position={[0, containerHeight - 0.3, 0]}
        fontSize={0.5}
        color="#818cf8"
        anchorX="center"
        anchorY="bottom"
        fontWeight="bold"
      >
        {name} (Stack)
      </Text>

      {/* Stack Container/Glass Jar Walls */}
      <group position={[0, 0, 0]}>
        {/* Left Wall */}
        <RoundedBox
          args={[0.1, containerHeight, 1.8]}
          position={[-1.0, containerY, 0]}
          radius={0.02}
        >
          <meshStandardMaterial
            color="#6366f1"
            transparent
            opacity={0.15}
            roughness={0.1}
            metalness={0.9}
          />
        </RoundedBox>

        {/* Right Wall */}
        <RoundedBox
          args={[0.1, containerHeight, 1.8]}
          position={[1.0, containerY, 0]}
          radius={0.02}
        >
          <meshStandardMaterial
            color="#6366f1"
            transparent
            opacity={0.15}
            roughness={0.1}
            metalness={0.9}
          />
        </RoundedBox>

        {/* Bottom Wall / Base */}
        <RoundedBox
          args={[2.1, 0.1, 1.8]}
          position={[0, -0.9, 0]}
          radius={0.02}
        >
          <meshStandardMaterial
            color="#6366f1"
            transparent
            opacity={0.3}
            roughness={0.1}
            metalness={0.9}
          />
        </RoundedBox>
      </group>

      {/* Render Stack Cubes */}
      {elements.map((value, idx) => {
        const valueStr = typeof value === 'object' ? JSON.stringify(value) : String(value);
        const uniqueKey = `${name}-${idx}-${valueStr}`;

        return (
          <StackCube
            key={uniqueKey}
            position={[0, idx * 1.8, 0]}
            value={value}
            index={idx}
            isChanged={idx === elements.length - 1} // highlight topmost element
          />
        );
      })}

      {/* Floating "TOP" Badge pointing to topmost element */}
      {elements.length > 0 && (
        <group position={[1.8, (elements.length - 1) * 1.8, 0]}>
          <Text
            fontSize={0.35}
            color="#ec4899" // hot pink
            anchorX="left"
            anchorY="middle"
            fontWeight="bold"
          >
            {"← TOP"}
          </Text>
        </group>
      )}

      {/* Empty Stack Indicator */}
      {elements.length === 0 && (
        <Text
          position={[0, 0, 0.5]}
          fontSize={0.4}
          color="#6b7280"
          anchorX="center"
          anchorY="middle"
          fontStyle="italic"
        >
          Empty Stack
        </Text>
      )}
    </group>
  );
};

export default ThreeDStack;
