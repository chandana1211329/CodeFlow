import React, { Suspense, useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars, Environment, ContactShadows, Text as DreiText, Center, Grid, RoundedBox } from '@react-three/drei';
import ThreeDArray from './ThreeDArray';
import ThreeDNodeStructure from './ThreeDNodeStructure';
import ThreeDStack from './ThreeDStack';
import ThreeDQueue from './ThreeDQueue';
import { ExecutionStep } from '../../types';
import * as THREE from 'three';

interface ExecutionSceneProps {
  currentStep: ExecutionStep | null;
}

interface ClassifiedVariable {
  type: 'stack' | 'queue' | 'array' | 'nodeStructure' | 'simple';
  name: string;
  elements?: any[];
  topIndex?: number;
  frontIndex?: number;
  rearIndex?: number;
  capacity?: number;
  root?: any;
  simpleValue?: any;
}

const CameraUpdater: React.FC<{ height: number }> = ({ height }) => {
  const { camera, controls } = useThree();

  useEffect(() => {
    if (!camera || height <= 0) return;

    const fov = (camera as THREE.PerspectiveCamera).fov || 45;
    const fovRad = (fov * Math.PI) / 180;
    
    // Distance needed to fit the height of the object
    const distanceToFit = (height / 2) / Math.tan(fovRad / 2);
    
    // Add a margin factor to ensure it's not tightly clipped
    const margin = 1.35;
    const zPos = Math.max(15, distanceToFit * margin);
    
    // Center is at Y = height / 2 (since bottom is aligned to Y = 0)
    const centerY = height / 2;
    const yPos = Math.max(8, centerY + (height * 0.15));
    
    camera.position.set(0, yPos, zPos);
    camera.lookAt(0, centerY, 0);
    
    if (controls) {
      const orbit = controls as any;
      orbit.target.set(0, centerY, 0);
      orbit.update();
    }
  }, [height, camera, controls]);

  return null;
};

const isNodeObject = (obj: any): boolean => {
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) return false;
  
  const typeName = (obj._type || '').toLowerCase();
  
  // 1. Check if type name indicates a node or tree element
  if (typeName.includes('node') || typeName.includes('tree') || typeName.includes('element') || typeName.includes('link')) {
    return true;
  }
  
  // 2. Check for common pointer field names
  const commonPointers = ['next', 'prev', 'previous', 'left', 'right', 'parent', 'child', 'link', 'succ', 'pred'];
  for (const ptr of commonPointers) {
    if (ptr in obj && obj[ptr] !== null && typeof obj[ptr] === 'object') {
      return true;
    }
  }
  
  // 3. Check for self-referential class type
  if (obj._type) {
    for (const [k, v] of Object.entries(obj)) {
      if (v && typeof v === 'object' && (v as any)._type === obj._type) {
        return true;
      }
    }
  }
  
  return false;
};

const extractRootNode = (obj: any): any | null => {
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) return null;
  
  if (isNodeObject(obj)) return obj;
  
  const wrapperFields = ['head', 'first', 'root', 'top', 'start', 'front'];
  for (const field of wrapperFields) {
    if (field in obj && obj[field] !== null && typeof obj[field] === 'object') {
      if (isNodeObject(obj[field])) {
        return obj[field];
      }
    }
  }
  
  return null;
};

interface ThreeDOperatorProps {
  operator: any;
}

