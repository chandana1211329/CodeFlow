import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Sparkles, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { Code, Cpu, Database, Eye, Terminal, Play, CheckCircle2, ArrowRight } from 'lucide-react';

// 3D Animated Scene elements inside R3F Canvas
const SceneContent = () => {
  const groupRef = useRef<THREE.Group>(null);
  const cubeRef1 = useRef<THREE.Mesh>(null);
  const cubeRef2 = useRef<THREE.Mesh>(null);
  const cubeRef3 = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
    if (cubeRef1.current) {
      cubeRef1.current.rotation.x += delta * 0.4;
      cubeRef1.current.rotation.y += delta * 0.5;
    }
    if (cubeRef2.current) {
      cubeRef2.current.rotation.x -= delta * 0.3;
      cubeRef2.current.rotation.z += delta * 0.4;
    }
    if (cubeRef3.current) {
      cubeRef3.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} color="#00F0FF" />
      <pointLight position={[-10, -10, -5]} intensity={1} color="#D946EF" />

      <Sparkles count={40} scale={6} size={2.5} speed={0.4} color="#60A5FA" />

      <group ref={groupRef}>
        {/* Floating 3D Memory Cube 1 (Stack Node) */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1.2}>
          <mesh ref={cubeRef1} position={[-1.8, 1, 0]}>
            <boxGeometry args={[0.9, 0.9, 0.9]} />
            <MeshWobbleMaterial factor={0.15} speed={1.5} color="#3B82F6" roughness={0.2} metalness={0.8} />
          </mesh>
        </Float>

        {/* Floating 3D Memory Cube 2 (Heap Object) */}
        <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.5}>
          <mesh ref={cubeRef2} position={[1.8, -0.8, 0.5]}>
            <boxGeometry args={[1.1, 1.1, 1.1]} />
            <MeshWobbleMaterial factor={0.2} speed={2} color="#8B5CF6" roughness={0.1} metalness={0.9} />
          </mesh>
        </Float>

        {/* Floating 3D Data Node 3 */}
        <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.8}>
          <mesh ref={cubeRef3} position={[0, -1.5, -1]}>
            <octahedronGeometry args={[0.7]} />
            <meshStandardMaterial color="#EC4899" wireframe roughness={0.1} />
          </mesh>
        </Float>

        {/* Central Core Sphere */}
        <mesh position={[0, 0.2, -0.5]}>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshStandardMaterial color="#00F0FF" roughness={0.3} metalness={0.7} emissive="#004466" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </>
  );
};

