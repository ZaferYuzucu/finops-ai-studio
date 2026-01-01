import React from 'react';
import { AlertTriangle, CheckCircle, XCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { ValidationIssue } from '../../types';

interface Props {
  issues: ValidationIssue[];
  totalRows: number;
  onConfirm: () => void;
  onBack: () => void;
}

export default function StepValidation({ issues, totalRows, onConfirm, onBack }: Props) {
  const errors = issues.filter(i => i.severity === 'error');
  const warnings = issues.filter(i => i.severity === 'warning');
  
  const successRate = totalRows > 0 ? ((totalRows - errors.length) / totalRows * 100).toFixed(1) : 0;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center mb-2">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-sm font-semibold text-green-800">Başarılı</span>
          </div>
          <div className="text-2xl font-bold text-green-900">{totalRows - errors.length}</div>
          <div className="text-xs text-green-600">satır normalize edildi</div>
        </div>
        
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center mb-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
            <span className="text-sm font-semibold text-yellow-800">Uyarı</span>
          </div>
          <div className="text-2xl font-bold text-yellow-900">{warnings.length}</div>
          <div className="text-xs text-yellow-600">küçük sorun</div>
        </div>
        
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center mb-2">
            <XCircle className="w-5 h-5 text-red-600 mr-2" />
            <span className="text-sm font-semibold text-red-800">Hata</span>
          </div>
          <div className="text-2xl font-bold text-red-900">{errors.length}</div>
          <div className="text-xs text-red-600">ciddi sorun</div>
        </div>
      </div>

      {/* Success Rate */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-blue-800">Veri Kalitesi</span>
          <span className="text-2xl font-bold text-blue-900">{successRate}%</span>
        </div>
        <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${successRate}%` }}
          />
        </div>
      </div>

      {/* Issue List */}
      {issues.length > 0 && (
        <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-3 py-2 text-left">Satır</th>
                <th className="px-3 py-2 text-left">Sütun</th>
                <th className="px-3 py-2 text-left">Sorun</th>
                <th className="px-3 py-2 text-left">Açıklama</th>
              </tr>
            </thead>
            <tbody>
              {issues.slice(0, 50).map((issue, index) => (
                <tr key={index} className={`border-t ${
                  issue.severity === 'error' ? 'bg-red-50' : 'bg-yellow-50'
                }`}>
                  <td className="px-3 py-2">{issue.row}</td>
                  <td className="px-3 py-2 font-medium">{issue.column}</td>
                  <td className="px-3 py-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      issue.severity === 'error' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'
                    }`}>
                      {issue.issue}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-gray-600">{issue.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {issues.length > 50 && (
            <div className="p-3 text-center text-sm text-gray-500 border-t">
              ... ve {issues.length - 50} sorun daha
            </div>
          )}
        </div>
      )}

      {issues.length === 0 && (
        <div className="p-8 text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Mükemmel! 🎉</h3>
          <p className="text-gray-600">Tüm veriler başarıyla doğrulandı.</p>
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Geri
        </button>
        
        <button
          onClick={onConfirm}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
        >
          Devam Et <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
}