const ThreeDOperator: React.FC<ThreeDOperatorProps> = ({ operator }) => {
  return (
    <group position={[0, 1.5, 0]}>
      <DreiText position={[0, 4, 0]} fontSize={0.6} color="#60a5fa" anchorX="center">
        OPERATOR EVALUATION
      </DreiText>

      <group position={[-3, 2, 0]}>
        <RoundedBox args={[2.2, 1.2, 0.6]} radius={0.15} smoothness={4}>
          <meshStandardMaterial color="#1e293b" metalness={0.2} roughness={0.1} />
        </RoundedBox>
        <DreiText position={[0, 0.9, 0]} fontSize={0.3} color="#94a3b8" anchorX="center">
          Operand 1
        </DreiText>
        <DreiText position={[0, 0, 0.32]} fontSize={0.4} color="#f8fafc" anchorX="center">
          {operator.operand1}
        </DreiText>
      </group>

      <mesh position={[-1.5, 2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 1.2, 8]} />
        <meshStandardMaterial color="#475569" emissive="#475569" emissiveIntensity={0.2} />
      </mesh>

      <group position={[0, 2, 0]}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial color="#3b82f6" emissive="#1d4ed8" emissiveIntensity={0.6} metalness={0.5} roughness={0.1} />
        </mesh>
        <DreiText position={[0, 0, 0.62]} fontSize={0.6} color="white" anchorX="center" anchorY="middle">
          {operator.op}
        </DreiText>
      </group>

      <mesh position={[1.5, 2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 1.2, 8]} />
        <meshStandardMaterial color="#475569" emissive="#475569" emissiveIntensity={0.2} />
      </mesh>

      <group position={[3, 2, 0]}>
        <RoundedBox args={[2.2, 1.2, 0.6]} radius={0.15} smoothness={4}>
          <meshStandardMaterial color="#1e293b" metalness={0.2} roughness={0.1} />
        </RoundedBox>
        <DreiText position={[0, 0.9, 0]} fontSize={0.3} color="#94a3b8" anchorX="center">
          Operand 2
        </DreiText>
        <DreiText position={[0, 0, 0.32]} fontSize={0.4} color="#f8fafc" anchorX="center">
          {operator.operand2}
        </DreiText>
      </group>

      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.0, 8]} />
        <meshStandardMaterial color="#475569" emissive="#475569" emissiveIntensity={0.2} />
      </mesh>

      <group position={[0, 0.1, 0]}>
        <RoundedBox args={[4.2, 1.0, 0.6]} radius={0.12} smoothness={4}>
          <meshStandardMaterial color="#0f172a" metalness={0.5} roughness={0.2} />
        </RoundedBox>
        <DreiText position={[0, 0.7, 0]} fontSize={0.25} color="#64748b" anchorX="center">
          Evaluation Expression
        </DreiText>
        <DreiText position={[0, 0, 0.32]} fontSize={0.35} color="#fbbf24" anchorX="center">
          {operator.substituted}
        </DreiText>
      </group>

      <mesh position={[0, -0.9, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.0, 8]} />
        <meshStandardMaterial color="#475569" emissive="#475569" emissiveIntensity={0.2} />
      </mesh>

      <group position={[0, -1.9, 0]}>
        <RoundedBox args={[3.2, 1.0, 0.6]} radius={0.15} smoothness={4}>
          <meshStandardMaterial color="#064e3b" emissive="#047857" emissiveIntensity={0.4} roughness={0.1} />
        </RoundedBox>
        <DreiText position={[0, 0.7, 0]} fontSize={0.25} color="#a7f3d0" anchorX="center">
          Result Value
        </DreiText>
        <DreiText position={[0, 0, 0.32]} fontSize={0.45} color="#34d399" anchorX="center">
          {operator.result}
        </DreiText>
      </group>

      <mesh position={[0, -2.9, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.0, 8]} />
        <meshStandardMaterial color="#475569" emissive="#475569" emissiveIntensity={0.2} />
      </mesh>

      <group position={[0, -3.9, 0]}>
        <RoundedBox args={[3.5, 1.0, 0.6]} radius={0.15} smoothness={4}>
          <meshStandardMaterial color="#1e3a8a" emissive="#1d4ed8" emissiveIntensity={0.3} roughness={0.1} />
        </RoundedBox>
        <DreiText position={[0, 0.7, 0]} fontSize={0.25} color="#93c5fd" anchorX="center">
          Store in Variable
        </DreiText>
        <DreiText position={[0, 0, 0.32]} fontSize={0.4} color="#60a5fa" anchorX="center">
          {operator.targetVar} = {operator.result}
        </DreiText>
      </group>
    </group>
  );
};

