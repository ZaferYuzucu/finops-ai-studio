import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getFileContent, getUserFiles, type PersistedFileMetadata } from '../services/firestorePersistence';
import { runAntiChaosPipeline } from '../utils/antiChaos';
import { CheckCircle2, AlertCircle, Info, ArrowRight, Loader } from 'lucide-react';

export default function DataPreviewPage() {
  const { fileId } = useParams<{ fileId: string }>();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [fileMeta, setFileMeta] = useState<PersistedFileMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [previewData, setPreviewData] = useState<any>(null);
  const [confidence, setConfidence] = useState<number>(0);
  const [riskFlags, setRiskFlags] = useState<any[]>([]);

  useEffect(() => {
    if (!currentUser?.uid || !fileId) {
      navigate('/veri-girisi');
      return;
    }
    loadPreview();
  }, [currentUser, fileId]);

  const loadPreview = async () => {
    if (!currentUser?.uid || !fileId) return;
    
    try {
      setLoading(true);
      
      // Get file metadata
      const files = await getUserFiles(currentUser.uid);
      const meta = files.find(f => f.id === fileId);
      if (!meta) {
        alert('Dosya bulunamadı');
        navigate('/veri-girisi');
        return;
      }
      setFileMeta(meta);
      
      // Get file content and run anti-chaos
      const content = await getFileContent(currentUser.uid, fileId);
      if (!content) {
        alert('Dosya içeriği bulunamadı');
        navigate('/veri-girisi');
        return;
      }
      
      const blob = new Blob([content], { type: 'text/csv' });
      const file = new File([blob], meta.name, { type: 'text/csv' });
      
      const result = await runAntiChaosPipeline(file);
      
      if (result.success && result.data) {
        setPreviewData({
          headers: result.data.headers,
          columnProfiles: result.columnProfiles || [],
          sampleRows: result.data.rows.slice(0, 10),
          delimiter: result.data.metadata.delimiter,
          encoding: 'UTF-8',
        });
        setConfidence(result.diagnosis?.confidenceScore || 0);
        setRiskFlags(result.diagnosis?.riskFlags || []);
      } else {
        setPreviewData({
          headers: meta.schema?.headers || [],
          columnProfiles: [],
          sampleRows: meta.sampleRows || [],
          delimiter: meta.delimiter || ',',
          encoding: meta.encoding || 'UTF-8',
        });
        setConfidence(0.5);
        setRiskFlags([]);
      }
    } catch (e) {
      console.error('Preview load error:', e);
      alert('Önizleme yüklenemedi');
      navigate('/veri-girisi');
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (!fileId) return;
    navigate(`/dashboard/smart-create?fileId=${fileId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  if (!previewData || !fileMeta) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4 text-red-600" size={48} />
          <p className="text-gray-600">Veri önizlemesi yüklenemedi</p>
        </div>
      </div>
    );
  }

  const confidencePercent = Math.round(confidence * 100);
  const isLowConfidence = confidence < 0.60;
  const hasRisks = riskFlags.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Veri Önizleme & Doğrulama</h1>
          
          {/* File Info */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Info size={20} className="text-blue-600" />
              <span className="font-semibold text-blue-900">Dosya Bilgileri</span>
            </div>
            <div className="text-sm text-blue-800 space-y-1">
              <div><strong>Dosya:</strong> {fileMeta.name}</div>
              <div><strong>Boyut:</strong> {(fileMeta.size / 1024).toFixed(2)} KB</div>
              <div><strong>Delimiter:</strong> {previewData.delimiter}</div>
              <div><strong>Encoding:</strong> {previewData.encoding}</div>
            </div>
          </div>

          {/* Confidence Score */}
          <div className={`mb-6 p-4 rounded-lg border-2 ${
            confidence >= 0.85 ? 'bg-green-50 border-green-300' :
            confidence >= 0.60 ? 'bg-yellow-50 border-yellow-300' :
            'bg-gray-50 border-gray-300'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {confidence >= 0.85 ? <CheckCircle2 size={20} className="text-green-600" /> :
               confidence >= 0.60 ? <AlertCircle size={20} className="text-yellow-600" /> :
               <AlertCircle size={20} className="text-gray-600" />}
              <span className="font-semibold">
                Veri Güveni: <strong>%{confidencePercent}</strong>
              </span>
            </div>
            {isLowConfidence && (
              <p className="text-sm text-gray-700 mt-2">
                ⚠️ Düşük güven skoru. Verilerinizi kontrol edin.
              </p>
            )}
          </div>

          {/* Risk Flags */}
          {hasRisks && (
            <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle size={20} className="text-yellow-600" />
                <span className="font-semibold text-yellow-900">Potansiyel Sorunlar</span>
              </div>
              <ul className="text-sm text-yellow-800 space-y-1">
                {riskFlags.slice(0, 5).map((risk, idx) => (
                  <li key={idx}>• {risk.message}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Column List */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Sütunlar</h2>
            <div className="space-y-2">
              {previewData.columnProfiles.map((profile: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium">{profile.columnName}</span>
                    <span className="text-sm text-gray-600 ml-2">({profile.detectedType})</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    Güven: {Math.round((profile.confidenceScore || 0) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Rows */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Örnek Veriler (İlk 10 Satır)</h2>
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    {previewData.headers.map((h: string, idx: number) => (
                      <th key={idx} className="px-3 py-2 text-left font-semibold text-gray-700">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewData.sampleRows.map((row: any[], rowIdx: number) => (
                    <tr key={rowIdx} className="border-t border-gray-200">
                      {row.map((cell: any, cellIdx: number) => (
                        <td key={cellIdx} className="px-3 py-2 text-gray-700">{String(cell || '')}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <button
              onClick={() => navigate('/veri-girisi')}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Geri Dön
            </button>
            <button
              onClick={handleContinue}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              Onayla ve Devam Et
              <ArrowRight size={20} />
            </button>
          </div>

          {isLowConfidence && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
              ⚠️ Düşük güven skoru ile devam ediyorsunuz. Dashboard oluşturduktan sonra verileri kontrol edin.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
