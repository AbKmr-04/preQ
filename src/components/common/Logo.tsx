import React from 'react';

interface LogoProps {
  size?: number;
  color?: 'primary' | 'white';
}

const Logo: React.FC<LogoProps> = ({ size = 32, color = 'primary' }) => {
  const fill = color === 'primary' ? '#3498DB' : '#FFFFFF';
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="4" y="8" width="40" height="32" rx="4" fill={fill} />
      <path
        d="M14 16H34M14 24H28M14 32H24"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="36" cy="24" r="6" fill="#A2D9CE" stroke="white" strokeWidth="2" />
      <path
        d="M36 21V24L38 26"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Logo;