interface ThreeDConditionalProps {
  conditional: any;
}

const ThreeDConditional: React.FC<ThreeDConditionalProps> = ({ conditional }) => {
  const isIfActive = conditional.branchState === 'IF_ACTIVE';
  const isElseActive = conditional.branchState === 'ELSE_ACTIVE' || conditional.branchState === 'ELIF_ACTIVE';

  return (
    <group position={[0, 1.5, 0]}>
      <DreiText position={[0, 4.2, 0]} fontSize={0.6} color="#c084fc" anchorX="center">
        CONDITIONAL DECISION
      </DreiText>

      <group position={[0, 2.2, 0]}>
        <group rotation={[0, 0, Math.PI / 4]}>
          <RoundedBox args={[2.0, 2.0, 0.6]} radius={0.1} smoothness={4}>
            <meshStandardMaterial color="#4c1d95" emissive="#6d28d9" emissiveIntensity={0.3} metalness={0.4} roughness={0.1} />
          </RoundedBox>
        </group>
        <DreiText position={[0, 0.6, 0.32]} fontSize={0.22} color="#c084fc" anchorX="center">
          Condition check
        </DreiText>
        <DreiText position={[0, -0.1, 0.32]} fontSize={0.3} color="#f5f3ff" anchorX="center">
          {conditional.condition}
        </DreiText>
      </group>

      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.8, 8]} />
        <meshStandardMaterial color="#475569" />
      </mesh>

      <group position={[0, 0.2, 0]}>
        <RoundedBox args={[3.8, 0.8, 0.6]} radius={0.1} smoothness={4}>
          <meshStandardMaterial color="#1e1b4b" metalness={0.1} roughness={0.2} />
        </RoundedBox>
        <DreiText position={[0, 0, 0.32]} fontSize={0.3} color="#fbbf24" anchorX="center">
          {conditional.substituted}
        </DreiText>
      </group>

      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.0, 8]} />
        <meshStandardMaterial color="#475569" />
      </mesh>

      <group position={[0, -1.7, 0]}>
        <RoundedBox args={[2.4, 0.9, 0.6]} radius={0.12} smoothness={4}>
          <meshStandardMaterial 
            color={conditional.result ? "#064e3b" : "#7f1d1d"} 
            emissive={conditional.result ? "#047857" : "#b91c1c"}
            emissiveIntensity={0.6}
            roughness={0.1}
          />
        </RoundedBox>
        <DreiText position={[0, 0.5, 0]} fontSize={0.2} color="#f8fafc" anchorX="center">
          Evaluates to
        </DreiText>
        <DreiText position={[0, -0.1, 0.32]} fontSize={0.4} color="white" anchorX="center">
          {conditional.result ? 'TRUE' : 'FALSE'}
        </DreiText>
      </group>

      <mesh position={[-1.8, -2.5, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.04, 0.04, 2.2, 8]} />
        <meshStandardMaterial color={isIfActive ? "#10b981" : "#334155"} emissive={isIfActive ? "#10b981" : "#000000"} emissiveIntensity={isIfActive ? 0.5 : 0} />
      </mesh>

      <mesh position={[1.8, -2.5, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.04, 0.04, 2.2, 8]} />
        <meshStandardMaterial color={isElseActive ? "#10b981" : "#334155"} emissive={isElseActive ? "#10b981" : "#000000"} emissiveIntensity={isElseActive ? 0.5 : 0} />
      </mesh>

      <group position={[-3.5, -3.5, 0]}>
        <RoundedBox args={[2.5, 1.2, 0.6]} radius={0.15} smoothness={4}>
          <meshStandardMaterial 
            color={isIfActive ? "#064e3b" : "#1e293b"} 
            emissive={isIfActive ? "#059669" : "#000000"} 
            emissiveIntensity={isIfActive ? 0.4 : 0}
            opacity={isIfActive ? 1.0 : 0.3}
            transparent={!isIfActive}
          />
        </RoundedBox>
        <DreiText position={[0, 0.9, 0]} fontSize={0.25} color={isIfActive ? "#a7f3d0" : "#64748b"} anchorX="center">
          IF BLOCK
        </DreiText>
        <DreiText position={[0, 0, 0.32]} fontSize={0.35} color={isIfActive ? "#34d399" : "#94a3b8"} anchorX="center">
          {isIfActive ? "ACTIVE" : "SKIPPED"}
        </DreiText>
      </group>

      <group position={[3.5, -3.5, 0]}>
        <RoundedBox args={[2.5, 1.2, 0.6]} radius={0.15} smoothness={4}>
          <meshStandardMaterial 
            color={isElseActive ? "#064e3b" : "#1e293b"} 
            emissive={isElseActive ? "#059669" : "#000000"} 
            emissiveIntensity={isElseActive ? 0.4 : 0}
            opacity={isElseActive ? 1.0 : 0.3}
            transparent={!isElseActive}
          />
        </RoundedBox>
        <DreiText position={[0, 0.9, 0]} fontSize={0.25} color={isElseActive ? "#a7f3d0" : "#64748b"} anchorX="center">
          ELSE BLOCK
        </DreiText>
        <DreiText position={[0, 0, 0.32]} fontSize={0.35} color={isElseActive ? "#34d399" : "#94a3b8"} anchorX="center">
          {isElseActive ? "ACTIVE" : "SKIPPED"}
        </DreiText>
      </group>
    </group>
  );
};

