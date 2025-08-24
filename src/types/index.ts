// Core type definitions for QuantumCA™ platform
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'ca' | 'staff' | 'client';
  firm?: string;
  phone?: string;
  avatar?: string;
  isActive: boolean;
  lastLogin?: Date;
  permissions: string[];
}

export interface Client {
  id: string;
  name: string;
  pan: string;
  aadhaar?: string;
  email: string;
  phone: string;
  address: Address;
  bankDetails?: BankDetails;
  documents: Document[];
  filings: Filing[];
  status: 'active' | 'inactive' | 'pending';
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface BankDetails {
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  accountType: 'savings' | 'current';
}

export interface Document {
  id: string;
  name: string;
  type: 'form16' | 'salary_slip' | 'bank_statement' | 'investment_proof' | 'other';
  url: string;
  uploadedAt: Date;
  status: 'uploaded' | 'processing' | 'processed' | 'error';
  extractedData?: any;
}

export interface Filing {
  id: string;
  clientId: string;
  assessmentYear: string;
  filingType: 'itr1' | 'itr2' | 'itr3' | 'itr4';
  status: FilingStatus;
  taxableIncome: number;
  taxLiability: number;
  refundAmount?: number;
  filedDate?: Date;
  acknowledgmentNumber?: string;
  verificationStatus: 'pending' | 'verified' | 'failed';
  createdAt: Date;
  updatedAt: Date;
  workflow: WorkflowStep[];
}

export type FilingStatus = 
  | 'draft' 
  | 'data_collection' 
  | 'processing' 
  | 'review_required' 
  | 'ready_to_file' 
  | 'filing_in_progress' 
  | 'filed' 
  | 'verified' 
  | 'completed';

export interface WorkflowStep {
  id: string;
  name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  startedAt?: Date;
  completedAt?: Date;
  notes?: string;
  automationBot?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  details: any;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
}

export interface Subscription {
  id: string;
  planName: 'starter' | 'growth' | 'enterprise';
  filingLimit: number;
  currentFilings: number;
  price: number;
  billingCycle: 'monthly' | 'annual';
  status: 'active' | 'cancelled' | 'expired';
  nextBillingDate: Date;
}

export interface DashboardStats {
  totalClients: number;
  activeFilings: number;
  completedFilings: number;
  pendingReviews: number;
  totalRefunds: number;
  monthlyRevenue: number;
  automationSavings: number;
}