import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface DataCubeProps {
  position: [number, number, number];
  value: any;
  index: number;
  label?: string;
  isChanged?: boolean;
}

const DataCube: React.FC<DataCubeProps> = ({ position, value, index, label, isChanged }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Smooth hover/animation effect of the box and value text together
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2 + index) * 0.1;
    }
  });

  const displayValue = typeof value === 'string' ? `"${value}"` : String(value);
  const color = isChanged ? '#3b82f6' : '#1f2937';

  return (
    <group position={position}>
      {/* Floating subgroup for the cube and value text */}
      <group ref={groupRef}>
        {/* The Cube */}
        <RoundedBox
          args={[1.5, 1.5, 1.5]}
          radius={0.15}
          smoothness={4}
        >
          <meshStandardMaterial
            color={color}
            emissive={isChanged ? '#1d4ed8' : '#000000'}
            emissiveIntensity={0.5}
          />
        </RoundedBox>

        {/* Value Label (floats with the box) */}
        <Text
          position={[0, 0, 0.81]}
          fontSize={0.4}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.2}
        >
          {displayValue}
        </Text>
      </group>

      {/* Index Label (stays static) */}
      <Text
        position={[0, -1, 0.8]}
        fontSize={0.3}
        color="#9ca3af"
        anchorX="center"
        anchorY="middle"
      >
        {`index: ${index}`}
      </Text>

      {/* Optional Variable Name Label (stays static) */}
      {label && (
        <Text
          position={[0, 1.2, 0]}
          fontSize={0.4}
          color="#3b82f6"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      )}
    </group>
  );
};

interface ThreeDArrayProps {
  name: string;
  elements: any[];
  yOffset: number;
}

const ThreeDArray: React.FC<ThreeDArrayProps> = ({ name, elements, yOffset }) => {
  return (
    <group position={[0, yOffset, 0]}>
      {elements.map((value, idx) => {
        const valueStr = typeof value === 'object' ? JSON.stringify(value) : String(value);
        const duplicateCount = elements.slice(0, idx).filter(v => 
          (typeof v === 'object' ? JSON.stringify(v) : String(v)) === valueStr
        ).length;
        const uniqueKey = `${name}-${valueStr}-${duplicateCount}`;
        
        return (
          <DataCube
            key={uniqueKey}
            position={[(idx - (elements.length - 1) / 2) * 2, 0, 0]}
            value={value}
            index={idx}
            label={idx === 0 ? name : undefined}
          />
        );
      })}
    </group>
  );
};

export default ThreeDArray;
