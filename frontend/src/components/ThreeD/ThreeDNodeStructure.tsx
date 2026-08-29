import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sphere, Line, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { ExecutionStep } from '../../types';

interface NodeData {
  val?: any;
  value?: any;
  next?: NodeData;
  prev?: NodeData;
  left?: NodeData;
  right?: NodeData;
  _type?: string;
  _id?: string;
  [key: string]: any;
}

interface PositionedNode {
  id: string;
  rawId: string;
  val: any;
  position: [number, number, number];
  address: string;
  nextAddress: string;
  prevAddress: string | null;
  isLinkedList: boolean;
  isDoubly: boolean;
  children: { childId: string; type: string }[];
}

interface ThreeDNodeStructureProps {
  name: string;
  root: NodeData;
  yOffset: number;
  currentStep?: ExecutionStep | null;
}

// Deterministic address generator
const formatAddress = (nodeId: string | number): string => {
  if (typeof nodeId === 'string' && nodeId.includes('#')) {
    return nodeId;
  }
  if (typeof nodeId === 'number') {
    return '0x' + nodeId.toString(16).toUpperCase().slice(-4);
  }
  let num = 0;
  const str = String(nodeId);
  for (let i = 0; i < str.length; i++) {
    num = (num << 5) - num + str.charCodeAt(i);
    num |= 0;
  }
  return '0x' + Math.abs(num).toString(16).toUpperCase().slice(-4).padStart(4, '0');
};

const getNextNode = (node: any): any | null => {
  if (!node || typeof node !== 'object') return null;
  const nextKeys = ['next', 'link', 'succ'];
  for (const key of nextKeys) {
    if (key in node && node[key] !== null && typeof node[key] === 'object') {
      return node[key];
    }
  }
  if (node._type) {
    for (const [k, v] of Object.entries(node)) {
      if (k !== 'prev' && k !== 'previous' && k !== 'left' && k !== 'right' && v && typeof v === 'object' && (v as any)._type === node._type) {
        return v;
      }
    }
  }
  return null;
};

const getPrevNode = (node: any): any | null => {
  if (!node || typeof node !== 'object') return null;
  const prevKeys = ['prev', 'previous', 'pred'];
  for (const key of prevKeys) {
    if (key in node && node[key] !== null && typeof node[key] === 'object') {
      return node[key];
    }
  }
  return null;
};

const getLeftNode = (node: any): any | null => {
  if (!node || typeof node !== 'object') return null;
  const leftKeys = ['left', 'leftChild', 'left_child'];
  for (const key of leftKeys) {
    if (key in node && node[key] !== null && typeof node[key] === 'object') {
      return node[key];
    }
  }
  return null;
};

const getRightNode = (node: any): any | null => {
  if (!node || typeof node !== 'object') return null;
  const rightKeys = ['right', 'rightChild', 'right_child'];
  for (const key of rightKeys) {
    if (key in node && node[key] !== null && typeof node[key] === 'object') {
      return node[key];
    }
  }
  return null;
};

// Helper to extract actual elements from a list/array/collection wrapper object
const extractElementsFromList = (listObj: any): any[] => {
  if (!listObj || typeof listObj !== 'object') return [];
  if (Array.isArray(listObj)) {
    return listObj;
  }
  const listKeys = ['elementData', 'items', 'arr', 'array', 'data'];
  for (const key of listKeys) {
    if (key in listObj && Array.isArray(listObj[key])) {
      return listObj[key].filter((item: any) => item !== null && item !== undefined);
    }
  }
  for (const [k, v] of Object.entries(listObj)) {
    if (Array.isArray(v)) {
      return v.filter((item: any) => item !== null && item !== undefined);
    }
  }
  return [];
};

// Generic helper to get all children of a node
const getChildrenNodes = (node: any): any[] => {
  if (!node || typeof node !== 'object') return [];
  
  const childrenKeys = ['children', 'childList', 'child_list', 'childs'];
  for (const key of childrenKeys) {
    if (key in node && node[key] !== null) {
      const val = node[key];
      const elements = extractElementsFromList(val);
      if (elements.length > 0) {
        return elements.filter(v => typeof v === 'object');
      }
      if (typeof val === 'object' && val._type && val._type === node._type) {
        return [val];
      }
    }
  }
  
  if (node._type) {
    for (const [k, v] of Object.entries(node)) {
      const elements = extractElementsFromList(v);
      if (elements.length > 0) {
        const objectElements = elements.filter(item => typeof item === 'object');
        if (objectElements.length > 0 && objectElements.every(item => item._type === node._type)) {
          return objectElements;
        }
      }
    }
  }
  
  const left = getLeftNode(node);
  const right = getRightNode(node);
  const fallback: any[] = [];
  if (left) fallback.push(left);
  if (right) fallback.push(right);
  return fallback;
};

