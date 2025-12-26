import React from 'react';
import { motion } from 'framer-motion';
import logo from '@/assets/brand/finops-logo-Kalkan.png';

const FinopsDataFlowAnimation: React.FC = () => {
  // Data kutuları için hareket eden noktalar
  const dataBoxes = [
    { name: 'API', color: 'from-blue-600 to-blue-700', icon: '🔌' },
    { name: 'Excel', color: 'from-green-600 to-green-700', icon: '📊' },
    { name: 'Bulut', color: 'from-cyan-600 to-cyan-700', icon: '☁️' }
  ];

  return (
    <div className="relative w-full h-[450px] flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-indigo-50 rounded-lg overflow-hidden">
      
      {/* ======================================== */}
      {/* LEFT: Data Boxes (API, Excel, Bulut) - Çok Küçültüldü */}
      {/* ======================================== */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 space-y-3">
        {dataBoxes.map((box, index) => (
          <motion.div
            key={box.name}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="relative"
          >
            {/* Data Box - Çok Küçük */}
            <div className={`bg-gradient-to-br ${box.color} rounded-md p-2 w-16 shadow-lg overflow-hidden`}>
              {/* Icon */}
              <div className="text-sm mb-1 text-center">{box.icon}</div>
              
              {/* Moving white rectangles (sağ-sola) */}
              <div className="space-y-1">
                <motion.div
                  className="h-1 bg-white rounded-full"
                  animate={{ x: [0, 24, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  style={{ width: '18px' }}
                />
                <motion.div
                  className="h-1 bg-white rounded-full"
                  animate={{ x: [0, 20, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                  style={{ width: '16px' }}
                />
                <motion.div
                  className="h-1 bg-white rounded-full"
                  animate={{ x: [0, 22, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                  style={{ width: '14px' }}
                />
              </div>
              
              {/* Label */}
              <p className="mt-1 text-[8px] font-bold text-white text-center">{box.name}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ======================================== */}
      {/* CENTER-RIGHT: Finops Logo - Laptop Üstünde */}
      {/* ======================================== */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="absolute right-24 top-[35%] z-10"
      >
        {/* Chip - Küçültüldü */}
        <div className="relative">
          <div className="bg-gradient-to-br from-indigo-900 to-indigo-950 rounded-md p-0.5 shadow-xl border border-indigo-400">
            <div className="bg-white rounded-md p-2 shadow-inner">
              <motion.img 
                src={logo} 
                alt="Finops AI Logo" 
                className="w-10 h-10"
                animate={{ 
                  scale: [1, 1.03, 1],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
          
          {/* Chip pinleri - Sağ (laptop'a) */}
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 space-y-1">
            <div className="w-2 h-0.5 bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-r"></div>
            <div className="w-2 h-0.5 bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-r"></div>
          </div>
          
          {/* Chip pinleri - Sol (data'dan gelecek) */}
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 space-y-1">
            <div className="w-2 h-0.5 bg-gradient-to-l from-indigo-500 to-indigo-700 rounded-l"></div>
            <div className="w-2 h-0.5 bg-gradient-to-l from-indigo-500 to-indigo-700 rounded-l"></div>
          </div>
        </div>
      </motion.div>

      {/* ======================================== */}
      {/* RIGHT-BOTTOM: AI-Based Intelligence (Laptop) - Daha Küçük */}
      {/* ======================================== */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute right-8 bottom-12"
      >
        <div className="flex flex-col items-center">
          {/* Laptop - Daha Küçük */}
          <div className="relative">
            {/* Screen */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-t p-2 border-2 border-gray-300 w-28 h-20 shadow-lg">
              {/* Dashboard Content */}
              <div className="h-full bg-white rounded p-1.5 space-y-1">
                {/* Pie Chart + Trend */}
                <div className="flex items-center gap-1.5">
                  <svg className="w-5 h-5" viewBox="0 0 32 32">
                    <circle cx="16" cy="16" r="14" fill="#3B82F6" />
                    <path d="M16 2 A 14 14 0 0 1 30 16 L 16 16 Z" fill="#F59E0B" />
                  </svg>
                  {/* Trend Line */}
                  <svg className="flex-1 h-3" viewBox="0 0 80 24">
                    <motion.path 
                      d="M 0 20 L 20 15 L 40 10 L 60 8 L 80 4" 
                      stroke="#10B981" 
                      strokeWidth="2" 
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                  </svg>
                </div>
                
                {/* Bar Chart - Yukarı Aşağı Hareket Eden */}
                <div className="flex items-end justify-around h-7 gap-0.5">
                  <motion.div 
                    className="w-1.5 bg-blue-500 rounded-t"
                    animate={{ 
                      height: ['40%', '70%', '50%', '60%', '40%']
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  />
                  <motion.div 
                    className="w-1.5 bg-indigo-500 rounded-t"
                    animate={{ 
                      height: ['60%', '90%', '70%', '80%', '60%']
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: 0.2
                    }}
                  />
                  <motion.div 
                    className="w-1.5 bg-purple-500 rounded-t"
                    animate={{ 
                      height: ['30%', '50%', '35%', '45%', '30%']
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: 0.4
                    }}
                  />
                  <motion.div 
                    className="w-1.5 bg-pink-500 rounded-t"
                    animate={{ 
                      height: ['70%', '95%', '80%', '90%', '70%']
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: 0.6
                    }}
                  />
                </div>
              </div>
              
              {/* Success Badge - Küçük */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 shadow-md border border-white"
              >
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
                </svg>
              </motion.div>
            </div>
            
            {/* Keyboard base */}
            <div className="bg-gradient-to-br from-gray-300 to-gray-400 h-1 rounded-b shadow-sm" 
                 style={{ width: '120%', marginLeft: '-10%' }} 
            />
          </div>
          
          {/* Label */}
          <p className="mt-2 text-[10px] font-bold text-indigo-600 text-center">
            AI-Based<br/>Intelligence
          </p>
        </div>
      </motion.div>

      {/* ======================================== */}
      {/* CHIP DEVRE ÇİZGİLERİ - KESİK ÇİZGİLİ */}
      {/* Kutulardan SAĞ kenardan çıkıp Logo'ya, Logo'dan Laptop'a */}
      {/* ======================================== */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 450" style={{ zIndex: 5 }}>
        <defs>
          {/* Circuit gradient */}
          <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#818CF8" />
          </linearGradient>
        </defs>

        {/* ========== SOL: Data Kutularından Logo'ya - KESİK ÇİZGİLER ========== */}
        
        {/* API Box -> Logo */}
        <motion.path
          d="M 96 145 L 350 145 L 350 180 L 640 180"
          stroke="#818CF8"
          strokeWidth="2.5"
          strokeDasharray="8 4"
          fill="none"
          opacity="0.8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        />

        {/* Excel Box -> Logo */}
        <motion.path
          d="M 96 220 L 450 220 L 640 220"
          stroke="#818CF8"
          strokeWidth="2.5"
          strokeDasharray="8 4"
          fill="none"
          opacity="0.8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        />

        {/* Bulut Box -> Logo */}
        <motion.path
          d="M 96 295 L 350 295 L 350 260 L 640 260"
          stroke="#818CF8"
          strokeWidth="2.5"
          strokeDasharray="8 4"
          fill="none"
          opacity="0.8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }}
        />

        {/* ========== SAĞ: Logo'dan Laptop'a - TEK KESİK ÇİZGİ ========== */}
        <motion.path
          d="M 708 220 L 800 220 L 800 340"
          stroke="#A78BFA"
          strokeWidth="3"
          strokeDasharray="8 4"
          fill="none"
          opacity="0.9"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
        />

        {/* ========== HAREKETLI DATA PULSELERİ ========== */}
        
        {/* API -> Logo */}
        <motion.circle r="4" fill="#60A5FA">
          <animateMotion 
            dur="4s" 
            repeatCount="indefinite"
            path="M 96 145 L 350 145 L 350 180 L 640 180"
          />
        </motion.circle>

        {/* Excel -> Logo */}
        <motion.circle r="4" fill="#34D399">
          <animateMotion 
            dur="4s" 
            begin="1.3s"
            repeatCount="indefinite"
            path="M 96 220 L 450 220 L 640 220"
          />
        </motion.circle>

        {/* Bulut -> Logo */}
        <motion.circle r="4" fill="#22D3EE">
          <animateMotion 
            dur="4s" 
            begin="2.6s"
            repeatCount="indefinite"
            path="M 96 295 L 350 295 L 350 260 L 640 260"
          />
        </motion.circle>

        {/* Logo -> Laptop */}
        <motion.circle r="5" fill="#A78BFA">
          <animateMotion 
            dur="3s" 
            begin="1s"
            repeatCount="indefinite"
            path="M 708 220 L 800 220 L 800 340"
          />
        </motion.circle>

        {/* ========== BAĞLANTI NOKTALARI ========== */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, staggerChildren: 0.1 }}
        >
          {/* Sol kesişim noktaları */}
          <circle cx="350" cy="145" r="4" fill="#818CF8" stroke="#fff" strokeWidth="2" />
          <circle cx="350" cy="180" r="4" fill="#818CF8" stroke="#fff" strokeWidth="2" />
          <circle cx="450" cy="220" r="4" fill="#818CF8" stroke="#fff" strokeWidth="2" />
          <circle cx="350" cy="260" r="4" fill="#818CF8" stroke="#fff" strokeWidth="2" />
          <circle cx="350" cy="295" r="4" fill="#818CF8" stroke="#fff" strokeWidth="2" />
          
          {/* Sağ kesişim */}
          <circle cx="800" cy="220" r="4" fill="#A78BFA" stroke="#fff" strokeWidth="2" />
        </motion.g>

      </svg>

    </div>
  );
};

export default FinopsDataFlowAnimation;

