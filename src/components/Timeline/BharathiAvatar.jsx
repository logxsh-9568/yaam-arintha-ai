import React from 'react';
import '../../pages/BharathiTimeline.css';

const BharathiAvatar = ({ styleClass }) => {
  return (
    <div className={`bt-avatar-container ${styleClass}`}>
      <svg className="bt-avatar-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(212, 175, 55, 0.4)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="45" fill="url(#glow)" />
        {/* Stylized Silhouette of Bharathiyar */}
        <path d="M50,15 C45,15 35,25 35,40 C35,50 40,55 45,60 C40,70 30,80 20,95 L80,95 C70,80 60,70 55,60 C60,55 65,50 65,40 C65,25 55,15 50,15 Z" fill="#111" stroke="#d4af37" strokeWidth="1"/>
        {/* Turban */}
        <path d="M32,35 C35,20 45,15 50,15 C55,15 65,20 68,35 C60,40 40,40 32,35 Z" fill="#e8dcc4"/>
        {/* Moustache */}
        <path d="M40,50 C45,48 55,48 60,50 C62,52 65,55 65,55 C65,55 55,52 50,52 C45,52 35,55 35,55 C35,55 38,52 40,50 Z" fill="#111"/>
      </svg>
    </div>
  );
};

export default BharathiAvatar;