// 1. Linked List Node component with pointer badges and search match highlight
const LinkedListNodeMesh: React.FC<{
  position: [number, number, number];
  value: any;
  address: string;
  nextAddress: string;
  prevAddress: string | null;
  label?: string;
  nodeId?: string;
  pointers?: string[];
  isMatched?: boolean;
  isNewNode?: boolean;
}> = ({
  position,
  value,
  address,
  nextAddress,
  prevAddress,
  label,
  nodeId,
  pointers = [],
  isMatched,
  isNewNode
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const isDoubly = prevAddress !== null;

  useFrame((state) => {
    if (groupRef.current) {
      const hoverHeight = isMatched || pointers.length > 0 ? 0.14 : 0.08;
      const speed = isMatched ? 4 : 2;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * speed + position[0]) * hoverHeight;
    }
  });

  const displayValue = value === null || value === undefined ? 'null' : typeof value === 'string' ? `"${value}"` : String(value);
  const width = isDoubly ? 2.8 : 2.2;
  const nodeBgColor = isMatched ? '#065f46' : (isNewNode ? '#1e3a8a' : (pointers.length > 0 ? '#312e81' : '#1e1b4b'));
  const emissiveColor = isMatched ? '#10b981' : (isNewNode ? '#3b82f6' : (pointers.length > 0 ? '#6366f1' : '#000000'));

  return (
    <group position={position}>
      {/* Pointer Badges Stack above Node */}
      {pointers.length > 0 && (
        <group position={[0, 2.2, 0]}>
          <RoundedBox args={[Math.max(1.6, pointers.join(', ').length * 0.22), 0.5, 0.25]} radius={0.1}>
            <meshStandardMaterial color="#3b82f6" emissive="#1d4ed8" emissiveIntensity={0.8} />
          </RoundedBox>
          <Text position={[0, 0, 0.15]} fontSize={0.25} color="white" anchorX="center" anchorY="middle" fontWeight="bold">
            {`↑ ${pointers.join(', ')}`}
          </Text>
        </group>
      )}

      {/* Match Badge */}
      {isMatched && (
        <group position={[0, 2.8, 0]}>
          <RoundedBox args={[1.6, 0.45, 0.2]} radius={0.1}>
            <meshStandardMaterial color="#10b981" emissive="#059669" emissiveIntensity={0.9} />
          </RoundedBox>
          <Text position={[0, 0, 0.12]} fontSize={0.25} color="white" anchorX="center" anchorY="middle" fontWeight="bold">
            MATCH!
          </Text>
        </group>
      )}

      <group ref={groupRef}>
        {/* Main Node Box */}
        <RoundedBox args={[width, 1.2, 0.6]} radius={0.1} smoothness={4}>
          <meshStandardMaterial 
            color={nodeBgColor} 
            emissive={emissiveColor}
            emissiveIntensity={isMatched ? 0.8 : (isNewNode ? 0.6 : (pointers.length > 0 ? 0.4 : 0))}
            roughness={0.3} 
            metalness={0.6} 
          />
        </RoundedBox>

        {/* Node ID Label (e.g. Node#1) */}
        {nodeId && (
          <Text position={[isDoubly ? -0.1 : -0.4, -0.9, 0]} fontSize={0.24} color="#a5b4fc" anchorX="center" anchorY="top" fontWeight="bold">
            {nodeId}
          </Text>
        )}

        {/* --- PREV Compartment --- */}
        {isDoubly && (
          <>
            <mesh position={[-1.0, 0, 0.01]}>
              <planeGeometry args={[0.76, 1.18]} />
              <meshBasicMaterial color="#0f172a" transparent opacity={0.5} />
            </mesh>
            <RoundedBox args={[0.04, 1.2, 0.62]} position={[-0.6, 0, 0]} radius={0.01}>
              <meshBasicMaterial color="#374151" />
            </RoundedBox>
            <Text
              position={[-1.0, 0, 0.31]}
              fontSize={0.22}
              color={prevAddress === 'NULL' ? '#ef4444' : '#a78bfa'}
              anchorX="center"
              anchorY="middle"
              fontWeight="bold"
            >
              {prevAddress}
            </Text>
            <Text
              position={[-1.0, 0.9, 0]}
              fontSize={0.2}
              color="#94a3b8"
              anchorX="center"
              anchorY="bottom"
            >
              prev
            </Text>
          </>
        )}

        {/* --- NEXT Compartment --- */}
        <mesh position={[isDoubly ? 1.0 : 0.7, 0, 0.01]}>
          <planeGeometry args={[0.76, 1.18]} />
          <meshBasicMaterial color="#0f172a" transparent opacity={0.5} />
        </mesh>
        <RoundedBox args={[0.04, 1.2, 0.62]} position={[isDoubly ? 0.6 : 0.3, 0, 0]} radius={0.01}>
          <meshBasicMaterial color="#374151" />
        </RoundedBox>
        <Text
          position={[isDoubly ? 1.0 : 0.7, 0, 0.31]}
          fontSize={0.22}
          color={nextAddress === 'NULL' ? '#ef4444' : '#10b981'}
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          {nextAddress}
        </Text>
        <Text
          position={[isDoubly ? 1.0 : 0.7, 0.9, 0]}
          fontSize={0.2}
          color="#94a3b8"
          anchorX="center"
          anchorY="bottom"
        >
          next
        </Text>

        {/* --- DATA (Value) Compartment --- */}
        <Text
          position={[isDoubly ? -0.1 : -0.4, 0, 0.31]}
          fontSize={0.35}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.1}
          fontWeight="bold"
        >
          {displayValue}
        </Text>

        {/* Memory Address Tag (Cyan) */}
        <Text
          position={[isDoubly ? -0.1 : -0.4, 0.9, 0]}
          fontSize={0.25}
          color="#67e8f9"
          anchorX="center"
          anchorY="bottom"
          fontWeight="bold"
        >
          {address}
        </Text>
      </group>

      {/* Main Variable Label */}
      {label && (
        <Text position={[isDoubly ? -0.1 : -0.4, 1.6, 0]} fontSize={0.4} color="#60a5fa" anchorX="center" anchorY="bottom" fontWeight="bold">
          {label}
        </Text>
      )}
    </group>
  );
};

