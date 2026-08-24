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
  changeBadge?: string;
  pointerVarName?: string;
  hasPointer?: boolean;
}

const DataCube: React.FC<DataCubeProps> = ({ position, value, index, label, isChanged, changeBadge, pointerVarName, hasPointer }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Smooth hover/pulse animation of box when changed or pointed by loop
  useFrame((state) => {
    if (groupRef.current) {
      const hoverFreq = (isChanged || hasPointer) ? 4 : 2;
      const hoverAmp = (isChanged || hasPointer) ? 0.25 : 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * hoverFreq + index) * hoverAmp;
      if (isChanged && groupRef.current) {
        const s = 1 + Math.sin(state.clock.elapsedTime * 6) * 0.05;
        groupRef.current.scale.set(s, s, s);
      }
    }
  });

  const displayValue = typeof value === 'string' ? `"${value}"` : String(value);
  const color = isChanged ? '#10b981' : (hasPointer ? '#3b82f6' : '#1f2937');
  const emissiveColor = isChanged ? '#059669' : (hasPointer ? '#1d4ed8' : '#000000');

  return (
    <group position={position}>
      {/* 3D Loop Variable Pointer (Floating Above/Below Array Element) */}
      {hasPointer && (
        <group position={[0, 2.2, 0]}>
          <RoundedBox args={[1.4, 0.5, 0.25]} radius={0.1}>
            <meshStandardMaterial color="#3b82f6" emissive="#1d4ed8" emissiveIntensity={0.8} />
          </RoundedBox>
          <Text position={[0, 0, 0.15]} fontSize={0.25} color="white" anchorX="center" anchorY="middle" fontWeight="bold">
            {`↑ ${pointerVarName} = ${index}`}
          </Text>
        </group>
      )}

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
            emissive={emissiveColor}
            emissiveIntensity={isChanged ? 0.8 : (hasPointer ? 0.6 : 0)}
            metalness={0.4}
            roughness={0.2}
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
          fontWeight="bold"
        >
          {displayValue}
        </Text>

        {/* 3D State Change Badge */}
        {changeBadge && (
          <group position={[0, 1.2, 0]}>
            <RoundedBox args={[1.2, 0.4, 0.2]} radius={0.08}>
              <meshStandardMaterial color="#10b981" emissive="#059669" emissiveIntensity={0.6} />
            </RoundedBox>
            <Text position={[0, 0, 0.12]} fontSize={0.22} color="white" anchorX="center" anchorY="middle" fontWeight="bold">
              {changeBadge}
            </Text>
          </group>
        )}
      </group>

      {/* Index Label (stays static) */}
      <Text
        position={[0, -1, 0.8]}
        fontSize={0.3}
        color={hasPointer ? '#60a5fa' : (isChanged ? '#34d399' : '#9ca3af')}
        anchorX="center"
        anchorY="middle"
        fontWeight={(isChanged || hasPointer) ? 'bold' : 'normal'}
      >
        {`index: ${index}`}
      </Text>

      {/* Optional Variable Name Label (stays static) */}
      {label && (
        <Text
          position={[0, 1.6, 0]}
          fontSize={0.45}
          color="#60a5fa"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
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
  changedIndices?: number[];
  changeBadges?: Record<number, string>;
  pointerVarName?: string;
  pointerIndex?: number;
}

const ThreeDArray: React.FC<ThreeDArrayProps> = ({ 
  name, 
  elements, 
  yOffset, 
  changedIndices = [], 
  changeBadges = {},
  pointerVarName,
  pointerIndex
}) => {
  return (
    <group position={[0, yOffset, 0]}>
      {elements.map((value, idx) => {
        const valueStr = typeof value === 'object' ? JSON.stringify(value) : String(value);
        const duplicateCount = elements.slice(0, idx).filter(v => 
          (typeof v === 'object' ? JSON.stringify(v) : String(v)) === valueStr
        ).length;
        const uniqueKey = `${name}-${idx}-${valueStr}-${duplicateCount}`;
        const isChanged = changedIndices.includes(idx);
        const badge = changeBadges[idx];
        const hasPointer = pointerIndex === idx;

        return (
          <DataCube
            key={uniqueKey}
            position={[(idx - (elements.length - 1) / 2) * 2, 0, 0]}
            value={value}
            index={idx}
            label={idx === 0 ? name : undefined}
            isChanged={isChanged}
            changeBadge={badge}
            pointerVarName={pointerVarName}
            hasPointer={hasPointer}
          />
        );
      })}
    </group>
  );
};

export default ThreeDArray;