export const CodeFlowHeroVisual: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { name: 'CODE', icon: Code, color: 'from-cyan-500 to-blue-500', desc: 'Python Script Input' },
    { name: 'EXECUTION', icon: Cpu, color: 'from-blue-500 to-indigo-500', desc: 'Traced Line-by-Line' },
    { name: 'MEMORY', icon: Database, color: 'from-indigo-500 to-purple-500', desc: 'Stack & Heap Allocation' },
    { name: 'VISUALIZATION', icon: Eye, color: 'from-purple-500 to-pink-500', desc: 'Interactive 3D Engine' },
    { name: 'OUTPUT', icon: Terminal, color: 'from-pink-500 to-rose-500', desc: 'Console & Dynamic State' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      {/* Glow Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-purple-600/20 to-pink-600/30 blur-[100px] -z-10 rounded-full" />

      {/* Main Glass Workspace Container */}
      <div className="relative rounded-2xl glass border border-white/10 p-4 md:p-6 shadow-2xl backdrop-blur-xl overflow-hidden">
        {/* Container Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-xs font-mono text-gray-400">codeflow-execution-engine.v3d</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Visualizer
            </span>
          </div>
        </div>

        {/* Top Concept Pipeline Indicator */}
        <div className="mb-4 bg-slate-950/70 rounded-xl p-3 border border-white/5">
          <div className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-2 flex items-center justify-between">
            <span>Execution Pipeline</span>
            <span className="text-blue-400 font-mono">Step {activeStep + 1} of 5</span>
          </div>

          <div className="grid grid-cols-5 gap-1.5">
            {steps.map((step, idx) => {
              const IconComponent = step.icon;
              const isActive = idx === activeStep;
              const isPast = idx < activeStep;

              return (
                <div
                  key={step.name}
                  onClick={() => setActiveStep(idx)}
                  className={`cursor-pointer transition-all duration-300 rounded-lg p-1.5 flex flex-col items-center justify-center text-center ${
                    isActive
                      ? `bg-gradient-to-r ${step.color} text-white shadow-lg scale-105`
                      : isPast
                      ? 'bg-white/10 text-gray-300'
                      : 'bg-white/5 text-gray-500 hover:bg-white/10'
                  }`}
                >
                  <IconComponent className={`w-3.5 h-3.5 mb-1 ${isActive ? 'animate-bounce' : ''}`} />
                  <span className="text-[9px] font-bold tracking-tight truncate w-full">{step.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Central Visual Showcase: Split 3D Canvas & Code Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-64 md:h-72">
          {/* 3D Canvas Box */}
          <div className="relative rounded-xl bg-slate-950/90 border border-blue-500/20 overflow-hidden flex items-center justify-center">
            {/* Background Mesh Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
            
            {/* R3F 3D Canvas */}
            <div className="absolute inset-0">
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <SceneContent />
              </Canvas>
            </div>

            {/* Overlaid Label Card */}
            <div className="absolute bottom-3 left-3 right-3 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-lg p-2 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-mono text-cyan-300 text-[11px]">3D Memory Graph</span>
              </div>
              <span className="text-[10px] text-gray-400 font-mono">Stack & Heap Synced</span>
            </div>
          </div>

          {/* Animated Code & State Card */}
          <div className="rounded-xl bg-slate-950/90 border border-white/10 p-3 font-mono text-xs flex flex-col justify-between overflow-hidden">
            <div>
              <div className="flex items-center justify-between text-[11px] text-gray-400 pb-2 mb-2 border-b border-white/5">
                <span className="flex items-center gap-1 text-purple-400">
                  <Code className="w-3.5 h-3.5" /> code_sample.py
                </span>
                <span className="text-[10px] text-emerald-400">Step Tracing</span>
              </div>

              {/* Code lines with active line highlight */}
              <div className="space-y-1 text-[11px]">
                <div className={`px-2 py-0.5 rounded transition-colors ${activeStep === 0 ? 'bg-blue-500/20 text-blue-300 font-bold border-l-2 border-blue-400' : 'text-gray-400'}`}>
                  <span className="text-gray-600 select-none mr-2">1</span>
                  <span className="text-purple-400 font-semibold">def</span> <span className="text-blue-300">visualize_flow</span>():
                </div>
                <div className={`px-2 py-0.5 rounded transition-colors ${activeStep === 1 || activeStep === 2 ? 'bg-purple-500/20 text-purple-200 font-bold border-l-2 border-purple-400' : 'text-gray-400'}`}>
                  <span className="text-gray-600 select-none mr-2">2</span>
                  &nbsp;&nbsp;stack_vars = [<span className="text-amber-300">10</span>, <span className="text-amber-300">20</span>, <span className="text-amber-300">30</span>]
                </div>
                <div className={`px-2 py-0.5 rounded transition-colors ${activeStep === 3 ? 'bg-pink-500/20 text-pink-200 font-bold border-l-2 border-pink-400' : 'text-gray-400'}`}>
                  <span className="text-gray-600 select-none mr-2">3</span>
                  &nbsp;&nbsp;render_3d_memory(stack_vars)
                </div>
                <div className={`px-2 py-0.5 rounded transition-colors ${activeStep === 4 ? 'bg-emerald-500/20 text-emerald-200 font-bold border-l-2 border-emerald-400' : 'text-gray-400'}`}>
                  <span className="text-gray-600 select-none mr-2">4</span>
                  &nbsp;&nbsp;<span className="text-purple-400 font-semibold">return</span> <span className="text-emerald-300">"Logic Understood!"</span>
                </div>
              </div>
            </div>

            {/* Live Variable Memory Inspector */}
            <div className="mt-3 bg-slate-900/90 rounded-lg p-2 border border-white/5 text-[10px]">
              <div className="text-gray-400 mb-1 flex justify-between font-sans">
                <span className="font-semibold text-gray-300">Variable State Tracker</span>
                <span className="text-blue-400 font-mono">0x00FF8C</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="bg-slate-950 p-1.5 rounded border border-blue-500/20">
                  <span className="text-gray-400">stack_vars: </span>
                  <span className="text-blue-400 font-bold">[10, 20, 30]</span>
                </div>
                <div className="bg-slate-950 p-1.5 rounded border border-purple-500/20">
                  <span className="text-gray-400">execution: </span>
                  <span className="text-emerald-400 font-bold">Step {activeStep + 1}/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Output Terminal Bar */}
        <div className="mt-4 bg-slate-950 rounded-xl p-3 border border-emerald-500/20 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 truncate">
            <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-emerald-400 font-bold">&gt;</span>
            <span className="text-gray-300 truncate">
              {activeStep === 0 && 'Parsing source code & mapping AST nodes...'}
              {activeStep === 1 && 'Traced execution step 2: memory allocated'}
              {activeStep === 2 && 'Variable stack_vars pushed to memory frame'}
              {activeStep === 3 && 'Constructing 3D memory environment...'}
              {activeStep === 4 && 'Output: Logic transformation complete [OK]'}
            </span>
          </div>
          <span className="hidden sm:flex items-center gap-1 text-[10px] text-gray-500 shrink-0 ml-2">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Synced
          </span>
        </div>
      </div>
    </div>
  );
};

export default CodeFlowHeroVisual;
