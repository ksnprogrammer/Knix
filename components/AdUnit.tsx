import React from 'react';
import { AD_SETTINGS } from '../constants';

interface AdUnitProps {
  format: 'sidebar' | 'banner' | 'feed';
  className?: string;
}

export const AdUnit: React.FC<AdUnitProps> = ({ format, className = '' }) => {
  if (!AD_SETTINGS.enabled) return null;

  return (
    <div className={`bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden flex items-center justify-center relative group ${className}`}>
      {/* 
        In a real deployment, you would place your AdSense or Ad Network code here.
        Example: <ins className="adsbygoogle" ... />
      */}
      
      {/* Placeholder Visual */}
      <div className="w-full h-full flex flex-col items-center justify-center p-4">
        <span className="text-[10px] uppercase tracking-widest text-slate-600 absolute top-1 right-2">Advertisement</span>
        <div className="text-center">
            <p className="text-slate-500 text-sm font-medium">Study better with Knix Pro</p>
            <p className="text-slate-600 text-xs">Support free education</p>
        </div>
      </div>
    </div>
  );
};