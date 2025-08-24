import React from 'react';
import { Bell, Search, User, LogOut, Settings } from 'lucide-react';
import { User as UserType, Notification } from '../../types';

interface HeaderProps {
  user: UserType;
  notifications: Notification[];
}

export default function Header({ user, notifications }: HeaderProps) {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white/10 backdrop-blur-md border-b border-white/20 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 text-blue-200 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search clients, filings..."
              className="bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent w-80"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button className="p-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-white text-sm font-medium">{user.name}</p>
              <p className="text-blue-200 text-xs">{user.firm}</p>
            </div>
            <div className="relative group">
              <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10 transition-colors">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white/20 backdrop-blur-md rounded-lg border border-white/20 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-2">
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-md transition-colors">
                    <Settings className="w-4 h-4" />
                    <span className="text-sm">Profile Settings</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-md transition-colors">
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}