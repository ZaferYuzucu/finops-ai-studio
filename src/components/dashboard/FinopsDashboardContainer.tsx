// FINOPS Dashboard Container - A4 Landscape Print-Ready Layout
import React, { useState } from 'react';
import { Download, Printer, Share2 } from 'lucide-react';
import '../../styles/finops-palette.css';

export interface FinopsDashboardContainerProps {
  title: string;
  subtitle?: string;
  dateRange?: string;
  currency?: string;
  filters?: string;
  layout?: 'a4-landscape' | 'fullscreen' | 'custom';
  kpiCount?: 3 | 4 | 6;
  chartCount?: 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  onExportPDF?: () => void;
  showExportButton?: boolean;
}

export const FinopsDashboardContainer: React.FC<FinopsDashboardContainerProps> = ({
  title,
  subtitle,
  dateRange,
  currency = '₺',
  filters,
  layout = 'a4-landscape',
  children,
  onExportPDF,
  showExportButton = true
}) => {
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setTimeout(() => setIsPrinting(false), 500);
    }, 100);
  };

  const handleExportPDF = () => {
    if (onExportPDF) {
      onExportPDF();
    } else {
      handlePrint();
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('Link kopyalandı! Artık CEO/CFO ile paylaşabilirsiniz.');
    });
  };

  const containerStyle = layout === 'a4-landscape' 
    ? { 
        width: '297mm', 
        maxWidth: '297mm', 
        height: '210mm',
        maxHeight: '210mm',
        overflow: 'hidden',
        transform: 'scale(0.9)',
        transformOrigin: 'top left'
      }
    : { width: '100%', maxWidth: '1400px' };

  return (
    <div 
      className="flex justify-center"
      style={{ 
        background: 'linear-gradient(135deg, var(--bg-main) 0%, #fff 50%, var(--bg-main) 100%)',
        padding: '24px 12px',
        minHeight: '100vh'
      }}
    >
      <div
        className="dashboard-container bg-white/95 rounded-2xl shadow-2xl border-2"
        style={{ 
          ...containerStyle,
          borderColor: 'var(--bg-card-border)',
          padding: '16px 20px'
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-6 mb-4 pb-4 border-b-2" style={{ borderColor: 'var(--bg-card-border)' }}>
          <div className="flex-1">
            <h1 className="text-3xl font-black finops-title mb-1">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm finops-subtitle">{subtitle}</p>
            )}
          </div>

          {/* Meta Info & Actions */}
          <div className="flex flex-col items-end gap-2">
            <div className="text-xs text-right" style={{ color: 'var(--text-secondary)' }}>
              {dateRange && <div>Dönem: {dateRange}</div>}
              {currency && <div>Para Birimi: {currency}</div>}
              {filters && <div>Filtre: {filters}</div>}
            </div>
            
            {showExportButton && !isPrinting && (
              <div className="flex gap-2 no-print">
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-lg transition-all"
                  style={{
                    backgroundColor: '#3B82F6',
                    color: 'white',
                    border: '2px solid #3B82F6'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#3B82F6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#3B82F6';
                    e.currentTarget.style.color = 'white';
                  }}
                  title="CEO/CFO ile paylaş (View-only)"
                >
                  <Share2 size={14} />
                  Paylaş (View-only)
                </button>
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-lg transition-all"
                  style={{
                    backgroundColor: 'var(--finops-ocean)',
                    color: 'white',
                    border: '2px solid var(--finops-ocean)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--finops-ocean)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--finops-ocean)';
                    e.currentTarget.style.color = 'white';
                  }}
                >
                  <Printer size={14} />
                  Yazdır
                </button>
                <button
                  onClick={handleExportPDF}
                  className="inline-flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-lg transition-all"
                  style={{
                    backgroundColor: 'var(--finops-forest)',
                    color: 'white',
                    border: '2px solid var(--finops-forest)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--finops-forest)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--finops-forest)';
                    e.currentTarget.style.color = 'white';
                  }}
                >
                  <Download size={14} />
                  PDF İndir
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          {children}
        </div>

        {/* Footer */}
        <div 
          className="mt-4 pt-3 border-t-2 flex items-center justify-between"
          style={{ borderColor: 'var(--bg-card-border)' }}
        >
          <div className="text-xs" style={{ color: 'var(--text-light)' }}>
            Oluşturulma: {new Date().toLocaleDateString('tr-TR', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
          <div className="text-xs font-bold" style={{ color: 'var(--finops-ocean)' }}>
            © 2025 FINOPS AI Studio
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinopsDashboardContainer;