interface ThreeDLoopProps {
  loop: any;
}

const ThreeDLoop: React.FC<ThreeDLoopProps> = ({ loop }) => {
  return (
    <group position={[0, 1.5, 0]}>
      <DreiText position={[0, 4.2, 0]} fontSize={0.6} color="#4ade80" anchorX="center">
        LOOP ITERATION Tracker
      </DreiText>

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.5, 0]}>
        <torusGeometry args={[3.4, 0.12, 16, 100]} />
        <meshStandardMaterial color="#22c55e" emissive="#15803d" emissiveIntensity={0.3} metalness={0.5} roughness={0.1} />
      </mesh>

      <group position={[0, 0.5, 0]}>
        <RoundedBox args={[3.2, 1.2, 0.6]} radius={0.15} smoothness={4}>
          <meshStandardMaterial color="#052e16" emissive="#14532d" emissiveIntensity={0.2} roughness={0.1} />
        </RoundedBox>
        <DreiText position={[0, 0.9, 0]} fontSize={0.25} color="#86efac" anchorX="center">
          CURRENT STATE
        </DreiText>
        <DreiText position={[0, 0, 0.32]} fontSize={0.4} color="white" anchorX="center">
          {loop.totalIterations > 0 
            ? `Iteration ${loop.iteration} of ${loop.totalIterations}`
            : `Iteration ${loop.iteration}`
          }
        </DreiText>
      </group>

      <group position={[0, 2.5, 0]}>
        <RoundedBox args={[3.0, 0.9, 0.5]} radius={0.1} smoothness={4}>
          <meshStandardMaterial color="#1e2937" metalness={0.2} roughness={0.1} />
        </RoundedBox>
        <DreiText position={[0, 0, 0.27]} fontSize={0.35} color="#60a5fa" anchorX="center">
          {loop.loopVar || 'none'} = {loop.loopValue || 'undefined'}
        </DreiText>
        <DreiText position={[0, 0.7, 0]} fontSize={0.2} color="#9ca3af" anchorX="center">
          Loop Variable
        </DreiText>
      </group>

      <group position={[0, -1.5, 0]}>
        <RoundedBox args={[3.8, 0.8, 0.5]} radius={0.1} smoothness={4}>
          <meshStandardMaterial color="#1f1d1a" metalness={0.1} roughness={0.2} />
        </RoundedBox>
        <DreiText position={[0, 0.6, 0]} fontSize={0.2} color="#d97706" anchorX="center">
          Condition: {loop.condition}
        </DreiText>
        <DreiText position={[0, -0.1, 0.27]} fontSize={0.3} color="#fbbf24" anchorX="center">
          {loop.condition === 'range/iterable' ? 'range / iterable' : loop.substituted}
        </DreiText>
      </group>

      <group position={[0, -2.8, 0]}>
        <RoundedBox args={[3.5, 0.9, 0.5]} radius={0.12} smoothness={4}>
          <meshStandardMaterial 
            color={loop.conditionResult ? "#064e3b" : "#7f1d1d"} 
            emissive={loop.conditionResult ? "#047857" : "#b91c1c"}
            emissiveIntensity={0.5}
            roughness={0.1}
          />
        </RoundedBox>
        <DreiText position={[0, 0, 0.27]} fontSize={0.3} color="white" anchorX="center">
          {loop.conditionResult ? 'TRUE (Loop Repeats)' : 'FALSE (Loop Complete)'}
        </DreiText>
      </group>
    </group>
  );
};

