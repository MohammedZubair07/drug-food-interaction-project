import React from 'react';
import './Aurora.css';

const Aurora = ({ 
  colorStops = ["#3b82f6", "#8b5cf6", "#ec4899"], 
  blend = 0.15, 
  speed = 1.0 
}) => {
  return (
    <div className="aurora-container">
      <div 
        className="aurora-gradient aurora-1" 
        style={{ '--color': colorStops[0], '--speed': `${15 / speed}s` }}
      ></div>
      <div 
        className="aurora-gradient aurora-2" 
        style={{ '--color': colorStops[1], '--speed': `${18 / speed}s` }}
      ></div>
      <div 
        className="aurora-gradient aurora-3" 
        style={{ '--color': colorStops[2], '--speed': `${22 / speed}s` }}
      ></div>
    </div>
  );
};

export default Aurora;
