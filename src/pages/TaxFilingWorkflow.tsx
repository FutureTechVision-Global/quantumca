import React, { useState } from 'react';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  User, 
  Bot,
  Play,
  Pause,
  RotateCcw,
  Eye,
  Download,
  Send,
  Shield,
  Zap
} from 'lucide-react';
import { Filing, WorkflowStep } from '../types';

interface TaxFilingWorkflowProps {
  filings: Filing[];
}

const workflowSteps = [
  { id: 'data_collection', name: 'Data Collection', icon: FileText },
  { id: 'processing', name: 'Data Processing', icon: Bot },
  { id: 'computation', name: 'Tax Computation', icon: Zap },
  { id: 'review', name: 'Manual Review', icon: User },
  { id: 'filing', name: 'Portal Filing', icon: Send },
  { id: 'verification', name: 'E-Verification', icon: Shield }
];

const mockFilings: Filing[] = [
  {
    id: '1',
    clientId: '1',
    assessmentYear: '2023-24',
    filingType: 'itr1',
    status: 'review_required',
    taxableIncome: 850000,
    taxLiability: 85000,
    refundAmount: 15000,
    createdAt: new Date('2024-01-10T00:00:00Z'),
    updatedAt: new Date('2024-01-15T00:00:00Z'),
    verificationStatus: 'pending',
    workflow: [
      {
        id: '1',
        name: 'Data Collection',
        status: 'completed',
        startedAt: new Date('2024-01-10T10:00:00Z'),
        completedAt: new Date('2024-01-10T10:30:00Z'),
        automationBot: 'DocumentIntakeBot'
      },
      {
        id: '2',
        name: 'Data Processing',
        status: 'completed',
        startedAt: new Date('2024-01-10T10:30:00Z'),
        completedAt: new Date('2024-01-10T11:15:00Z'),
        automationBot: 'DataProcessingBot'
      },
      {
        id: '3',
        name: 'Tax Computation',
        status: 'completed',
        startedAt: new Date('2024-01-10T11:15:00Z'),
        completedAt: new Date('2024-01-10T11:45:00Z'),
        automationBot: 'TaxComputationBot'
      },
      {
        id: '4',
        name: 'Manual Review',
        status: 'in_progress',
        startedAt: new Date('2024-01-15T09:00:00Z'),
        notes: 'Reviewing deduction claims for accuracy'
      }
    ]
  },
  {
    id: '2',
    clientId: '2',
    assessmentYear: '2023-24',
    filingType: 'itr2',
    status: 'processing',
    taxableIncome: 1200000,
    taxLiability: 120000,
    createdAt: new Date('2024-01-12T00:00:00Z'),
    updatedAt: new Date('2024-01-15T00:00:00Z'),
    verificationStatus: 'pending',
    workflow: [
      {
        id: '1',
        name: 'Data Collection',
        status: 'completed',
        startedAt: new Date('2024-01-12T14:00:00Z'),
        completedAt: new Date('2024-01-12T14:45:00Z'),
        automationBot: 'DocumentIntakeBot'
      },
      {
        id: '2',
        name: 'Data Processing',
        status: 'in_progress',
        startedAt: new Date('2024-01-15T10:00:00Z'),
        automationBot: 'DataProcessingBot'
      }
    ]
  }
];

