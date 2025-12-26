
import React from 'react';
import { FiFileText, FiGrid } from 'react-icons/fi';
import './FinopsAnimation.css';

const FinopsAnimation = () => {
  return (
    <div className="finops-animation-container">
      <svg viewBox="0 0 500 300" preserveAspectRatio="xMidYMid meet">
        
        {/* ======================================================= */}
        {/*             SVG Definitions for Reusability             */}
        {/* ======================================================= */}
        <defs>
          {/* Paths for dots to follow */}
          <path id="path-data-to-core" d="M 105 150 C 140 150, 160 150, 160 150" fill="none" />
          <path id="path-api-to-core" d="M 155 100 C 160 110, 165 120, 170 125" fill="none" />
          <path id="path-core-to-laptop" d="M 235 150 Q 280 150 340 210" fill="none" />

          {/* The central gear icon for the AI Core */}
          <g id="gear-shape">
            <path d="M22.1,14.6l-2-1.1c-0.5-1.5-1.3-2.8-2.4-3.9l1.1-2l-1.7-1.7l-2,1.1c-1.1-1.1-2.4-1.9-3.9-2.4l1.1-2l-1.7-1.7l-2,1.1 c-1.5-0.5-2.8-0.8-4.3-0.8s-2.8,0.3-4.3,0.8l-2-1.1l-1.7,1.7l1.1,2c-1.1,1.1-1.9,2.4-2.4,3.9l-2,1.1l1.1,2 c0.5,1.5,1.3,2.8,2.4,3.9l-1.1,2l1.7,1.7l2-1.1c1.1,1.1,2.4,1.9,3.9,2.4l-1.1,2l1.7,1.7l2-1.1c1.5,0.5,2.8,0.8,4.3,0.8 s2.8-0.3,4.3-0.8l2,1.1l1.7-1.7l-1.1-2c1.1-1.1,1.9-2.4,2.4-3.9L22.1,14.6z M11.5,18.8c-1.8,0-3.3-1.5-3.3-3.3s1.5-3.3,3.3-3.3 s3.3,1.5,3.3,3.3S13.3,18.8,11.5,18.8z"/>
          </g>
        </defs>

        {/* ======================================================= */}
        {/*                 Paths and Moving Dots                   */}
        {/* ======================================================= */}
        <use href="#path-data-to-core" className="flow-path" />
        <use href="#path-api-to-core" className="flow-path" />
        <use href="#path-core-to-laptop" className="flow-path" />
        
        <circle r="3.5" className="moving-dot">
          <animateMotion dur="4s" repeatCount="indefinite" rotate="auto"><mpath href="#path-data-to-core" /></animateMotion>
        </circle>
        <circle r="3.5" className="moving-dot" fill="#EF4444">
          <animateMotion dur="3s" begin="1s" repeatCount="indefinite" rotate="auto"><mpath href="#path-api-to-core" /></animateMotion>
        </circle>
         <circle r="4.5" className="moving-dot" fill="#2dd4bf">
          <animateMotion dur="5s" begin="0.5s" repeatCount="indefinite" rotate="auto"><mpath href="#path-core-to-laptop" /></animateMotion>
        </circle>

        {/* ======================================================= */}
        {/*                 LEFT: Data Server                     */}
        {/* ======================================================= */}
        <g className="data-server-group" transform="translate(20 120)">
          <rect x="0" y="0" width="80" height="60" rx="5" className="server-body" />
          <line x1="8" y1="10" x2="72" y2="10" className="server-line" />
          <line x1="8" y1="20" x2="50" y2="20" className="server-line" />
          <circle cx="15" cy="32" r="3" className="server-dot" />
          <rect x="0" y="-30" width="80" height="20" fill="transparent" />
          <text x="40" y="-15" className="group-label">Data</text>
        </g>

        {/* ======================================================= */}
        {/*                  CENTER: AI Core                      */}
        {/* ======================================================= */}
        <g className="ai-core-group" transform="translate(200 150)">
          <circle cx="0" cy="0" r="45" className="dashed-circle" />
          <g className="gear-icon" transform="scale(1.5)">
            <use href="#gear-shape" transform-origin="center" x="-11.5" y="-11.5" />
          </g>
          <foreignObject x="-10" y="-10" width="20" height="20">
              <div className="logo-A">A</div>
          </foreignObject>
        </g>
        
        {/* AI Core Satellite Icons */}
        <g transform="translate(148 85)">
          <circle r="15" className="icon-bg icon-bg-red" />
          <text x="0" y="3" className="icon-text">API</text>
        </g>
        <foreignObject x="225" y="90" width="30" height="30">
            <div className="icon-wrapper icon-bg-green"><FiFileText color="white" size={14} /></div>
        </foreignObject>
        <foreignObject x="215" y="165" width="30" height="30">
            <div className="icon-wrapper icon-bg-teal"><FiGrid color="white" size={14} /></div>
        </foreignObject>
        
        {/* ======================================================= */}
        {/*                  RIGHT: Laptop                        */}
        {/* ======================================================= */}
        <g className="laptop-group" transform="translate(350 180)">
          <rect x="0" y="0" width="140" height="85" rx="8" className="laptop-screen" />
          <g className="screen-content">
              <path d="M 20 60 L 45 35 L 70 50 L 95 25 L 120 45" className="graph-line" />
              <g className="graph-check-group">
                  <circle cx="110" cy="60" r="10" className="graph-check-bg" />
                  <path d="M 105 60 L 109 64 L 115 57" className="graph-check" />
              </g>
          </g>
          <path d="M -15 85 L 155 85 L 165 95 L -25 95 Z" className="laptop-base" />
          <rect x="0" y="-30" width="140" height="20" fill="transparent" />
          <text x="70" y="-15" className="group-label">AI-Based Intelligence</text>
        </g>
      </svg>
    </div>
  );
};

export default FinopsAnimation;
