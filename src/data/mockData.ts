// Mock data for development and testing
import { Client, Filing, User, DashboardStats, Notification } from '../types';

export const mockUser: User = {
  id: '1',
  email: 'ca.sharma@quantumca.in',
  name: 'Rajesh Sharma',
  role: 'ca',
  firm: 'Sharma & Associates',
  phone: '+91 98765 43210',
  avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  isActive: true,
  lastLogin: new Date('2024-01-15T09:30:00Z'),
  permissions: ['read:clients', 'write:clients', 'read:filings', 'write:filings']
};

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Priya Patel',
    pan: 'ABCDE1234F',
    aadhaar: '1234 5678 9012',
    email: 'priya.patel@email.com',
    phone: '+91 98765 12345',
    address: {
      street: '123 MG Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      country: 'India'
    },
    documents: [
      {
        id: '1',
        name: 'Form 16 - 2023-24',
        type: 'form16',
        url: '/documents/form16_priya.pdf',
        uploadedAt: new Date('2024-01-10T10:00:00Z'),
        status: 'processed'
      }
    ],
    filings: [],
    status: 'active',
    createdAt: new Date('2023-12-01T00:00:00Z'),
    updatedAt: new Date('2024-01-15T00:00:00Z')
  },
  {
    id: '2',
    name: 'Amit Kumar',
    pan: 'FGHIJ5678K',
    email: 'amit.kumar@email.com',
    phone: '+91 87654 32109',
    address: {
      street: '456 Park Street',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
      country: 'India'
    },
    documents: [],
    filings: [],
    status: 'active',
    createdAt: new Date('2024-01-05T00:00:00Z'),
    updatedAt: new Date('2024-01-15T00:00:00Z')
  }
];

export const mockFilings: Filing[] = [
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
        name: 'Document Collection',
        status: 'completed',
        startedAt: new Date('2024-01-10T10:00:00Z'),
        completedAt: new Date('2024-01-10T11:30:00Z'),
        automationBot: 'DocumentIntakeBot'
      },
      {
        id: '2',
        name: 'Data Processing',
        status: 'completed',
        startedAt: new Date('2024-01-10T11:30:00Z'),
        completedAt: new Date('2024-01-10T12:15:00Z'),
        automationBot: 'DataProcessingBot'
      },
      {
        id: '3',
        name: 'Tax Computation',
        status: 'completed',
        startedAt: new Date('2024-01-10T12:15:00Z'),
        completedAt: new Date('2024-01-10T12:45:00Z'),
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
  }
];

export const mockStats: DashboardStats = {
  totalClients: 247,
  activeFilings: 23,
  completedFilings: 156,
  pendingReviews: 8,
  totalRefunds: 2450000,
  monthlyRevenue: 185000,
  automationSavings: 720
};

export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    title: 'Filing Ready for Review',
    message: 'ITR-1 for Priya Patel (AY 2023-24) is ready for your review',
    type: 'info',
    read: false,
    createdAt: new Date('2024-01-15T09:00:00Z'),
    actionUrl: '/filings/1'
  },
  {
    id: '2',
    userId: '1',
    title: 'Document Processing Complete',
    message: 'Form 16 for Amit Kumar has been successfully processed',
    type: 'success',
    read: false,
    createdAt: new Date('2024-01-15T08:30:00Z')
  },
  {
    id: '3',
    userId: '1',
    title: 'Portal Maintenance Alert',
    message: 'Income Tax Portal will be under maintenance from 2 AM to 4 AM',
    type: 'warning',
    read: true,
    createdAt: new Date('2024-01-14T18:00:00Z')
  }
];