const ExecutionScene: React.FC<ExecutionSceneProps> = ({ currentStep }) => {
  const [contentHeight, setContentHeight] = useState<number>(0);

  if (!currentStep) return null;

  const normalizeObject = (obj: any): any => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(normalizeObject);
    const normalized: any = {};
    for (const [k, v] of Object.entries(obj)) {
      const cleanKey = k.includes('.') ? k.substring(k.lastIndexOf('.') + 1) : k;
      normalized[cleanKey] = normalizeObject(v);
    }
    return normalized;
  };

  const classifiedVars: ClassifiedVariable[] = [];
  const normalizedVariables = normalizeObject(currentStep.variables);

  for (const [name, value] of Object.entries(normalizedVariables)) {
    if (value === null || value === undefined || typeof value === 'function') continue;

    const lowerName = name.toLowerCase();

    // 1. Identify Node Structures (Doubly/Singly Linked List, Trees, or wrapper classes like LinkedList/BinaryTree)
    if (typeof value === 'object' && !Array.isArray(value)) {
      const rootNode = extractRootNode(value);
      if (rootNode) {
        classifiedVars.push({
          type: 'nodeStructure',
          name,
          root: rootNode
        });
        continue;
      }
    }

    // 2. Identify Stacks, Queues, and Arrays
    let elements: any[] | null = null;
    let detectedType: 'stack' | 'queue' | 'array' | null = null;
    let topIndex: number | undefined;
    let frontIndex: number | undefined;
    let rearIndex: number | undefined;
    let capacity: number | undefined;

    if (Array.isArray(value)) {
      elements = value;
      if (lowerName.includes('stack') || lowerName === 's' || lowerName.startsWith('st_')) {
        detectedType = 'stack';
      } else if (lowerName.includes('queue') || lowerName.includes('deque') || lowerName === 'q') {
        detectedType = 'queue';
      } else {
        detectedType = 'array';
      }
    } else if (typeof value === 'object') {
      const valObj = value as any;
      const typeName = (valObj._type || '').toLowerCase();

      // Look for data array field inside the object
      let foundArray: any[] | null = null;
      const commonArrayKeys = ['items', 'elements', 'array', 'arr', 'stackArray', 'queueArray', 'data', 'elementData', 'queue', 'stack', 'storage'];
      
      for (const key of commonArrayKeys) {
        if (key in valObj && Array.isArray(valObj[key])) {
          foundArray = valObj[key];
          break;
        }
      }

      if (!foundArray) {
        for (const [k, v] of Object.entries(valObj)) {
          if (Array.isArray(v)) {
            foundArray = v;
            break;
          }
        }
      }

      if (foundArray) {
        capacity = foundArray.length;
        const isStack = lowerName.includes('stack') || typeName.includes('stack') || 'top' in valObj || 'topindex' in valObj;
        const isQueue = lowerName.includes('queue') || typeName.includes('queue') || typeName.includes('deque') || 'front' in valObj || 'rear' in valObj || 'head' in valObj || 'tail' in valObj;

        if (isStack) {
          detectedType = 'stack';
          const top = valObj.top !== undefined ? Number(valObj.top) : (valObj.topIndex !== undefined ? Number(valObj.topIndex) : undefined);
          if (top !== undefined) {
            topIndex = top;
            elements = foundArray.slice(0, top + 1);
          } else {
            const size = valObj.size !== undefined ? Number(valObj.size) : (valObj.count !== undefined ? Number(valObj.count) : (valObj.elementCount !== undefined ? Number(valObj.elementCount) : undefined));
            if (size !== undefined) {
              elements = foundArray.slice(0, size);
            } else {
              elements = foundArray;
            }
          }
        } else if (isQueue) {
          detectedType = 'queue';
          const front = valObj.front !== undefined ? Number(valObj.front) : (valObj.head !== undefined ? Number(valObj.head) : undefined);
          const rear = valObj.rear !== undefined ? Number(valObj.rear) : (valObj.tail !== undefined ? Number(valObj.tail) : undefined);
          const size = valObj.size !== undefined ? Number(valObj.size) : (valObj.count !== undefined ? Number(valObj.count) : (valObj.elementCount !== undefined ? Number(valObj.elementCount) : undefined));

          if (front !== undefined && rear !== undefined) {
            frontIndex = front;
            rearIndex = rear;
            elements = foundArray;
          } else if (size !== undefined) {
            elements = foundArray.slice(0, size);
            frontIndex = 0;
            rearIndex = size > 0 ? size - 1 : 0;
          } else {
            elements = foundArray;
            frontIndex = 0;
            rearIndex = foundArray.length > 0 ? foundArray.length - 1 : 0;
          }
        } else {
          detectedType = 'array';
          const size = valObj.size !== undefined ? Number(valObj.size) : (valObj.count !== undefined ? Number(valObj.count) : (valObj.elementCount !== undefined ? Number(valObj.elementCount) : undefined));
          if (size !== undefined) {
            elements = foundArray.slice(0, size);
          } else {
            elements = foundArray;
          }
        }
      }
    }

    if (detectedType && elements) {
      classifiedVars.push({
        type: detectedType,
        name,
        elements,
        topIndex,
        frontIndex,
        rearIndex,
        capacity
      });
    } else {
      // Otherwise treat as a simple variable
      classifiedVars.push({
        type: 'simple',
        name,
        simpleValue: value
      });
    }
  }

  // Separate structures
  const stacks = classifiedVars.filter(v => v.type === 'stack');
  const queues = classifiedVars.filter(v => v.type === 'queue');
  const arrays = classifiedVars.filter(v => v.type === 'array');
  const nodeStructures = classifiedVars.filter(v => v.type === 'nodeStructure');
  const simpleVars = classifiedVars.filter(v => v.type === 'simple');

  const hasComplexStructures = (stacks.length + queues.length + arrays.length + nodeStructures.length) > 0;
  
  // Track indices for vertical layout stacking
  let layoutIdx = 0;

  return (
    <div className="w-full h-full bg-[#0a0a0f] rounded-lg overflow-hidden border border-gray-700 shadow-2xl relative">
      <Canvas shadows dpr={[1, 2]}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 8, 15]} fov={45} />
          <CameraUpdater height={contentHeight} />
          
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
          <spotLight position={[-10, 15, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />
          <directionalLight position={[0, 10, 0]} intensity={0.5} />
          
          {/* Background & Effects */}
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <Environment preset="night" />
          
          <Center
            top
            onCentered={({ height }) => {
              setContentHeight(height);
            }}
          >
            <group>
              {currentStep.metadata?.mode === 'operator' && currentStep.metadata.operator && (
                <ThreeDOperator operator={currentStep.metadata.operator} />
              )}
              {currentStep.metadata?.mode === 'conditional' && currentStep.metadata.conditional && (
                <ThreeDConditional conditional={currentStep.metadata.conditional} />
              )}
              {currentStep.metadata?.mode === 'loop' && currentStep.metadata.loop && (
                <ThreeDLoop loop={currentStep.metadata.loop} />
              )}

              {(!currentStep.metadata || currentStep.metadata.mode === 'memory' || currentStep.metadata.mode === 'data_structure') && (
                <>
                  {/* Render Stacks */}
                  {stacks.map((st) => {
                    const yOffset = layoutIdx * 6;
                    layoutIdx++;
                    return (
                      <ThreeDStack
                        key={st.name}
                        name={st.name}
                        elements={st.elements!}
                        capacity={st.capacity}
                        yOffset={yOffset}
                      />
                    );
                  })}

                  {/* Render Queues */}
                  {queues.map((q) => {
                    const yOffset = layoutIdx * 6;
                    layoutIdx++;
                    return (
                      <ThreeDQueue
                        key={q.name}
                        name={q.name}
                        elements={q.elements!}
                        capacity={q.capacity}
                        frontIndex={q.frontIndex}
                        rearIndex={q.rearIndex}
                        yOffset={yOffset}
                      />
                    );
                  })}

                  {/* Render Arrays */}
                  {arrays.map((arr) => {
                    const yOffset = layoutIdx * 6;
                    layoutIdx++;
                    return (
                      <ThreeDArray
                        key={arr.name}
                        name={arr.name}
                        elements={arr.elements!}
                        yOffset={yOffset}
                      />
                    );
                  })}

                  {/* Render Node Structures (Trees/Linked Lists) */}
                  {nodeStructures.map((ns) => {
                    const yOffset = layoutIdx * 6;
                    layoutIdx++;
                    return (
                      <ThreeDNodeStructure
                        key={ns.name}
                        name={ns.name}
                        root={ns.root}
                        yOffset={yOffset}
                      />
                    );
                  })}

                  {/* Render Simple Variables */}
                  {simpleVars.length > 0 && (
                    <group position={[-(hasComplexStructures ? 8 : 0), 0, 0]}>
                      {simpleVars.map((sv, idx) => (
                        <group key={sv.name} position={[0, idx * 2.5, 0]}>
                          <RoundedBox args={[2, 1, 0.5]} radius={0.1} smoothness={4}>
                            <meshStandardMaterial color="#1f2937" />
                          </RoundedBox>
                          <DreiText
                            position={[0, 0.8, 0]}
                            fontSize={0.4}
                            color="#60a5fa"
                            anchorX="center"
                          >
                            {sv.name}
                          </DreiText>
                          <DreiText
                            position={[0, 0, 0.26]}
                            fontSize={0.5}
                            color="white"
                            anchorX="center"
                          >
                            {String(sv.simpleValue)}
                          </DreiText>
                        </group>
                      ))}
                    </group>
                  )}
                </>
              )}
            </group>
          </Center>

          {/* Ground Grid */}
          <Grid
            renderOrder={-1}
            position={[0, -2, 0]}
            infiniteGrid
            cellSize={1}
            cellThickness={0.5}
            sectionSize={3}
            sectionThickness={1}
            sectionColor="#3b82f6"
            fadeDistance={30}
          />

          <ContactShadows position={[0, -1.9, 0]} opacity={0.6} scale={20} blur={2} far={4.5} />
          
          <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            makeDefault 
            minDistance={5}
            maxDistance={40}
            autoRotate={false}
          />
        </Suspense>
      </Canvas>
      
      {/* HUD Info */}
      <div className="absolute bottom-4 right-4 text-xs text-gray-500 font-mono bg-gray-900/80 px-2 py-1 rounded">
        {stacks.length} stacks, {queues.length} queues, {arrays.length} arrays, {nodeStructures.length} node structures, {simpleVars.length} variables
      </div>
    </div>
  );
};

export default ExecutionScene;