// 2. Enhanced Tree Node component
const TreeNodeMesh: React.FC<{
  position: [number, number, number];
  value: any;
  address: string;
  label?: string;
  nodeId?: string;
  pointers?: string[];
  isCurrent?: boolean;
  isComparing?: boolean;
  isVisited?: boolean;
  isMatched?: boolean;
  isNewNode?: boolean;
  comparisonBadge?: string;
}> = ({
  position,
  value,
  address,
  label,
  pointers = [],
  isCurrent,
  isComparing,
  isVisited,
  isMatched,
  isNewNode,
  comparisonBadge
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const hoverSpeed = isMatched || isComparing ? 4 : 2;
      const hoverHeight = isMatched ? 0.15 : isComparing ? 0.12 : 0.08;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * hoverSpeed + position[0]) * hoverHeight;
    }
  });

  const displayValue = value === null || value === undefined ? 'null' : typeof value === 'string' ? `"${value}"` : String(value);

  // Color selection based on node execution state
  let nodeColor = '#3b82f6';
  let emissiveColor = '#1d4ed8';
  let emissiveIntensity = 0.4;

  if (isMatched) {
    nodeColor = '#10b981';
    emissiveColor = '#059669';
    emissiveIntensity = 0.9;
  } else if (isComparing) {
    nodeColor = '#f59e0b';
    emissiveColor = '#d97706';
    emissiveIntensity = 0.8;
  } else if (isCurrent) {
    nodeColor = '#06b6d4';
    emissiveColor = '#0891b2';
    emissiveIntensity = 0.8;
  } else if (isNewNode) {
    nodeColor = '#8b5cf6';
    emissiveColor = '#7c3aed';
    emissiveIntensity = 0.8;
  } else if (isVisited) {
    nodeColor = '#6366f1';
    emissiveColor = '#4f46e5';
    emissiveIntensity = 0.5;
  }

  return (
    <group position={position}>
      {/* Pointer Badges Stack */}
      {pointers.length > 0 && (
        <group position={[0, 1.8, 0]}>
          <RoundedBox args={[Math.max(1.4, pointers.join(', ').length * 0.22), 0.45, 0.2]} radius={0.1}>
            <meshStandardMaterial color="#3b82f6" emissive="#1d4ed8" emissiveIntensity={0.8} />
          </RoundedBox>
          <Text position={[0, 0, 0.12]} fontSize={0.24} color="white" anchorX="center" anchorY="middle" fontWeight="bold">
            {`↑ ${pointers.join(', ')}`}
          </Text>
        </group>
      )}

      {/* Comparison Floating Badge */}
      {comparisonBadge && (
        <group position={[0, 2.4, 0]}>
          <RoundedBox args={[Math.max(1.8, comparisonBadge.length * 0.2), 0.45, 0.2]} radius={0.1}>
            <meshStandardMaterial color="#f59e0b" emissive="#b45309" emissiveIntensity={0.9} />
          </RoundedBox>
          <Text position={[0, 0, 0.12]} fontSize={0.22} color="white" anchorX="center" anchorY="middle" fontWeight="bold">
            {comparisonBadge}
          </Text>
        </group>
      )}

      {/* Match / Found Badge */}
      {isMatched && (
        <group position={[0, 2.4, 0]}>
          <RoundedBox args={[1.6, 0.45, 0.2]} radius={0.1}>
            <meshStandardMaterial color="#10b981" emissive="#059669" emissiveIntensity={0.9} />
          </RoundedBox>
          <Text position={[0, 0, 0.12]} fontSize={0.25} color="white" anchorX="center" anchorY="middle" fontWeight="bold">
            FOUND!
          </Text>
        </group>
      )}

      <group ref={groupRef}>
        <Sphere args={[0.85, 32, 32]}>
          <meshStandardMaterial color={nodeColor} emissive={emissiveColor} emissiveIntensity={emissiveIntensity} roughness={0.2} metalness={0.7} />
        </Sphere>
        
        {/* Outer Glow Ring for Current / Comparing */}
        {(isCurrent || isComparing || isMatched) && (
          <Sphere args={[0.95, 24, 24]}>
            <meshBasicMaterial color={nodeColor} transparent opacity={0.35} wireframe />
          </Sphere>
        )}

        <Text position={[0, 0, 0.86]} fontSize={0.4} color="white" anchorX="center" anchorY="middle" maxWidth={1.2} fontWeight="bold">
          {displayValue}
        </Text>
        
        {/* Address Tag */}
        <Text position={[0, -1.05, 0]} fontSize={0.22} color="#67e8f9" anchorX="center" anchorY="top" fontWeight="bold">
          {address}
        </Text>
      </group>

      {/* Root / Variable Name Label */}
      {label && (
        <Text position={[0, 2.9, 0]} fontSize={0.4} color="#60a5fa" anchorX="center" anchorY="bottom" fontWeight="bold">
          {label}
        </Text>
      )}
    </group>
  );
};

