import React, { useState } from 'react';
import { 
  Bot, 
  Play, 
  Pause, 
  Square, 
  Settings, 
  Activity, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  BarChart3,
  Zap,
  RefreshCw,
  Eye,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { RPABot, BotExecution } from '../types/automation';
import { mockRPABots, mockBotExecutions } from '../data/automationData';

export default function RPABotManagement() {
  const [selectedBot, setSelectedBot] = useState<RPABot | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'logs' | 'config'>('overview');

  const getBotStatusIcon = (status: RPABot['status']) => {
    switch (status) {
      case 'running': return { icon: Play, color: 'text-green-400' };
      case 'idle': return { icon: Pause, color: 'text-blue-400' };
      case 'paused': return { icon: Pause, color: 'text-yellow-400' };
      case 'error': return { icon: AlertTriangle, color: 'text-red-400' };
      case 'maintenance': return { icon: Settings, color: 'text-gray-400' };
      default: return { icon: Bot, color: 'text-blue-200' };
    }
  };

  const getBotTypeColor = (type: RPABot['type']) => {
    const colors = {
      'data_intake': 'bg-blue-500/20 text-blue-300',
      'preprocessing': 'bg-purple-500/20 text-purple-300',
      'tax_computation': 'bg-green-500/20 text-green-300',
      'portal_navigation': 'bg-yellow-500/20 text-yellow-300',
      'filing': 'bg-red-500/20 text-red-300',
      'verification': 'bg-indigo-500/20 text-indigo-300',
      'reporting': 'bg-pink-500/20 text-pink-300'
    };
    return colors[type] || 'bg-gray-500/20 text-gray-300';
  };

  const handleBotAction = (botId: string, action: 'start' | 'pause' | 'stop') => {
    console.log(`${action} bot ${botId}`);
    // Implement bot control logic here
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">RPA Bot Management</h1>
          <p className="text-blue-200">Monitor and control your automation workforce</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 border border-white/20">
            <Activity className="w-5 h-5 text-green-400" />
            <span className="text-white text-sm font-medium">
              {mockRPABots.filter(bot => bot.status === 'running').length} Active
            </span>
          </div>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200">
            Deploy New Bot
          </button>
        </div>
      </div>

      {/* Bot Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockRPABots.map((bot) => {
          const { icon: StatusIcon, color: statusColor } = getBotStatusIcon(bot.status);
          const typeColor = getBotTypeColor(bot.type);
          
          return (
            <div
              key={bot.id}
              className={`bg-white/10 backdrop-blur-md rounded-xl border p-6 cursor-pointer transition-all duration-200 ${
                selectedBot?.id === bot.id
                  ? 'border-blue-400 bg-white/15'
                  : 'border-white/20 hover:bg-white/15'
              }`}
              onClick={() => setSelectedBot(bot)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{bot.name}</h3>
                    <p className="text-blue-200 text-sm">v{bot.version}</p>
                  </div>
                </div>
                <div className={`flex items-center space-x-1 ${statusColor}`}>
                  <StatusIcon className={`w-4 h-4 ${bot.status === 'running' ? 'animate-pulse' : ''}`} />
                  <span className="text-xs font-medium capitalize">{bot.status}</span>
                </div>
              </div>

              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${typeColor}`}>
                {bot.type.replace('_', ' ').toUpperCase()}
              </div>

              <p className="text-blue-200 text-sm mb-4 line-clamp-2">{bot.description}</p>

              {/* Bot Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-white font-semibold">{bot.successRate}%</p>
                  <p className="text-blue-200 text-xs">Success Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-white font-semibold">{bot.totalRuns}</p>
                  <p className="text-blue-200 text-xs">Total Runs</p>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center space-x-2">
                {bot.status === 'idle' || bot.status === 'paused' ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBotAction(bot.id, 'start');
                    }}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                  >
                    <Play className="w-3 h-3" />
                    <span>Start</span>
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBotAction(bot.id, 'pause');
                    }}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                  >
                    <Pause className="w-3 h-3" />
                    <span>Pause</span>
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBotAction(bot.id, 'stop');
                  }}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                >
                  <Square className="w-3 h-3" />
                  <span>Stop</span>
                </button>
              </div>

              {/* Last Run Info */}
              {bot.lastRun && (
                <div className="mt-3 pt-3 border-t border-white/20 text-xs text-blue-300">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>Last run: {bot.lastRun.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center space-x-1 mt-1">
                    <Zap className="w-3 h-3" />
                    <span>Avg time: {bot.averageRunTime}min</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bot Details Panel */}
      {selectedBot && (
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{selectedBot.name}</h2>
                <p className="text-blue-200">Version {selectedBot.version} • {selectedBot.type.replace('_', ' ')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-blue-500 text-white'
                    : 'text-blue-200 hover:text-white hover:bg-white/10'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('logs')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'logs'
                    ? 'bg-blue-500 text-white'
                    : 'text-blue-200 hover:text-white hover:bg-white/10'
                }`}
              >
                Logs
              </button>
              <button
                onClick={() => setActiveTab('config')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'config'
                    ? 'bg-blue-500 text-white'
                    : 'text-blue-200 hover:text-white hover:bg-white/10'
                }`}
              >
                Configuration
              </button>
            </div>
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 font-medium">Success Rate</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{selectedBot.successRate}%</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center space-x-2 mb-2">
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                    <span className="text-blue-400 font-medium">Total Runs</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{selectedBot.totalRuns}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-400 font-medium">Avg Runtime</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{selectedBot.averageRunTime}min</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center space-x-2 mb-2">
                    <Activity className="w-5 h-5 text-purple-400" />
                    <span className="text-purple-400 font-medium">Status</span>
                  </div>
                  <p className="text-2xl font-bold text-white capitalize">{selectedBot.status}</p>
                </div>
              </div>

              {/* Capabilities */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Capabilities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedBot.capabilities.map((capability, index) => (
                    <div key={index} className="flex items-center space-x-2 text-blue-200">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>{capability}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Executions */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Recent Executions</h3>
                <div className="space-y-3">
                  {mockBotExecutions
                    .filter(exec => exec.botId === selectedBot.id)
                    .map((execution) => (
                      <div key={execution.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${
                              execution.status === 'completed' ? 'bg-green-400' :
                              execution.status === 'running' ? 'bg-blue-400 animate-pulse' :
                              execution.status === 'failed' ? 'bg-red-400' : 'bg-gray-400'
                            }`} />
                            <span className="text-white font-medium">Execution {execution.id}</span>
                          </div>
                          <span className="text-blue-200 text-sm">
                            {execution.startTime.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-blue-200">Progress:</span>
                            <span className="text-white ml-2">{execution.progress}%</span>
                          </div>
                          <div>
                            <span className="text-blue-200">Step:</span>
                            <span className="text-white ml-2">{execution.currentStep}</span>
                          </div>
                          <div>
                            <span className="text-blue-200">Docs Processed:</span>
                            <span className="text-white ml-2">{execution.metrics.documentsProcessed}</span>
                          </div>
                          <div>
                            <span className="text-blue-200">Accuracy:</span>
                            <span className="text-white ml-2">{execution.metrics.accuracyScore}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Bot Logs</h3>
                <button className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors">
                  <RefreshCw className="w-4 h-4" />
                  <span>Refresh</span>
                </button>
              </div>
              <div className="bg-black/30 rounded-lg p-4 font-mono text-sm max-h-96 overflow-y-auto">
                <div className="space-y-2">
                  <div className="text-green-400">[2024-01-15 10:30:15] INFO: Bot started successfully</div>
                  <div className="text-blue-400">[2024-01-15 10:30:16] INFO: Processing document batch #1247</div>
                  <div className="text-blue-400">[2024-01-15 10:30:18] INFO: OCR processing initiated for 12 documents</div>
                  <div className="text-green-400">[2024-01-15 10:32:45] SUCCESS: Extracted 156 data points with 96.8% confidence</div>
                  <div className="text-blue-400">[2024-01-15 10:33:12] INFO: Data validation completed</div>
                  <div className="text-green-400">[2024-01-15 10:33:12] SUCCESS: Execution completed successfully</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'config' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">General Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-200">Auto Start</span>
                      <div className={`w-12 h-6 rounded-full p-1 transition-colors ${
                        selectedBot.configuration.autoStart ? 'bg-green-500' : 'bg-gray-600'
                      }`}>
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          selectedBot.configuration.autoStart ? 'translate-x-6' : 'translate-x-0'
                        }`} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-200">Retry Attempts</span>
                      <span className="text-white">{selectedBot.configuration.retryAttempts}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-200">Timeout (minutes)</span>
                      <span className="text-white">{selectedBot.configuration.timeoutMinutes}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-200">Notify on Error</span>
                      <div className={`w-12 h-6 rounded-full p-1 transition-colors ${
                        selectedBot.configuration.notifyOnError ? 'bg-green-500' : 'bg-gray-600'
                      }`}>
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          selectedBot.configuration.notifyOnError ? 'translate-x-6' : 'translate-x-0'
                        }`} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-200">Notify on Success</span>
                      <div className={`w-12 h-6 rounded-full p-1 transition-colors ${
                        selectedBot.configuration.notifyOnSuccess ? 'bg-green-500' : 'bg-gray-600'
                      }`}>
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          selectedBot.configuration.notifyOnSuccess ? 'translate-x-6' : 'translate-x-0'
                        }`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Input Sources</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedBot.configuration.inputSources.map((source, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                      {source}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Output Destinations</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedBot.configuration.outputDestinations.map((destination, index) => (
                    <span key={index} className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                      {destination}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/20">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  Save Configuration
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}