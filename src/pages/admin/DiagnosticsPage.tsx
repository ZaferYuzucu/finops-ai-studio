import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs, where, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { Download, Filter, AlertCircle, CheckCircle2, Info } from 'lucide-react';

interface DiagnosticLog {
  id: string;
  userId?: string;
  email?: string;
  eventType: string;
  dashboardId?: string;
  fileId?: string;
  confidenceScore?: number;
  riskFlags?: Array<{ code: string; severity: string; message: string }>;
  message: string;
  metadata?: Record<string, any>;
  createdAt?: Timestamp | Date;
}

export default function DiagnosticsPage() {
  const [logs, setLogs] = useState<DiagnosticLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState<string>('7d');
  const [userIdFilter, setUserIdFilter] = useState<string>('');
  const [dashboardIdFilter, setDashboardIdFilter] = useState<string>('');
  const [confidenceFilter, setConfidenceFilter] = useState<string>('all');
  const [eventTypeFilter, setEventTypeFilter] = useState<string>('all');

  useEffect(() => {
    loadLogs();
  }, [dateFilter, userIdFilter, dashboardIdFilter, confidenceFilter, eventTypeFilter]);

  const loadLogs = async () => {
    try {
      setLoading(true);
      const logsRef = collection(db, 'diagnostics', 'events');
      
      let q = query(logsRef, orderBy('createdAt', 'desc'), limit(500));
      
      if (userIdFilter) {
        q = query(q, where('userId', '==', userIdFilter));
      }
      
      if (dashboardIdFilter) {
        q = query(q, where('dashboardId', '==', dashboardIdFilter));
      }
      
      if (eventTypeFilter !== 'all') {
        q = query(q, where('eventType', '==', eventTypeFilter));
      }
      
      const snapshot = await getDocs(q);
      let filteredLogs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
      })) as DiagnosticLog[];
      
      if (confidenceFilter !== 'all') {
        filteredLogs = filteredLogs.filter(log => {
          if (log.confidenceScore === undefined) return false;
          const score = log.confidenceScore * 100;
          if (confidenceFilter === 'low') return score < 60;
          if (confidenceFilter === 'mid') return score >= 60 && score < 85;
          if (confidenceFilter === 'high') return score >= 85;
          return true;
        });
      }
      
      if (dateFilter !== 'all') {
        const now = new Date();
        const daysAgo = dateFilter === '7d' ? 7 : dateFilter === '30d' ? 30 : 90;
        const cutoff = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
        filteredLogs = filteredLogs.filter(log => {
          const logDate = log.createdAt instanceof Date ? log.createdAt : new Date(log.createdAt as any);
          return logDate >= cutoff;
        });
      }
      
      setLogs(filteredLogs);
    } catch (error) {
      console.warn('Diagnostics yüklenemedi:', error);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  const exportJSON = () => {
    const dataStr = JSON.stringify(logs, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `diagnostics_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getEventTypeIcon = (eventType: string) => {
    if (eventType === 'RUNTIME_ERROR') return AlertCircle;
    if (eventType === 'CONFIDENCE_LOW') return Info;
    if (eventType === 'CSV_PARSE_WARNING') return Info;
    return Info;
  };

  const getConfidenceLabel = (score?: number) => {
    if (score === undefined) return '-';
    const percent = Math.round(score * 100);
    if (percent >= 85) return `${percent}%`;
    if (percent >= 60) return `${percent}%`;
    return `${percent}%`;
  };

  const getRecurringIssues = () => {
    const issueCounts: Record<string, number> = {};
    logs.forEach(log => {
      const key = `${log.eventType}:${log.message.substring(0, 50)}`;
      issueCounts[key] = (issueCounts[key] || 0) + 1;
    });
    return Object.entries(issueCounts)
      .filter(([_, count]) => count > 1)
      .sort(([_, a], [__, b]) => b - a)
      .slice(0, 10);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Yükleniyor...</div>
      </div>
    );
  }

  const recurringIssues = getRecurringIssues();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Diagnostics & Error Logs</h1>
          <button
            onClick={exportJSON}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
          >
            <Download size={16} />
            Export JSON
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">All Time</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
              <select
                value={eventTypeFilter}
                onChange={(e) => setEventTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">All Types</option>
                <option value="CSV_PARSE_WARNING">CSV Parse Warning</option>
                <option value="CONFIDENCE_LOW">Low Confidence</option>
                <option value="DASHBOARD_FALLBACK">Dashboard Fallback</option>
                <option value="RUNTIME_ERROR">Runtime Error</option>
                <option value="ASSUMPTION_BLOCKED">Assumption Blocked</option>
                <option value="DATA_QUALITY_ISSUE">Data Quality Issue</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confidence</label>
              <select
                value={confidenceFilter}
                onChange={(e) => setConfidenceFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">All</option>
                <option value="low">&lt; 60%</option>
                <option value="mid">60-84%</option>
                <option value="high">≥ 85%</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
              <input
                type="text"
                value={userIdFilter}
                onChange={(e) => setUserIdFilter(e.target.value)}
                placeholder="Filter by userId"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dashboard ID</label>
              <input
                type="text"
                value={dashboardIdFilter}
                onChange={(e) => setDashboardIdFilter(e.target.value)}
                placeholder="Filter by dashboardId"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>
        </div>

        {recurringIssues.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Recurring Issues</h2>
            <div className="space-y-2">
              {recurringIssues.map(([key, count], idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{key.split(':')[1]}</span>
                  <span className="text-gray-500">{count} occurrences</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {logs.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              No diagnostic logs found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Time</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Message</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Confidence</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">User</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Dashboard</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Risks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {logs.map((log) => {
                    const Icon = getEventTypeIcon(log.eventType);
                    return (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {log.createdAt instanceof Date
                            ? log.createdAt.toLocaleString('tr-TR')
                            : log.createdAt
                            ? new Date(log.createdAt as any).toLocaleString('tr-TR')
                            : '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          <div className="flex items-center gap-2">
                            <Icon size={16} className="text-gray-400" />
                            {log.eventType}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 max-w-md truncate" title={log.message}>
                          {log.message}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {getConfidenceLabel(log.confidenceScore)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {log.email || log.userId || '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 font-mono text-xs">
                          {log.dashboardId ? log.dashboardId.substring(0, 8) + '...' : '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {log.riskFlags?.length || 0}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-4 text-sm text-gray-500 text-center">
          Total: {logs.length} logs
        </div>
      </div>
    </div>
  );
}
