// RPA Bot and Automation Types
export interface RPABot {
  id: string;
  name: string;
  type: 'data_intake' | 'preprocessing' | 'tax_computation' | 'portal_navigation' | 'filing' | 'verification' | 'reporting';
  status: 'idle' | 'running' | 'paused' | 'error' | 'maintenance';
  version: string;
  description: string;
  capabilities: string[];
  lastRun?: Date;
  nextScheduledRun?: Date;
  successRate: number;
  totalRuns: number;
  averageRunTime: number; // in minutes
  configuration: BotConfiguration;
  logs: BotLog[];
}

export interface BotConfiguration {
  autoStart: boolean;
  retryAttempts: number;
  timeoutMinutes: number;
  notifyOnError: boolean;
  notifyOnSuccess: boolean;
  scheduleEnabled: boolean;
  schedulePattern?: string; // cron pattern
  inputSources: string[];
  outputDestinations: string[];
}

export interface BotLog {
  id: string;
  botId: string;
  timestamp: Date;
  level: 'info' | 'warning' | 'error' | 'success';
  message: string;
  details?: any;
  executionId?: string;
}

export interface BotExecution {
  id: string;
  botId: string;
  startTime: Date;
  endTime?: Date;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  progress: number;
  currentStep: string;
  totalSteps: number;
  inputData?: any;
  outputData?: any;
  errorMessage?: string;
  metrics: ExecutionMetrics;
}

export interface ExecutionMetrics {
  documentsProcessed: number;
  dataPointsExtracted: number;
  accuracyScore: number;
  processingTimeMs: number;
  memoryUsageMB: number;
}

// OCR and Document Processing Types
export interface OCRResult {
  id: string;
  documentId: string;
  confidence: number;
  extractedText: string;
  structuredData: any;
  boundingBoxes: BoundingBox[];
  processingTime: number;
  ocrEngine: 'azure_form_recognizer' | 'google_vision' | 'tesseract';
  status: 'processing' | 'completed' | 'failed';
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
  confidence: number;
}

export interface DocumentTemplate {
  id: string;
  name: string;
  type: 'form16' | 'salary_slip' | 'bank_statement' | 'investment_proof' | 'itr_form';
  fields: TemplateField[];
  validationRules: ValidationRule[];
  ocrSettings: OCRSettings;
}

export interface TemplateField {
  name: string;
  type: 'text' | 'number' | 'date' | 'currency' | 'pan' | 'aadhaar';
  required: boolean;
  pattern?: string;
  description: string;
  extractionHints: string[];
}

export interface ValidationRule {
  field: string;
  rule: 'required' | 'format' | 'range' | 'custom';
  parameters: any;
  errorMessage: string;
}

export interface OCRSettings {
  language: string;
  dpi: number;
  preprocessingSteps: string[];
  confidenceThreshold: number;
}