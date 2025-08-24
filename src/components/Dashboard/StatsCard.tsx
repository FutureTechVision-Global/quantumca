import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  color: string;
}

export default function StatsCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon: Icon, 
  color 
}: StatsCardProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive': return 'text-green-400';
      case 'negative': return 'text-red-400';
      default: return 'text-blue-200';
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change && (
          <span className={`text-sm font-medium ${getChangeColor()}`}>
            {change}
          </span>
        )}
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-white mb-1">
          {typeof value === 'number' ? value.toLocaleString('en-IN') : value}
        </h3>
        <p className="text-blue-200 text-sm">{title}</p>
      </div>
    </div>
  );
}