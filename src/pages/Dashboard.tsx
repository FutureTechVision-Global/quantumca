import React from 'react';
import { 
  Users, 
  FileText, 
  Clock, 
  CheckCircle, 
  IndianRupee, 
  TrendingUp,
  Bot,
  AlertTriangle
} from 'lucide-react';
import StatsCard from '../components/Dashboard/StatsCard';
import RecentActivity from '../components/Dashboard/RecentActivity';
import FilingProgress from '../components/Dashboard/FilingProgress';
import { DashboardStats } from '../types';

interface DashboardProps {
  stats: DashboardStats;
}

export default function Dashboard({ stats }: DashboardProps) {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, Rajesh! 👋
        </h1>
        <p className="text-blue-200">
          Here's what's happening with your tax filing operations today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Clients"
          value={stats.totalClients}
          change="+12 this month"
          changeType="positive"
          icon={Users}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatsCard
          title="Active Filings"
          value={stats.activeFilings}
          change="+5 today"
          changeType="positive"
          icon={FileText}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
        />
        <StatsCard
          title="Pending Reviews"
          value={stats.pendingReviews}
          change="-3 from yesterday"
          changeType="positive"
          icon={AlertTriangle}
          color="bg-gradient-to-br from-yellow-500 to-orange-500"
        />
        <StatsCard
          title="Completed Filings"
          value={stats.completedFilings}
          change="+23 this week"
          changeType="positive"
          icon={CheckCircle}
          color="bg-gradient-to-br from-green-500 to-green-600"
        />
      </div>

      {/* Revenue & Automation Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Monthly Revenue"
          value={`₹${(stats.monthlyRevenue / 1000).toFixed(0)}K`}
          change="+18% from last month"
          changeType="positive"
          icon={IndianRupee}
          color="bg-gradient-to-br from-emerald-500 to-teal-600"
        />
        <StatsCard
          title="Total Refunds Processed"
          value={`₹${(stats.totalRefunds / 100000).toFixed(1)}L`}
          change="+₹2.5L this month"
          changeType="positive"
          icon={TrendingUp}
          color="bg-gradient-to-br from-cyan-500 to-blue-600"
        />
        <StatsCard
          title="Automation Time Saved"
          value={`${stats.automationSavings}h`}
          change="70% efficiency gain"
          changeType="positive"
          icon={Bot}
          color="bg-gradient-to-br from-violet-500 to-purple-600"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FilingProgress />
        <RecentActivity />
      </div>

      {/* Quick Actions */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-all duration-200 group">
            <Users className="w-6 h-6 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-white text-sm font-medium">Add Client</p>
          </button>
          <button className="p-4 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-all duration-200 group">
            <FileText className="w-6 h-6 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-white text-sm font-medium">New Filing</p>
          </button>
          <button className="p-4 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-all duration-200 group">
            <Bot className="w-6 h-6 text-green-400 mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-white text-sm font-medium">Run Bot</p>
          </button>
          <button className="p-4 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-all duration-200 group">
            <TrendingUp className="w-6 h-6 text-yellow-400 mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-white text-sm font-medium">View Reports</p>
          </button>
        </div>
      </div>
    </div>
  );
}