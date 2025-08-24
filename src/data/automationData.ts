// Mock data for RPA Bots and Automation
import { RPABot, BotExecution, BotLog, DocumentTemplate } from '../types/automation';

export const mockRPABots: RPABot[] = [
  {
    id: 'bot-001',
    name: 'Document Intake Bot',
    type: 'data_intake',
    status: 'running',
    version: '2.1.3',
    description: 'Automatically processes uploaded documents using OCR and extracts structured data',
    capabilities: [
      'PDF text extraction',
      'Image OCR processing',
      'Form 16 data extraction',
      'Bank statement parsing',
      'Investment proof categorization'
    ],
    lastRun: new Date('2024-01-15T10:30:00Z'),
    nextScheduledRun: new Date('2024-01-15T14:00:00Z'),
    successRate: 94.5,
    totalRuns: 1247,
    averageRunTime: 3.2,
    configuration: {
      autoStart: true,
      retryAttempts: 3,
      timeoutMinutes: 10,
      notifyOnError: true,
      notifyOnSuccess: false,
      scheduleEnabled: true,
      schedulePattern: '0 */4 * * *', // Every 4 hours
      inputSources: ['upload_folder', 'email_attachments'],
      outputDestinations: ['database', 'processed_folder']
    },
    logs: []
  },
  {
    id: 'bot-002',
    name: 'Tax Computation Engine',
    type: 'tax_computation',
    status: 'idle',
    version: '3.0.1',
    description: 'Calculates tax liability, deductions, and refunds based on extracted data',
    capabilities: [
      'Income tax calculation',
      'Deduction optimization',
      'TDS computation',
      'Refund calculation',
      'Tax saving suggestions'
    ],
    lastRun: new Date('2024-01-15T09:15:00Z'),
    successRate: 98.2,
    totalRuns: 892,
    averageRunTime: 1.8,
    configuration: {
      autoStart: false,
      retryAttempts: 2,
      timeoutMinutes: 5,
      notifyOnError: true,
      notifyOnSuccess: true,
      scheduleEnabled: false,
      inputSources: ['processed_data'],
      outputDestinations: ['tax_calculations', 'review_queue']
    },
    logs: []
  },
  {
    id: 'bot-003',
    name: 'Portal Navigator',
    type: 'portal_navigation',
    status: 'paused',
    version: '1.8.7',
    description: 'Navigates income tax portal, handles login, and form submissions',
    capabilities: [
      'Portal login automation',
      'Form selection and navigation',
      'Data entry automation',
      'Captcha handling',
      'Session management'
    ],
    lastRun: new Date('2024-01-14T16:45:00Z'),
    successRate: 87.3,
    totalRuns: 456,
    averageRunTime: 8.5,
    configuration: {
      autoStart: false,
      retryAttempts: 5,
      timeoutMinutes: 15,
      notifyOnError: true,
      notifyOnSuccess: true,
      scheduleEnabled: false,
      inputSources: ['filing_queue'],
      outputDestinations: ['portal_responses', 'acknowledgments']
    },
    logs: []
  },
  {
    id: 'bot-004',
    name: 'E-Verification Bot',
    type: 'verification',
    status: 'idle',
    version: '2.3.2',
    description: 'Handles OTP verification and e-filing confirmation',
    capabilities: [
      'OTP retrieval from email/SMS',
      'E-verification automation',
      'Acknowledgment download',
      'Status tracking',
      'Retry logic for failed verifications'
    ],
    lastRun: new Date('2024-01-15T08:20:00Z'),
    successRate: 91.7,
    totalRuns: 234,
    averageRunTime: 2.1,
    configuration: {
      autoStart: true,
      retryAttempts: 3,
      timeoutMinutes: 8,
      notifyOnError: true,
      notifyOnSuccess: true,
      scheduleEnabled: false,
      inputSources: ['filed_returns'],
      outputDestinations: ['verified_returns', 'client_notifications']
    },
    logs: []
  }
];

export const mockBotExecutions: BotExecution[] = [
  {
    id: 'exec-001',
    botId: 'bot-001',
    startTime: new Date('2024-01-15T10:30:00Z'),
    endTime: new Date('2024-01-15T10:33:12Z'),
    status: 'completed',
    progress: 100,
    currentStep: 'Data validation complete',
    totalSteps: 5,
    metrics: {
      documentsProcessed: 12,
      dataPointsExtracted: 156,
      accuracyScore: 96.8,
      processingTimeMs: 192000,
      memoryUsageMB: 245
    }
  },
  {
    id: 'exec-002',
    botId: 'bot-002',
    startTime: new Date('2024-01-15T11:15:00Z'),
    status: 'running',
    progress: 65,
    currentStep: 'Computing deductions',
    totalSteps: 8,
    metrics: {
      documentsProcessed: 0,
      dataPointsExtracted: 0,
      accuracyScore: 0,
      processingTimeMs: 0,
      memoryUsageMB: 128
    }
  }
];

export const mockDocumentTemplates: DocumentTemplate[] = [
  {
    id: 'template-form16',
    name: 'Form 16 Template',
    type: 'form16',
    fields: [
      {
        name: 'employeeName',
        type: 'text',
        required: true,
        description: 'Employee Name',
        extractionHints: ['name of employee', 'employee name', 'name']
      },
      {
        name: 'pan',
        type: 'pan',
        required: true,
        pattern: '[A-Z]{5}[0-9]{4}[A-Z]{1}',
        description: 'PAN Number',
        extractionHints: ['pan', 'permanent account number']
      },
      {
        name: 'grossSalary',
        type: 'currency',
        required: true,
        description: 'Gross Salary',
        extractionHints: ['gross salary', 'total salary', 'gross income']
      },
      {
        name: 'tdsDeducted',
        type: 'currency',
        required: true,
        description: 'TDS Deducted',
        extractionHints: ['tds', 'tax deducted', 'deducted tax']
      }
    ],
    validationRules: [
      {
        field: 'pan',
        rule: 'format',
        parameters: { pattern: '[A-Z]{5}[0-9]{4}[A-Z]{1}' },
        errorMessage: 'Invalid PAN format'
      },
      {
        field: 'grossSalary',
        rule: 'range',
        parameters: { min: 0, max: 10000000 },
        errorMessage: 'Gross salary must be between 0 and 1 crore'
      }
    ],
    ocrSettings: {
      language: 'en',
      dpi: 300,
      preprocessingSteps: ['deskew', 'noise_removal', 'contrast_enhancement'],
      confidenceThreshold: 0.8
    }
  }
];