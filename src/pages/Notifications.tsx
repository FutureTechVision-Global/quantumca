import React, { useState } from 'react';
import { Bell, CheckCircle, AlertTriangle, Info, X, Settings, Filter, AreaChart as MarkAsUnread, Trash2, Clock, User, FileText, Bot, CreditCard } from 'lucide-react';
import { Notification } from '../types';

interface ExtendedNotification extends Notification {
  category: 'system' | 'client' | 'filing' | 'payment' | 'automation';
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

const mockNotifications: ExtendedNotification[] = [
  {
    id: '1',
    userId: '1',
    title: 'Filing Ready for Review',
    message: 'ITR-1 for Priya Patel (AY 2023-24) is ready for your review. All automated checks have passed.',
    type: 'info',
    category: 'filing',
    priority: 'high',
    read: false,
    createdAt: new Date('2024-01-15T09:00:00Z'),
    actionUrl: '/filings/1'
  },
  {
    id: '2',
    userId: '1',
    title: 'Payment Received',
    message: 'Payment of ₹5,000 received from Amit Kumar for Invoice INV-2024-002',
    type: 'success',
    category: 'payment',
    priority: 'medium',
    read: false,
    createdAt: new Date('2024-01-15T08:30:00Z')
  },
  {
    id: '3',
    userId: '1',
    title: 'Bot Processing Complete',
    message: 'Document Intake Bot has successfully processed 12 documents with 96.8% accuracy',
    type: 'success',
    category: 'automation',
    priority: 'low',
    read: true,
    createdAt: new Date('2024-01-15T08:00:00Z')
  },
  {
    id: '4',
    userId: '1',
    title: 'Portal Maintenance Alert',
    message: 'Income Tax Portal will be under maintenance from 2 AM to 4 AM tomorrow',
    type: 'warning',
    category: 'system',
    priority: 'medium',
    read: true,
    createdAt: new Date('2024-01-14T18:00:00Z')
  },
  {
    id: '5',
    userId: '1',
    title: 'New Client Registration',
    message: 'Sneha Gupta has been added to your client database and requires document upload',
    type: 'info',
    category: 'client',
    priority: 'low',
    read: false,
    createdAt: new Date('2024-01-14T16:30:00Z')
  },
  {
    id: '6',
    userId: '1',
    title: 'Filing Deadline Reminder',
    message: '5 clients have filings due within the next 7 days. Review pending items.',
    type: 'warning',
    category: 'filing',
    priority: 'urgent',
    read: false,
    createdAt: new Date('2024-01-14T14:00:00Z')
  },
  {
    id: '7',
    userId: '1',
    title: 'System Backup Complete',
    message: 'Daily system backup completed successfully. All data is secure.',
    type: 'success',
    category: 'system',
    priority: 'low',
    read: true,
    createdAt: new Date('2024-01-14T02:00:00Z')
  },
  {
    id: '8',
    userId: '1',
    title: 'Invoice Overdue',
    message: 'Invoice INV-2024-001 for Rahul Singh is now 5 days overdue (₹3,500)',
    type: 'error',
    category: 'payment',
    priority: 'high',
    read: false,
    createdAt: new Date('2024-01-13T10:00:00Z')
  }
];

export default function Notifications() {
  const [notifications, setNotifications] = useState<ExtendedNotification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const getNotificationIcon = (type: Notification['type'], category: ExtendedNotification['category']) => {
    if (category === 'automation') return Bot;
    if (category === 'client') return User;
    if (category === 'filing') return FileText;
    if (category === 'payment') return CreditCard;
    
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return AlertTriangle;
      default: return Info;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'text-green-400 bg-green-500/20';
      case 'warning': return 'text-yellow-400 bg-yellow-500/20';
      case 'error': return 'text-red-400 bg-red-500/20';
      default: return 'text-blue-400 bg-blue-500/20';
    }
  };

