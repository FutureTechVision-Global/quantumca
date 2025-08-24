import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  FileText,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { Client } from '../types';

interface ClientManagementProps {
  clients: Client[];
}

export default function ClientManagement({ clients }: ClientManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.pan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || client.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Client Management</h1>
          <p className="text-blue-200">Manage your client database and information</p>
        </div>
        <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl">
          <Plus className="w-5 h-5" />
          <span>Add New Client</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-blue-200 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, PAN, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors">
              <Filter className="w-5 h-5 text-blue-200" />
            </button>
          </div>
        </div>
      </div>

      {/* Client Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div key={client.id} className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {client.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">{client.name}</h3>
                  <p className="text-blue-200 text-sm">PAN: {client.pan}</p>
                </div>
              </div>
              <div className="relative group">
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <MoreVertical className="w-4 h-4 text-blue-200" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white/20 backdrop-blur-md rounded-lg border border-white/20 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <div className="p-2">
                    <button className="w-full flex items-center space-x-2 px-3 py-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-md transition-colors">
                      <Edit className="w-4 h-4" />
                      <span className="text-sm">Edit Client</span>
                    </button>
                    <button className="w-full flex items-center space-x-2 px-3 py-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-md transition-colors">
                      <FileText className="w-4 h-4" />
                      <span className="text-sm">View Filings</span>
                    </button>
                    <button className="w-full flex items-center space-x-2 px-3 py-2 text-red-300 hover:text-red-200 hover:bg-red-500/10 rounded-md transition-colors">
                      <Trash2 className="w-4 h-4" />
                      <span className="text-sm">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-blue-200 text-sm">
                <Mail className="w-4 h-4" />
                <span>{client.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-200 text-sm">
                <Phone className="w-4 h-4" />
                <span>{client.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-200 text-sm">
                <MapPin className="w-4 h-4" />
                <span>{client.address.city}, {client.address.state}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="text-white font-semibold">{client.documents.length}</p>
                    <p className="text-blue-200 text-xs">Documents</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-semibold">{client.filings.length}</p>
                    <p className="text-blue-200 text-xs">Filings</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  client.status === 'active' 
                    ? 'bg-green-500/20 text-green-300' 
                    : 'bg-gray-500/20 text-gray-300'
                }`}>
                  {client.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-blue-200" />
          </div>
          <h3 className="text-white text-lg font-medium mb-2">No clients found</h3>
          <p className="text-blue-200">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}