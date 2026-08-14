import { CareerNode } from './types';

export const arVrGraphicsData: CareerNode = {
  id: 'ar-vr-xr-graphics',
  title: 'AR / VR / XR & Graphics',
  category: 'ar-vr-xr-graphics',
  type: 'category',
  icon: 'Glasses',
  description: 'Augmented reality, virtual reality, extended reality, 3D computer graphics engines, shaders, and spatial computing.',
  overview: 'Spatial computing and graphics software engineers build real-time 3D environments, spatial tracking, shader pipelines, and immersive headsets experiences.',
  children: [
    { id: 'ar-developer', title: 'AR Developer', type: 'role', description: 'Augmented reality apps placing digital objects onto physical camera feeds (ARKit, ARCore).' },
    { id: 'vr-developer', title: 'VR Developer', type: 'role', description: 'Virtual reality interactive environments for headsets like Meta Quest and Apple Vision Pro.' },
    { id: 'xr-developer', title: 'XR Developer', type: 'role', description: 'Extended reality solutions blending virtual elements with real-world spatial environments.' },
    { id: 'computer-graphics-engineer', title: 'Computer Graphics Engineer', type: 'role', description: 'Low-level graphics APIs (Vulkan, DirectX 12, Metal, WebGL, WebGPU) and matrix math.' },
    { id: 'graphics-programmer', title: 'Graphics Programmer', type: 'role', description: 'Shader programming (HLSL/GLSL), lighting models, PBR materials, and shadow rendering.' },
    { id: '3d-developer', title: '3D Developer', type: 'role', description: 'Interactive Web 3D environments using Three.js, Babylon.js, and GLTF asset pipelines.' },
    { id: 'rendering-engineer', title: 'Rendering Engineer', type: 'role', description: 'Real-time ray tracing, path tracing, global illumination, and spatial acceleration structures.' }
  ]
};
