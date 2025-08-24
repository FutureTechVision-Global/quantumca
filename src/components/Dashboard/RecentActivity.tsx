import React from 'react';
import { Clock, CheckCircle, AlertCircle, FileText, User } from 'lucide-react';

interface Activity {
  id: string;
  type: 'filing_completed' | 'review_required' | 'client_added' | 'document_processed';
  title: string;
  description: string;
  timestamp: Date;
  status: 'success' | 'warning' | 'info';
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'review_required',
    title: 'Filing Review Required',
    description: 'ITR-1 for Priya Patel needs manual review',
    timestamp: new Date('2024-01-15T09:00:00Z'),
    status: 'warning'
  },
  {
    id: '2',
    type: 'filing_completed',
    title: 'Filing Completed',
    description: 'ITR-2 for Amit Kumar successfully filed',
    timestamp: new Date('2024-01-15T08:30:00Z'),
    status: 'success'
  },
  {
    id: '3',
    type: 'document_processed',
    title: 'Document Processed',
    description: 'Form 16 for Rahul Singh processed successfully',
    timestamp: new Date('2024-01-15T08:00:00Z'),
    status: 'info'
  },
  {
    id: '4',
    type: 'client_added',
    title: 'New Client Added',
    description: 'Sneha Gupta added to client database',
    timestamp: new Date('2024-01-14T16:30:00Z'),
    status: 'info'
  }
];

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'filing_completed': return CheckCircle;
    case 'review_required': return AlertCircle;
    case 'client_added': return User;
    case 'document_processed': return FileText;
    default: return Clock;
  }
};

const getStatusColor = (status: Activity['status']) => {
  switch (status) {
    case 'success': return 'text-green-400';
    case 'warning': return 'text-yellow-400';
    case 'info': return 'text-blue-400';
    default: return 'text-blue-200';
  }
};

export default function RecentActivity() {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Recent Activity</h3>
      
      <div className="space-y-4">
        {mockActivities.map((activity) => {
          const Icon = getActivityIcon(activity.type);
          const statusColor = getStatusColor(activity.status);
          
          return (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
              <div className={`p-2 rounded-lg bg-white/10 ${statusColor}`}>
                <Icon className="w-4 h-4" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium">{activity.title}</p>
                <p className="text-blue-200 text-xs mt-1">{activity.description}</p>
                <p className="text-blue-300 text-xs mt-2 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {activity.timestamp.toLocaleString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit',
                    day: '2-digit',
                    month: 'short'
                  })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      <button className="w-full mt-4 text-blue-300 hover:text-white text-sm font-medium py-2 hover:bg-white/5 rounded-lg transition-colors">
        View All Activity
      </button>
    </div>
  );
}