export const ThreeDNodeStructure: React.FC<ThreeDNodeStructureProps> = ({ name, root, yOffset, currentStep }) => {
  // Compute pointer references targeting each node object
  const pointerMap = useMemo(() => {
    const map = new Map<string, string[]>();
    if (!currentStep) return map;

    const allVars = { ...(currentStep.variables || {}), ...(currentStep.scopeVars || {}) };
    
    for (const [varName, val] of Object.entries(allVars)) {
      if (val && typeof val === 'object' && !Array.isArray(val)) {
        const objectId = val._id || formatAddress(val._id || val);
        if (objectId && objectId !== '0x0000') {
          const list = map.get(objectId) || [];
          if (!list.includes(varName)) {
            list.push(varName);
            map.set(objectId, list);
          }
        }
      }
    }
    return map;
  }, [currentStep]);

  // Pre-traverse to assign memory addresses and lay out nodes
  const { nodes, links } = useMemo(() => {
    const positionedNodes: PositionedNode[] = [];
    const links: { 
      source: [number, number, number]; 
      target: [number, number, number]; 
      isLinkedList: boolean;
      isDoubly: boolean;
      type: 'next' | 'prev' | 'left' | 'right';
    }[] = [];
    const nodeAddresses = new Map<any, string>();
    
    const hasNext = getNextNode(root) !== null;
    const hasPrev = getPrevNode(root) !== null;
    const hasLeftRight = getLeftNode(root) !== null || getRightNode(root) !== null;
    const hasChildrenList = 'children' in root || 'childList' in root || 'childs' in root;
    const typeName = (root._type || '').toLowerCase();
    const isTreeType = typeName.includes('tree') || typeName.includes('bst') || typeName.includes('avl');
    
    const detectedLinkedList = hasNext && !hasLeftRight && !hasChildrenList && !isTreeType;
    const detectedDoubly = detectedLinkedList && hasPrev;

    // Assign addresses
    if (detectedLinkedList) {
      let temp: any = root;
      let idx = 0;
      while (temp && typeof temp === 'object') {
        const uniqueKey = temp._id || `node_${idx}`;
        nodeAddresses.set(temp, formatAddress(uniqueKey));
        if (idx > 50) break;
        temp = getNextNode(temp);
        idx++;
      }
    } else {
      let nodeIndex = 0;
      const assignTreeAddresses = (n: any) => {
        if (!n || typeof n !== 'object') return;
        const uniqueKey = n._id || `tree_node_${nodeIndex++}`;
        nodeAddresses.set(n, formatAddress(uniqueKey));
        const left = getLeftNode(n);
        const right = getRightNode(n);
        if (left) assignTreeAddresses(left);
        if (right) assignTreeAddresses(right);
        if (!left && !right) {
          const children = getChildrenNodes(n);
          children.forEach(assignTreeAddresses);
        }
      };
      assignTreeAddresses(root);
    }

    // Lay out nodes
    let nextId = 0;
    
    const traverse = (node: NodeData | string, depth: number, offset: number): PositionedNode | null => {
      if (!node || typeof node === 'string' || typeof node !== 'object') return null;

      const val = node.val !== undefined ? node.val :
                  node.value !== undefined ? node.value :
                  node.item !== undefined ? node.item :
                  node.data !== undefined ? node.data : '?';
                  
      const rawId = node._id ? String(node._id) : `Node#${nextId + 1}`;
      const id = `node_${rawId}`;
      const address = nodeAddresses.get(node) || formatAddress(rawId);
      
      let nextAddress = 'NULL';
      const nextNode = getNextNode(node);
      if (nextNode) {
        nextAddress = nodeAddresses.get(nextNode) || 'NULL';
      }

      let prevAddress: string | null = null;
      if (detectedDoubly) {
        prevAddress = 'NULL';
        const prevNode = getPrevNode(node);
        if (prevNode) {
          prevAddress = nodeAddresses.get(prevNode) || 'NULL';
        }
      }

      const spacing = detectedDoubly ? 4.2 : (detectedLinkedList ? 3.5 : 2.5);
      const x = offset * spacing;
      const y = -depth * 2.5;
      const z = 0;
      const position: [number, number, number] = [x, y, z];
      
      const currentPosNode: PositionedNode = { 
        id, 
        rawId,
        val, 
        position, 
        address, 
        nextAddress, 
        prevAddress,
        isLinkedList: detectedLinkedList,
        isDoubly: detectedDoubly,
        children: [] 
      };
      
      positionedNodes.push(currentPosNode);
      
      if (detectedLinkedList) {
        if (nextNode) {
          const child = traverse(nextNode, depth, offset + 1);
          if (child) {
            currentPosNode.children.push({ childId: child.id, type: 'next' });
            links.push({ 
              source: position, 
              target: child.position, 
              isLinkedList: true, 
              isDoubly: detectedDoubly,
              type: 'next'
            });

            if (detectedDoubly) {
              links.push({
                source: child.position,
                target: position,
                isLinkedList: true,
                isDoubly: true,
                type: 'prev'
              });
            }
          }
        }
      } else {
        const left = getLeftNode(node);
        const right = getRightNode(node);
        const spread = Math.max(1.6, 3.8 / Math.pow(1.3, depth));

        if (left) {
          const child = traverse(left, depth + 1, offset - spread);
          if (child) {
            currentPosNode.children.push({ childId: child.id, type: 'left' });
            links.push({
              source: position,
              target: child.position,
              isLinkedList: false,
              isDoubly: false,
              type: 'left'
            });
          }
        }

        if (right) {
          const child = traverse(right, depth + 1, offset + spread);
          if (child) {
            currentPosNode.children.push({ childId: child.id, type: 'right' });
            links.push({
              source: position,
              target: child.position,
              isLinkedList: false,
              isDoubly: false,
              type: 'right'
            });
          }
        }

        if (!left && !right) {
          const children = getChildrenNodes(node);
          if (children.length > 0) {
            const count = children.length;
            children.forEach((childNode, idx) => {
              let childOffset = offset;
              if (count > 1) {
                childOffset = offset - (spread / 2) + (idx * (spread / (count - 1)));
              }
              const child = traverse(childNode, depth + 1, childOffset);
              if (child) {
                currentPosNode.children.push({ childId: child.id, type: 'child' });
                links.push({ 
                  source: position, 
                  target: child.position, 
                  isLinkedList: false, 
                  isDoubly: false, 
                  type: idx === 0 ? 'left' : 'right' 
                });
              }
            });
          }
        }
      }
      
      return currentPosNode;
    };
    
    traverse(root, 0, 0);
    
    return { nodes: positionedNodes, links };
  }, [root]);

  return (
    <group position={[0, yOffset, 0]}>
      {links.map((link, i) => {
        let startPoint: [number, number, number] = link.source;
        let endPoint: [number, number, number] = link.target;
        let lineColor = '#9ca3af';
        let labelText = '';
        
        if (link.isLinkedList) {
          if (link.isDoubly) {
            if (link.type === 'next') {
              startPoint = [link.source[0] + 1.0, link.source[1], link.source[2] + 0.15];
              endPoint = [link.target[0] - 0.1, link.target[1], link.target[2] + 0.15];
              lineColor = '#10b981';
            } else {
              startPoint = [link.source[0] - 1.0, link.source[1], link.source[2] - 0.15];
              endPoint = [link.target[0] - 0.1, link.target[1], link.target[2] - 0.15];
              lineColor = '#a78bfa';
            }
          } else {
            startPoint = [link.source[0] + 0.7, link.source[1], link.source[2]];
            endPoint = [link.target[0] - 0.4, link.target[1], link.target[2]];
            lineColor = '#10b981';
          }
        } else {
          startPoint = [link.source[0], link.source[1] - 0.8, link.source[2]];
          endPoint = [link.target[0], link.target[1] + 0.8, link.target[2]];
          if (link.type === 'left') {
            lineColor = '#3b82f6';
            labelText = 'L';
          } else {
            lineColor = '#ec4899';
            labelText = 'R';
          }
        }

        const midX = (startPoint[0] + endPoint[0]) / 2;
        const midY = (startPoint[1] + endPoint[1]) / 2;

        return (
          <group key={`link-group-${i}`}>
            <Line 
              points={[startPoint, endPoint]} 
              color={lineColor} 
              lineWidth={3} 
            />
            {labelText && (
              <Text position={[midX, midY, 0.1]} fontSize={0.25} color={lineColor} anchorX="center" anchorY="middle" fontWeight="bold">
                {labelText}
              </Text>
            )}
            {link.isLinkedList && (
              <mesh position={[startPoint[0], startPoint[1], startPoint[2] + 0.02]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshBasicMaterial color={lineColor} />
              </mesh>
            )}
          </group>
        );
      })}
      
      {nodes.map((node, i) => {
        const ptrs = pointerMap.get(node.rawId) || pointerMap.get(node.address) || [];
        const isCurrent = ptrs.includes('curr') || ptrs.includes('node') || ptrs.includes('current') || ptrs.includes('p');
        const isMatched = (currentStep?.operationType === 'SEARCH MATCH' || currentStep?.metadata?.tree?.decision === 'FOUND') && (isCurrent || i === nodes.length - 1);
        const isNewNode = (currentStep?.operationType === 'NODE CREATION' || currentStep?.metadata?.tree?.operation === 'CREATE') && (ptrs.includes('new_node') || i === nodes.length - 1);
        const isComparing = currentStep?.metadata?.tree?.operation === 'COMPARE' && isCurrent;

        let compBadge: string | undefined = undefined;
        if (isComparing && currentStep?.metadata?.tree?.comparisonExpr) {
          compBadge = currentStep.metadata.tree.comparisonExpr;
        }

        if (node.isLinkedList) {
          return (
            <LinkedListNodeMesh
              key={node.id}
              position={node.position}
              value={node.val}
              address={node.address}
              nextAddress={node.nextAddress}
              prevAddress={node.prevAddress}
              label={i === 0 ? name : undefined}
              nodeId={node.rawId}
              pointers={ptrs}
              isMatched={isMatched}
              isNewNode={isNewNode}
            />
          );
        } else {
          return (
            <TreeNodeMesh
              key={node.id}
              position={node.position}
              value={node.val}
              address={node.address}
              label={i === 0 ? name : undefined}
              nodeId={node.rawId}
              pointers={ptrs}
              isCurrent={isCurrent}
              isComparing={isComparing}
              isVisited={false}
              isMatched={isMatched}
              isNewNode={isNewNode}
              comparisonBadge={compBadge}
            />
          );
        }
      })}
    </group>
  );
};

export default ThreeDNodeStructure;
