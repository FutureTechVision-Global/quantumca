import React, { useState, useCallback } from 'react';
import { 
  Upload, 
  FileText, 
  Image, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Eye,
  Download,
  Trash2,
  RefreshCw,
  Bot,
  Zap
} from 'lucide-react';
import { Document, Client } from '../types';

interface DocumentIntakeProps {
  clients: Client[];
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  clientId?: string;
  documentType?: string;
  extractedData?: any;
  ocrConfidence?: number;
  processingTime?: number;
}

export default function DocumentIntake({ clients }: DocumentIntakeProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [documentType, setDocumentType] = useState<string>('');
  const [dragActive, setDragActive] = useState(false);

  const documentTypes = [
    { value: 'form16', label: 'Form 16', icon: FileText },
    { value: 'salary_slip', label: 'Salary Slip', icon: FileText },
    { value: 'bank_statement', label: 'Bank Statement', icon: FileText },
    { value: 'investment_proof', label: 'Investment Proof', icon: FileText },
    { value: 'other', label: 'Other Document', icon: FileText }
  ];

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleFiles = (files: File[]) => {
    files.forEach(file => {
      const newFile: UploadedFile = {
        id: `file-${Date.now()}-${Math.random()}`,
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading',
        progress: 0,
        clientId: selectedClient,
        documentType: documentType
      };

      setUploadedFiles(prev => [...prev, newFile]);

      // Simulate upload and processing
      simulateFileProcessing(newFile.id);
    });
  };

  const simulateFileProcessing = (fileId: string) => {
    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadedFiles(prev => prev.map(file => {
        if (file.id === fileId && file.status === 'uploading') {
          const newProgress = Math.min(file.progress + 10, 100);
          if (newProgress === 100) {
            clearInterval(uploadInterval);
            // Start OCR processing
            setTimeout(() => {
              setUploadedFiles(prev => prev.map(f => 
                f.id === fileId ? { ...f, status: 'processing', progress: 0 } : f
              ));
              simulateOCRProcessing(fileId);
            }, 500);
            return { ...file, progress: newProgress, status: 'processing' };
          }
          return { ...file, progress: newProgress };
        }
        return file;
      }));
    }, 200);
  };

  const simulateOCRProcessing = (fileId: string) => {
    const processingInterval = setInterval(() => {
      setUploadedFiles(prev => prev.map(file => {
        if (file.id === fileId && file.status === 'processing') {
          const newProgress = Math.min(file.progress + 15, 100);
          if (newProgress === 100) {
            clearInterval(processingInterval);
            // Complete processing with mock data
            return {
              ...file,
              progress: newProgress,
              status: 'completed',
              ocrConfidence: 94.5,
              processingTime: 3.2,
              extractedData: {
                employeeName: 'Priya Patel',
                pan: 'ABCDE1234F',
                grossSalary: 850000,
                tdsDeducted: 85000
              }
            };
          }
          return { ...file, progress: newProgress };
        }
        return file;
      }));
    }, 300);
  };

  const getStatusIcon = (status: UploadedFile['status']) => {
    switch (status) {
      case 'uploading': return Clock;
      case 'processing': return RefreshCw;
      case 'completed': return CheckCircle;
      case 'error': return AlertCircle;
      default: return FileText;
    }
  };

  const getStatusColor = (status: UploadedFile['status']) => {
    switch (status) {
      case 'uploading': return 'text-blue-400';
      case 'processing': return 'text-yellow-400';
      case 'completed': return 'text-green-400';
      case 'error': return 'text-red-400';
      default: return 'text-blue-200';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Document Intake Hub</h1>
          <p className="text-blue-200">Upload and process client documents with AI-powered OCR</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 border border-white/20">
            <Bot className="w-5 h-5 text-green-400" />
            <span className="text-white text-sm font-medium">OCR Bot Active</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 border border-white/20">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-white text-sm font-medium">94.5% Accuracy</span>
          </div>
        </div>
      </div>

      {/* Upload Configuration */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Upload Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-blue-200 text-sm font-medium mb-2">Select Client</label>
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Choose a client...</option>
              {clients.map(client => (
                <option key={client.id} value={client.id} className="bg-gray-800">
                  {client.name} ({client.pan})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-blue-200 text-sm font-medium mb-2">Document Type</label>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select document type...</option>
              {documentTypes.map(type => (
                <option key={type.value} value={type.value} className="bg-gray-800">
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
          dragActive
            ? 'border-blue-400 bg-blue-500/10'
            : 'border-white/30 bg-white/5 hover:bg-white/10'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
          onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
            <Upload className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Drop files here or click to upload
            </h3>
            <p className="text-blue-200">
              Supports PDF, Images, Word, Excel files up to 10MB each
            </p>
          </div>
          <div className="flex items-center justify-center space-x-6 text-sm text-blue-300">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>PDF</span>
            </div>
            <div className="flex items-center space-x-2">
              <Image className="w-4 h-4" />
              <span>Images</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Documents</span>
            </div>
          </div>
        </div>
      </div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Processing Queue</h3>
          <div className="space-y-4">
            {uploadedFiles.map((file) => {
              const StatusIcon = getStatusIcon(file.status);
              const statusColor = getStatusColor(file.status);
              
              return (
                <div key={file.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-white/10 ${statusColor}`}>
                        <StatusIcon className={`w-5 h-5 ${file.status === 'processing' ? 'animate-spin' : ''}`} />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{file.name}</h4>
                        <p className="text-blue-200 text-sm">
                          {formatFileSize(file.size)} • {file.documentType || 'Unknown type'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {file.status === 'completed' && (
                        <>
                          <button className="p-2 text-blue-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-blue-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button className="p-2 text-red-300 hover:text-red-200 hover:bg-red-500/10 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-blue-200 capitalize">
                        {file.status === 'uploading' ? 'Uploading' : 
                         file.status === 'processing' ? 'Processing with OCR' : 
                         file.status === 'completed' ? 'Completed' : 'Error'}
                      </span>
                      <span className="text-white">{file.progress}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-300"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Extracted Data Preview */}
                  {file.status === 'completed' && file.extractedData && (
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-white font-medium text-sm">Extracted Data</h5>
                        <div className="flex items-center space-x-4 text-xs">
                          <span className="text-green-400">
                            Confidence: {file.ocrConfidence}%
                          </span>
                          <span className="text-blue-300">
                            Time: {file.processingTime}s
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        {Object.entries(file.extractedData).map(([key, value]) => (
                          <div key={key}>
                            <span className="text-blue-200 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}:
                            </span>
                            <span className="text-white ml-2">{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}