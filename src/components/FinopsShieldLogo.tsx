import React from 'react';

const FinopsShieldLogo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 80"
      className={className}
      aria-labelledby="finops-logo-title"
    >
      <title id="finops-logo-title">Finops.ist Logo</title>

      {/* Dış Mavi Yuvarlak Kalkan */}
      <path
        d="M40 80C15 75 5 55 5 40V20C5 10 15 2 25 5L40 10L55 5C65 2 75 10 75 20V40C75 55 65 75 40 80Z"
        fill="#4285F4"
      />

      {/* İç Beyaz Kalkan */}
      <path
        d="M40 75C20 70 10 55 10 40V22C10 15 18 8 26 10L40 15L54 10C62 8 70 15 70 22V40C70 55 60 70 40 75Z"
        fill="white"
      />

      {/* Stilize 'f' Harfi */}
      <path
        d="M32 28 H 48 V 40 H 55 V 48 H 48 V 60 H 32 V 28 Z"
        fill="#202124"
      />

      {/* Turuncu Nokta */}
      <circle
        cx="53"
        cy="54"
        r="6"
        fill="#F97316"
      />
    </svg>
  );
};

export default FinopsShieldLogo;
