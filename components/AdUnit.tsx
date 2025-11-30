import React from 'react';
import { AD_SETTINGS } from '../constants';

interface AdUnitProps {
  format: 'sidebar' | 'banner' | 'feed';
  className?: string;
}

export const AdUnit: React.FC<AdUnitProps> = ({ format, className = '' }) => {
  if (!AD_SETTINGS.enabled) return null;

  return (
    <div className={`bg-knix-card border border-knix-border rounded-lg overflow-hidden flex items-center justify-center relative group ${className}`}>
      {/* 
        In a real deployment, you would place your AdSense or Ad Network code here.
        Example: <ins className="adsbygoogle" ... />
      */}
      
      {/* Placeholder Visual */}
      <div className="w-full h-full flex flex-col items-center justify-center p-4">
        <span className="text-[10px] uppercase tracking-widest text-knix-muted absolute top-1 right-2">Advertisement</span>
        <div className="text-center">
            <p className="text-knix-text text-sm font-medium">Study better with Knix Pro</p>
            <p className="text-knix-muted text-xs">Support free education</p>
        </div>
      </div>
    </div>
  );
};