  const getPriorityColor = (priority: ExtendedNotification['priority']) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAsUnread = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: false } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'read' && !notif.read) return false;
    if (filter === 'unread' && notif.read) return false;
    if (categoryFilter !== 'all' && notif.category !== categoryFilter) return false;
    if (priorityFilter !== 'all' && notif.priority !== priorityFilter) return false;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Notifications</h1>
          <p className="text-blue-200">
            Stay updated with system alerts and important updates
            {unreadCount > 0 && (
              <span className="ml-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                {unreadCount} unread
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={markAllAsRead}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Mark All Read
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium border border-white/20 transition-colors">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-blue-200" />
            <span className="text-blue-200 text-sm font-medium">Filters:</span>
          </div>
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="all">All Notifications</option>
            <option value="unread">Unread Only</option>
            <option value="read">Read Only</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="all">All Categories</option>
            <option value="system">System</option>
            <option value="client">Client</option>
            <option value="filing">Filing</option>
            <option value="payment">Payment</option>
            <option value="automation">Automation</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 text-blue-200 mx-auto mb-4" />
              <h3 className="text-white text-lg font-medium mb-2">No notifications found</h3>
              <p className="text-blue-200">Try adjusting your filters or check back later</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type, notification.category);
              const colorClass = getNotificationColor(notification.type);
              const priorityColor = getPriorityColor(notification.priority);
              
              return (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border transition-all duration-200 ${
                    notification.read
                      ? 'bg-white/5 border-white/10'
                      : 'bg-white/10 border-white/20 shadow-lg'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${colorClass} flex-shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className={`font-medium ${notification.read ? 'text-blue-200' : 'text-white'}`}>
                          {notification.title}
                        </h4>
                        <div className={`w-2 h-2 rounded-full ${priorityColor}`} />
                        <span className="text-xs text-blue-300 capitalize">{notification.priority}</span>
                        <span className="text-xs text-blue-300 capitalize">{notification.category}</span>
                      </div>
                      
                      <p className={`text-sm mb-3 ${notification.read ? 'text-blue-300' : 'text-blue-100'}`}>
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs text-blue-400">
                          <Clock className="w-3 h-3" />
                          <span>{notification.createdAt.toLocaleString('en-IN')}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {notification.actionUrl && (
                            <button className="text-blue-300 hover:text-white text-sm font-medium">
                              View Details
                            </button>
                          )}
                          {!notification.read ? (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 text-blue-300 hover:text-white hover:bg-white/10 rounded transition-colors"
                              title="Mark as read"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => markAsUnread(notification.id)}
                              className="p-1 text-blue-300 hover:text-white hover:bg-white/10 rounded transition-colors"
                              title="Mark as unread"
                            >
                              <MarkAsUnread className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1 text-red-300 hover:text-red-200 hover:bg-red-500/10 rounded transition-colors"
                            title="Delete notification"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Notification Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-white font-medium">Email Notifications</h4>
            {[
              { id: 'filing_complete', label: 'Filing Completed', enabled: true },
              { id: 'payment_received', label: 'Payment Received', enabled: true },
              { id: 'deadline_reminder', label: 'Deadline Reminders', enabled: true },
              { id: 'system_alerts', label: 'System Alerts', enabled: false }
            ].map((setting) => (
              <div key={setting.id} className="flex items-center justify-between">
                <span className="text-blue-200">{setting.label}</span>
                <div className={`w-12 h-6 rounded-full p-1 transition-colors ${
                  setting.enabled ? 'bg-green-500' : 'bg-gray-600'
                }`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    setting.enabled ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-4">
            <h4 className="text-white font-medium">Push Notifications</h4>
            {[
              { id: 'urgent_alerts', label: 'Urgent Alerts', enabled: true },
              { id: 'bot_updates', label: 'Bot Status Updates', enabled: false },
              { id: 'client_messages', label: 'Client Messages', enabled: true },
              { id: 'daily_summary', label: 'Daily Summary', enabled: true }
            ].map((setting) => (
              <div key={setting.id} className="flex items-center justify-between">
                <span className="text-blue-200">{setting.label}</span>
                <div className={`w-12 h-6 rounded-full p-1 transition-colors ${
                  setting.enabled ? 'bg-green-500' : 'bg-gray-600'
                }`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    setting.enabled ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="pt-6 border-t border-white/20 mt-6">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}