import React from 'react';
import { motion } from 'framer-motion';

const DataFlowAnimation: React.FC = () => {

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center p-4 bg-gray-50 rounded-lg overflow-hidden"> {/* Arka plan rengi hafifletildi */}
      <svg className="absolute w-full h-full" viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Left Side: Data Column (Server Icon) */}
        <g transform="translate(50, 100)">
          <rect x="0" y="0" width="80" height="250" rx="10" fill="#4285F4" />
          <rect x="10" y="20" width="60" height="15" rx="3" fill="#A7D9FF" />
          <rect x="10" y="50" width="60" height="15" rx="3" fill="#A7D9FF" />
          <rect x="10" y="80" width="60" height="15" rx="3" fill="#A7D9FF" />
          <text x="40" y="280" textAnchor="middle" fill="#333" fontSize="20px" fontWeight="bold">Data</text>
        </g>

        {/* Middle: Rotating Hexagonal AI Icon */}
        <g transform="translate(450, 200)">
          <motion.path
            d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z" // Hexagon path
            fill="#6200EE" // Purple color for AI
            stroke="#4A00E0"
            strokeWidth="2"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            style={{ transformOrigin: "50px 50px" }}
          />
          <text x="50" y="58" textAnchor="middle" fill="#FFFFFF" fontSize="24px" fontWeight="bold">AI</text>
        </g>

        {/* Right Side: Dashboard Screen (Laptop) */}
        <g transform="translate(750, 200)">
          <rect x="0" y="0" width="200" height="120" rx="10" fill="#E0E0E0" stroke="#BDBDBD" strokeWidth="2" />
          {/* Simple dashboard graphic */}
          <rect x="20" y="20" width="30" height="60" fill="#4CAF50" />
          <rect x="60" y="40" width="30" height="40" fill="#2196F3" />
          <rect x="100" y="30" width="30" height="50" fill="#F44336" />
          <path d="M140 80 L150 70 L160 60 L170 50" stroke="#FFEB3B" strokeWidth="3" fill="none" />
          <circle cx="165" cy="100" r="10" fill="#4CAF50" />
          <path d="M160 100 L165 105 L175 95" stroke="#FFFFFF" strokeWidth="2" />
          <text x="100" y="140" textAnchor="middle" fill="#333" fontSize="18px" fontWeight="bold">Dashboard</text>
        </g>

        {/* Data Flow Lines (Dashed and Animated) */}
        {/* Data to AI */}
        <motion.path
          d="M130 225 C250 150, 350 200, 450 250"
          stroke="#4285F4" strokeWidth="3" strokeDasharray="10 10" fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        {/* AI to Dashboard */}
        <motion.path
          d="M550 250 C650 300, 700 250, 750 250"
          stroke="#6200EE" strokeWidth="3" strokeDasharray="10 10" fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.5 }}
        />
      </svg>
    </div>
  );
};

export default DataFlowAnimation;