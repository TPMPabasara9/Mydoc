import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Activity,
  Eye,
  FileText,
  Bell,
  Settings,
  Search,
  Filter
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');

  // Sample data
  const metrics = {
    totalDoctors: 342,
    totalCustomers: 1247,
    totalEarnings: 45780,
    appointmentsToday: 23,
    pendingApprovals: 8,
    activeConsultations: 12
  };

  const earningsData = [
    { month: 'Jan', earnings: 35000 },
    { month: 'Feb', earnings: 42000 },
    { month: 'Mar', earnings: 38000 },
    { month: 'Apr', earnings: 51000 },
    { month: 'May', earnings: 45780 },
  ];

  const doctorSpecialties = [
    { name: 'General', value: 98, color: '#3B82F6' },
    { name: 'Cardiology', value: 67, color: '#6366F1' },
    { name: 'Dermatology', value: 45, color: '#8B5CF6' },
    { name: 'Pediatrics', value: 78, color: '#EC4899' },
    { name: 'Orthopedics', value: 54, color: '#F59E0B' }
  ];

  const appointmentStatus = [
    { name: 'Completed', value: 245, color: '#10B981' },
    { name: 'Scheduled', value: 89, color: '#3B82F6' },
    { name: 'Cancelled', value: 23, color: '#EF4444' },
    { name: 'Pending', value: 45, color: '#F59E0B' }
  ];

  const recentActivities = [
    { action: 'New doctor registered', user: 'Dr. Sarah Johnson', time: '2 hours ago', type: 'doctor' },
    { action: 'Customer consultation completed', user: 'John Smith', time: '1 hour ago', type: 'consultation' },
    { action: 'Payment received', user: 'Michael Brown', time: '30 minutes ago', type: 'payment' },
    { action: 'Appointment scheduled', user: 'Emma Davis', time: '15 minutes ago', type: 'appointment' }
  ];

  const MetricCard = ({ title, value, icon: Icon, trend, trendValue, color = 'indigo' }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-${color}-50`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
        {trend && (
          <div className={`flex items-center text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp className="w-4 h-4 mr-1" />
            {trendValue}%
          </div>
        )}
      </div>
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value.toLocaleString()}</p>
    </div>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-md">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-indigo-600">
            {payload[0].name}: {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, Administrator</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Period Selector */}
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Quarter</option>
              <option>This Year</option>
            </select>
            <button className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <MetricCard
            title="Total Doctors"
            value={metrics.totalDoctors}
            icon={UserCheck}
            trend="up"
            trendValue={12}
            color="indigo"
          />
          <MetricCard
            title="Total Customers"
            value={metrics.totalCustomers}
            icon={Users}
            trend="up"
            trendValue={8}
            color="blue"
          />
          <MetricCard
            title="Total Earnings"
            value={metrics.totalEarnings}
            icon={DollarSign}
            trend="up"
            trendValue={15}
            color="green"
          />
          <MetricCard
            title="Today's Appointments"
            value={metrics.appointmentsToday}
            icon={Calendar}
            color="purple"
          />
          <MetricCard
            title="Pending Approvals"
            value={metrics.pendingApprovals}
            icon={FileText}
            color="orange"
          />
          <MetricCard
            title="Active Consultations"
            value={metrics.activeConsultations}
            icon={Activity}
            color="pink"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {/* Earnings Chart */}
          <div className="xl:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Earnings Overview</h2>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Monthly Revenue</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="earnings" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Doctor Specialties Pie Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Doctor Specialties</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={doctorSpecialties}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {doctorSpecialties.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Appointment Status */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Appointment Status</h2>
            <div className="space-y-4">
              {appointmentStatus.map((status, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: status.color }}
                    ></div>
                    <span className="text-gray-700">{status.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{status.value}</div>
                    <div className="text-sm text-gray-500">
                      {((status.value / appointmentStatus.reduce((sum, s) => sum + s.value, 0)) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
              <button className="flex items-center text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                <Eye className="w-4 h-4 mr-1" />
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.user}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;