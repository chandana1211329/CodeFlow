import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface QueueCubeProps {
  position: [number, number, number];
  value: any;
  index: number;
  isActive: boolean;
  isChanged?: boolean;
}

const QueueCube: React.FC<QueueCubeProps> = ({ position, value, index, isActive, isChanged }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Smooth floating motion for active elements (box + value text)
  useFrame((state) => {
    if (groupRef.current && isActive) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2 + index) * 0.08;
    }
  });

  const displayValue = typeof value === 'string' ? `"${value}"` : String(value);

  // Premium colors
  const activeColor = isChanged ? '#3b82f6' : '#0f766e'; // Teal/Blue shades
  const inactiveColor = '#1e293b'; // Faded slate

  return (
    <group position={position}>
      {isActive ? (
        // Active Solid Element
        <group ref={groupRef}>
          <RoundedBox
            args={[1.5, 1.5, 1.5]}
            radius={0.15}
            smoothness={4}
          >
            <meshStandardMaterial
              color={activeColor}
              emissive={isChanged ? '#1d4ed8' : '#115e59'}
              emissiveIntensity={0.4}
              roughness={0.2}
              metalness={0.4}
            />
          </RoundedBox>

          {/* Value (only displayed if active and not null/undefined) - floats with the box */}
          {value !== null && value !== undefined && (
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
          )}
        </group>
      ) : (
        // Inactive/Empty Buffer Slot (Translucent outline, stays static)
        <RoundedBox
          args={[1.4, 1.4, 1.4]}
          radius={0.1}
          smoothness={2}
        >
          <meshStandardMaterial
            color={inactiveColor}
            transparent
            opacity={0.2}
            wireframe={true}
          />
        </RoundedBox>
      )}

      {/* Index Label (faded bottom, stays static) */}
      <Text
        position={[0, -1, 0.8]}
        fontSize={0.25}
        color="#64748b"
        anchorX="center"
        anchorY="middle"
      >
        {`[${index}]`}
      </Text>
    </group>
  );
};

interface ThreeDQueueProps {
  name: string;
  elements: any[];
  yOffset: number;
  frontIndex?: number;
  rearIndex?: number;
  capacity?: number;
}

const ThreeDQueue: React.FC<ThreeDQueueProps> = ({
  name,
  elements,
  yOffset,
  frontIndex,
  rearIndex,
  capacity,
}) => {
  const isCircular = capacity !== undefined && frontIndex !== undefined && rearIndex !== undefined;
  const totalSlots = isCircular ? (capacity ?? 5) : elements.length;

  // Determine if index is active in circular queue
  const isSlotActive = (idx: number): boolean => {
    if (!isCircular) return true; // all items in dynamic array are active
    if (frontIndex === -1 || rearIndex === -1) return false; // empty queue
    
    // Circular logic
    if (frontIndex! <= rearIndex!) {
      return idx >= frontIndex! && idx <= rearIndex!;
    } else {
      return idx >= frontIndex! || idx <= rearIndex!; // wraps around
    }
  };

  // Determine standard pointers for dynamic queue if not circular
  const displayFront = isCircular ? frontIndex : (elements.length > 0 ? 0 : -1);
  const displayRear = isCircular ? rearIndex : (elements.length > 0 ? elements.length - 1 : -1);

  return (
    <group position={[0, yOffset, 0]}>
      {/* Label */}
      <Text
        position={[0, 1.8, 0]}
        fontSize={0.5}
        color="#14b8a6" // teal
        anchorX="center"
        anchorY="bottom"
        fontWeight="bold"
      >
        {name} ({isCircular ? 'Circular Queue' : 'Queue'})
      </Text>

      {/* Queue Elements */}
      {Array.from({ length: totalSlots }).map((_, idx) => {
        const isActive = isSlotActive(idx);
        const val = isCircular ? elements[idx] : elements[idx];
        const valStr = typeof val === 'object' ? JSON.stringify(val) : String(val);
        const uniqueKey = `${name}-${idx}-${valStr}`;

        return (
          <QueueCube
            key={uniqueKey}
            position={[(idx - (totalSlots - 1) / 2) * 2, 0, 0]}
            value={val}
            index={idx}
            isActive={isActive}
            isChanged={idx === displayRear} // Highlight rear (newly enqueued)
          />
        );
      })}

      {/* FRONT Pointer Badge (floating above) */}
      {displayFront !== undefined && displayFront !== -1 && (
        <group position={[(displayFront - (totalSlots - 1) / 2) * 2, 1.3, 0.4]}>
          <Text
            fontSize={0.35}
            color="#10b981" // emerald
            anchorX="center"
            anchorY="bottom"
            fontWeight="bold"
          >
            {"FRONT\n↓"}
          </Text>
        </group>
      )}

      {/* REAR Pointer Badge (floating below) */}
      {displayRear !== undefined && displayRear !== -1 && (
        <group position={[(displayRear - (totalSlots - 1) / 2) * 2, -1.3, 0.4]}>
          <Text
            fontSize={0.35}
            color="#f59e0b" // amber
            anchorX="center"
            anchorY="top"
            fontWeight="bold"
          >
            {"↑\nREAR"}
          </Text>
        </group>
      )}

      {/* Empty Queue state */}
      {totalSlots === 0 && (
        <Text
          position={[0, 0, 0.5]}
          fontSize={0.4}
          color="#6b7280"
          anchorX="center"
          anchorY="middle"
          fontStyle="italic"
        >
          Empty Queue
        </Text>
      )}
    </group>
  );
};

export default ThreeDQueue;