export default function TaxFilingWorkflow({ filings = mockFilings }: TaxFilingWorkflowProps) {
  const [selectedFiling, setSelectedFiling] = useState<Filing | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const getStatusIcon = (status: Filing['status']) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'review_required': return AlertTriangle;
      case 'filing_in_progress': return Send;
      case 'processing': return Bot;
      default: return Clock;
    }
  };

  const getStatusColor = (status: Filing['status']) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-500/20';
      case 'review_required': return 'text-yellow-400 bg-yellow-500/20';
      case 'filing_in_progress': return 'text-blue-400 bg-blue-500/20';
      case 'processing': return 'text-purple-400 bg-purple-500/20';
      default: return 'text-blue-200 bg-blue-500/20';
    }
  };

  const getWorkflowStepStatus = (step: WorkflowStep) => {
    switch (step.status) {
      case 'completed': return { icon: CheckCircle, color: 'text-green-400' };
      case 'in_progress': return { icon: Bot, color: 'text-blue-400 animate-pulse' };
      case 'failed': return { icon: AlertTriangle, color: 'text-red-400' };
      default: return { icon: Clock, color: 'text-gray-400' };
    }
  };

  const filteredFilings = filings.filter(filing => 
    filterStatus === 'all' || filing.status === filterStatus
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Tax Filing Workflow</h1>
          <p className="text-blue-200">Monitor and manage automated tax filing processes</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="all">All Filings</option>
            <option value="processing">Processing</option>
            <option value="review_required">Review Required</option>
            <option value="filing_in_progress">Filing in Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Workflow Overview */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Workflow Steps</h3>
        <div className="flex items-center justify-between">
          {workflowSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border-2 border-white/20">
                    <Icon className="w-6 h-6 text-blue-300" />
                  </div>
                  <span className="text-blue-200 text-sm mt-2 text-center max-w-20">
                    {step.name}
                  </span>
                </div>
                {index < workflowSteps.length - 1 && (
                  <div className="flex-1 h-0.5 bg-white/20 mx-4 min-w-16" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Filing List */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Active Filings</h3>
          <div className="space-y-4">
            {filteredFilings.map((filing) => {
              const StatusIcon = getStatusIcon(filing.status);
              const statusColor = getStatusColor(filing.status);
              
              return (
                <div
                  key={filing.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedFiling?.id === filing.id
                      ? 'bg-white/15 border-blue-400'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                  onClick={() => setSelectedFiling(filing)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-white font-medium">
                        Client ID: {filing.clientId} • {filing.filingType.toUpperCase()}
                      </h4>
                      <p className="text-blue-200 text-sm">AY {filing.assessmentYear}</p>
                    </div>
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${statusColor}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span className="text-xs font-medium capitalize">
                        {filing.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-blue-200">Taxable Income:</span>
                      <span className="text-white ml-2">₹{filing.taxableIncome.toLocaleString('en-IN')}</span>
                    </div>
                    <div>
                      <span className="text-blue-200">Tax Liability:</span>
                      <span className="text-white ml-2">₹{filing.taxLiability.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  
                  {filing.refundAmount && (
                    <div className="mt-2 text-sm">
                      <span className="text-blue-200">Refund Amount:</span>
                      <span className="text-green-400 ml-2 font-medium">
                        ₹{filing.refundAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Workflow Details */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Workflow Details</h3>
            {selectedFiling && (
              <div className="flex items-center space-x-2">
                <button className="p-2 text-blue-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                  <Play className="w-4 h-4" />
                </button>
                <button className="p-2 text-blue-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                  <Pause className="w-4 h-4" />
                </button>
                <button className="p-2 text-blue-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          
          {selectedFiling ? (
            <div className="space-y-4">
              {selectedFiling.workflow.map((step, index) => {
                const { icon: StepIcon, color } = getWorkflowStepStatus(step);
                
                return (
                  <div key={step.id} className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg bg-white/10 ${color}`}>
                      <StepIcon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-white font-medium">{step.name}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${color} bg-white/10`}>
                          {step.status.replace('_', ' ')}
                        </span>
                      </div>
                      
                      {step.automationBot && (
                        <p className="text-blue-200 text-sm mb-1">
                          <Bot className="w-3 h-3 inline mr-1" />
                          {step.automationBot}
                        </p>
                      )}
                      
                      <div className="text-xs text-blue-300 space-y-1">
                        {step.startedAt && (
                          <p>Started: {step.startedAt.toLocaleString('en-IN')}</p>
                        )}
                        {step.completedAt && (
                          <p>Completed: {step.completedAt.toLocaleString('en-IN')}</p>
                        )}
                        {step.notes && (
                          <p className="text-yellow-300">Note: {step.notes}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/20">
                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                    <span>Review Details</span>
                  </button>
                  <button className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
                    <CheckCircle className="w-4 h-4" />
                    <span>Approve</span>
                  </button>
                  <button className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg border border-white/20 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-blue-200 mx-auto mb-4" />
              <p className="text-blue-200">Select a filing to view workflow details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}