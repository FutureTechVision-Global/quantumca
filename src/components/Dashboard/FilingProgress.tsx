import React from 'react';
import { Progress } from '../UI/Progress';
import { Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface FilingProgressProps {
  filings: Array<{
    id: string;
    clientName: string;
    type: string;
    progress: number;
    status: 'in_progress' | 'review_required' | 'completed';
    dueDate: Date;
  }>;
}

const mockFilings = [
  {
    id: '1',
    clientName: 'Priya Patel',
    type: 'ITR-1',
    progress: 85,
    status: 'review_required' as const,
    dueDate: new Date('2024-07-31')
  },
  {
    id: '2',
    clientName: 'Amit Kumar',
    type: 'ITR-2',
    progress: 60,
    status: 'in_progress' as const,
    dueDate: new Date('2024-07-31')
  },
  {
    id: '3',
    clientName: 'Rahul Singh',
    type: 'ITR-1',
    progress: 100,
    status: 'completed' as const,
    dueDate: new Date('2024-07-31')
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed': return CheckCircle;
    case 'review_required': return AlertTriangle;
    default: return Clock;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'text-green-400';
    case 'review_required': return 'text-yellow-400';
    default: return 'text-blue-400';
  }
};

export default function FilingProgress({ filings = mockFilings }: FilingProgressProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Active Filings</h3>
      
      <div className="space-y-4">
        {filings.map((filing) => {
          const Icon = getStatusIcon(filing.status);
          const statusColor = getStatusColor(filing.status);
          
          return (
            <div key={filing.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-white font-medium">{filing.clientName}</h4>
                  <p className="text-blue-200 text-sm">{filing.type} • AY 2023-24</p>
                </div>
                <div className={`flex items-center space-x-1 ${statusColor}`}>
                  <Icon className="w-4 h-4" />
                  <span className="text-xs font-medium capitalize">
                    {filing.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
              
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-blue-200">Progress</span>
                  <span className="text-white">{filing.progress}%</span>
                </div>
                <Progress value={filing.progress} className="h-2" />
              </div>
              
              <div className="flex justify-between items-center text-xs">
                <span className="text-blue-300">
                  Due: {filing.dueDate.toLocaleDateString('en-IN')}
                </span>
                <button className="text-blue-300 hover:text-white transition-colors">
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}