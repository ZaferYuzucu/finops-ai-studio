import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getDashboard, persistDashboard, getUserFiles } from '../services/firestorePersistence';
import { getFileContent } from '../services/firestorePersistence';
import { runAntiChaosPipeline } from '../utils/antiChaos';
import { wizardStateToDashboardConfig } from '../utils/wizardToConfig';
import { Loader, ArrowLeft, Save } from 'lucide-react';

export default function DashboardEditPage() {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState<any>(null);
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState<string>('');
  const [kpis, setKpis] = useState<any[]>([]);
  const [charts, setCharts] = useState<any[]>([]);

  useEffect(() => {
    if (!currentUser?.uid || !id) {
      navigate('/dashboard/my');
      return;
    }
    loadDashboard();
    loadFiles();
  }, [currentUser, id]);

  const loadDashboard = async () => {
    if (!currentUser?.uid || !id) return;
    
    try {
      // Try Firestore first
      const dash = await getDashboard(currentUser.uid, id);
      if (dash) {
        setDashboard(dash);
        setSelectedFileId(dash.fileId || '');
        setKpis(dash.config.kpis || []);
        setCharts(dash.config.charts || []);
        setLoading(false);
        return;
      }
    } catch (e) {
      console.warn('Firestore load failed:', e);
    }
    
    // Fallback to localStorage
    const { getUserDashboard } = await import('../utils/userDashboards');
    const dash = getUserDashboard(currentUser.uid, id);
    if (dash && dash.config) {
      setDashboard({ id: dash.id, name: dash.name, config: dash.config, fileId: '' });
      setKpis(dash.config.kpis || []);
      setCharts(dash.config.charts || []);
    } else {
      alert('Dashboard bulunamadı');
      navigate('/dashboard/my');
    }
    setLoading(false);
  };

  const loadFiles = async () => {
    if (!currentUser?.uid) return;
    try {
      const userFiles = await getUserFiles(currentUser.uid);
      setFiles(userFiles);
    } catch (e) {
      console.warn('Files load error:', e);
    }
  };

  const handleSave = async () => {
    if (!currentUser?.uid || !id || !dashboard) return;
    
    setSaving(true);
    try {
      // Re-run anti-chaos if file changed
      let diagnosis = dashboard.diagnosis;
      if (selectedFileId && selectedFileId !== dashboard.fileId) {
        const content = await getFileContent(currentUser.uid, selectedFileId);
        if (content) {
          const blob = new Blob([content], { type: 'text/csv' });
          const file = new File([blob], 'data.csv', { type: 'text/csv' });
          const result = await runAntiChaosPipeline(file);
          if (result.success && result.diagnosis) {
            diagnosis = result.diagnosis;
          }
        }
      }
      
      // Update config
      const updatedConfig = {
        ...dashboard.config,
        kpis,
        charts,
      };
      
      await persistDashboard(
        currentUser.uid,
        id,
        dashboard.name,
        updatedConfig,
        selectedFileId,
        diagnosis
      );
      
      alert('Dashboard güncellendi!');
      navigate(`/dashboard/view/${id}`);
    } catch (e) {
      console.error('Save error:', e);
      alert('Kaydetme hatası');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  if (!dashboard) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Düzenle</h1>
            <button
              onClick={() => navigate(`/dashboard/view/${id}`)}
              className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft size={20} />
              Geri Dön
            </button>
          </div>

          {/* File Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Veri Dosyası
            </label>
            <select
              value={selectedFileId}
              onChange={(e) => setSelectedFileId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Dosya seçin</option>
              {files.map(f => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>

          {/* KPI List (read-only for now, can be extended) */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              KPI'lar ({kpis.length}/6)
            </label>
            <div className="space-y-2">
              {kpis.map((kpi, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">{kpi.label}</span>
                  <span className="text-sm text-gray-600 ml-2">({kpi.format})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Charts List */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grafikler ({charts.length}/3)
            </label>
            <div className="space-y-2">
              {charts.map((chart, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">{chart.title}</span>
                  <span className="text-sm text-gray-600 ml-2">({chart.type})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50"
            >
              {saving ? <Loader className="animate-spin" size={20} /> : <Save size={20} />}
              {saving ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
