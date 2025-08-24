import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Upload, 
  BarChart3, 
  Bell, 
  Settings,
  Shield,
  Bot,
  IndianRupee
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'clients', label: 'Client Management', icon: Users },
  { id: 'intake', label: 'Document Intake', icon: Upload },
  { id: 'filings', label: 'Tax Filings', icon: FileText },
  { id: 'automation', label: 'RPA Bots', icon: Bot },
  { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
  { id: 'billing', label: 'Billing & Revenue', icon: IndianRupee },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'audit', label: 'Audit Logs', icon: Shield },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="w-64 bg-white/10 backdrop-blur-md border-r border-white/20 h-full">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">QuantumCA™</h1>
            <p className="text-xs text-blue-200">AI-Powered Tax Filing</p>
          </div>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}