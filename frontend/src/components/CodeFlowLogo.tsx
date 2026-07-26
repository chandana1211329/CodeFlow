import React from 'react';

export interface CodeFlowLogoProps {
  variant?: 'full' | 'horizontal' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
  showTagline?: boolean;
}

export const CodeFlowCube: React.FC<{ size?: number; className?: string }> = ({ 
  size = 40, 
  className = '' 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 210"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 ${className}`}
    >
      <defs>
        {/* Neon Glow Filter */}
        <filter id="neonGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComponentTransfer in="blur" result="brightBlur">
            <feFuncA type="linear" slope="1.8" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="brightBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* 3D Face Gradients */}
        <linearGradient id="topFaceGrad" x1="36" y1="20" x2="164" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="50%" stopColor="#0B132B" />
          <stop offset="100%" stopColor="#070B19" />
        </linearGradient>

        <linearGradient id="leftFaceGrad" x1="36" y1="56" x2="100" y2="162" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0D152D" />
          <stop offset="50%" stopColor="#080D1F" />
          <stop offset="100%" stopColor="#03060E" />
        </linearGradient>

        <linearGradient id="rightFaceGrad" x1="100" y1="56" x2="164" y2="162" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#111A36" />
          <stop offset="50%" stopColor="#0A0E24" />
          <stop offset="100%" stopColor="#040714" />
        </linearGradient>

        {/* Patterns & Edge Gradients */}
        <linearGradient id="codeLineGrad" x1="44" y1="80" x2="96" y2="140" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D946EF" />
          <stop offset="45%" stopColor="#A855F7" />
          <stop offset="80%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>

        <linearGradient id="codeSymbolGrad" x1="60" y1="55" x2="140" y2="55" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00F0FF" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>

        <linearGradient id="flowchartGrad" x1="110" y1="70" x2="160" y2="135" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00F0FF" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>

        <linearGradient id="edgeCyanBlue" x1="100" y1="20" x2="36" y2="128" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00F0FF" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>

        <linearGradient id="edgePurple" x1="100" y1="20" x2="164" y2="128" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00F0FF" />
          <stop offset="40%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#D946EF" />
        </linearGradient>

        <linearGradient id="centerVerticalEdge" x1="100" y1="90" x2="100" y2="162" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00F0FF" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>

        {/* Ambient Floor Glow */}
        <radialGradient id="bottomGlow" cx="100" cy="175" r="70" fx="100" fy="175" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.45" />
          <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient Glow */}
      <ellipse cx="100" cy="175" rx="65" ry="22" fill="url(#bottomGlow)" />

      {/* 3D CUBE FACES */}
      <g strokeLinejoin="round" strokeLinecap="round">
        {/* Left Face */}
        <path d="M 100 90 L 36 56 V 128 L 100 162 Z" fill="url(#leftFaceGrad)" stroke="#1E293B" strokeWidth="1" />

        {/* Right Face */}
        <path d="M 100 90 L 164 56 V 128 L 100 162 Z" fill="url(#rightFaceGrad)" stroke="#1E293B" strokeWidth="1" />

        {/* Top Face */}
        <path d="M 100 20 L 164 56 L 100 90 L 36 56 Z" fill="url(#topFaceGrad)" stroke="#1E293B" strokeWidth="1" />

        {/* TOP FACE: </> */}
        <g stroke="url(#codeSymbolGrad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#neonGlow)">
          <path d="M 72 50 L 62 55 L 72 60" />
          <path d="M 94 45 L 106 65" />
          <path d="M 128 50 L 138 55 L 128 60" />
        </g>

        {/* LEFT FACE: Horizontal Code Lines */}
        <g stroke="url(#codeLineGrad)" strokeWidth="3.5" strokeLinecap="round" filter="url(#neonGlow)">
          <line x1="48" y1="74" x2="88" y2="95" />
          <line x1="48" y1="86" x2="88" y2="107" />
          <line x1="48" y1="98" x2="88" y2="119" />
          <line x1="48" y1="110" x2="88" y2="131" />
          <line x1="48" y1="122" x2="88" y2="143" />
        </g>

        {/* RIGHT FACE: Connected Nodes / Flowchart */}
        <g filter="url(#neonGlow)">
          <path d="M 120 76 L 144 64 V 110 M 144 88 L 120 100 V 126" stroke="url(#flowchartGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="120" cy="76" r="5" fill="#0B132B" stroke="#00F0FF" strokeWidth="2.5" />
          <rect x="138" y="58" width="14" height="12" rx="3" fill="#3B82F6" stroke="#00F0FF" strokeWidth="1.5" />
          <rect x="138" y="104" width="14" height="12" rx="3" fill="#8B5CF6" stroke="#00F0FF" strokeWidth="1.5" />
          <rect x="113" y="120" width="14" height="14" rx="3" fill="#00F0FF" stroke="#3B82F6" strokeWidth="1.5" />
        </g>

        {/* NEON 3D EDGES */}
        <path d="M 100 20 L 36 56 V 128" stroke="url(#edgeCyanBlue)" strokeWidth="2.5" fill="none" filter="url(#neonGlow)" />
        <path d="M 100 20 L 164 56 V 128" stroke="url(#edgePurple)" strokeWidth="2.5" fill="none" filter="url(#neonGlow)" />
        <path d="M 100 90 V 162" stroke="url(#centerVerticalEdge)" strokeWidth="3" fill="none" filter="url(#neonGlow)" />
        <circle cx="100" cy="90" r="2" fill="#FFFFFF" filter="url(#neonGlow)" />
      </g>
    </svg>
  );
};

export const CodeFlowLogo: React.FC<CodeFlowLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
  showTagline
}) => {
  // Resolve cube size based on size prop or raw number
  const getCubePixelSize = () => {
    if (typeof size === 'number') return size;
    switch (size) {
      case 'sm': return variant === 'full' ? 64 : 32;
      case 'md': return variant === 'full' ? 96 : 40;
      case 'lg': return variant === 'full' ? 128 : 52;
      case 'xl': return variant === 'full' ? 160 : 64;
      default: return 40;
    }
  };

  const cubeSize = getCubePixelSize();

  const getTextClasses = () => {
    if (typeof size === 'number') {
      if (size <= 32) return 'text-lg';
      if (size <= 48) return 'text-2xl';
      if (size <= 72) return 'text-4xl';
      return 'text-5xl';
    }
    switch (size) {
      case 'sm': return 'text-lg';
      case 'md': return 'text-2xl';
      case 'lg': return 'text-4xl';
      case 'xl': return 'text-5xl';
      default: return 'text-2xl';
    }
  };

  if (variant === 'icon') {
    return <CodeFlowCube size={cubeSize} className={className} />;
  }

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <CodeFlowCube size={cubeSize} className="mb-3 transition-transform hover:scale-105" />
        <div className={`font-extrabold tracking-tight ${getTextClasses()}`}>
          <span className="text-white">Code</span>
          <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Flow</span>
        </div>
        {(showTagline ?? true) && (
          <p className="mt-2 text-sm md:text-base text-gray-400 font-medium tracking-wide">
            Visualize. Understand. Code.
          </p>
        )}
      </div>
    );
  }

  // Horizontal variant (default for Navbar / Header / Sidebar)
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <CodeFlowCube size={cubeSize} className="transition-transform hover:scale-105" />
      <div className={`font-bold tracking-tight ${getTextClasses()}`}>
        <span className="text-white">Code</span>
        <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Flow</span>
      </div>
    </div>
  );
};

export default CodeFlowLogo;
