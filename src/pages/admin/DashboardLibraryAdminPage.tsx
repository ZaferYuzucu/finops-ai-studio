import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Eye,
  Library,
  Plus,
  Search,
  Shield,
  Tag,
  Trash2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import type { UserDashboardRecord } from '../../types/userDashboard';
import { listAllDashboards } from '../../utils/userDashboards';
import { recommendChart, type ChartIntent, type ChartType } from '../../utils/chartWizard';
import { addTemplateToLibrary, deleteTemplateFromLibrary, listTemplateLibrary } from '../../utils/templateLibrary';
import { addAdminNote, listAdminNotes } from '../../utils/dashboardAdminNotes';

type Tab = 'review' | 'library';

function chartTypeLabel(t: ChartType): string {
  switch (t) {
    case 'line':
      return 'Line';
    case 'bar':
      return 'Bar';
    case 'stacked_bar':
      return 'Stacked Bar';
    case 'area':
      return 'Area';
    case 'area_line':
      return 'Area + Line';
    case 'donut':
      return 'Donut';
    case 'table':
      return 'Table';
    case 'heatmap':
      return 'Heatmap';
    case 'combo':
      return 'Combo';
    case 'waterfall':
      return 'Waterfall';
    case 'kpi':
      return 'KPI';
    case 'gauge':
      return 'Gauge';
    default:
      return String(t);
  }
}

function intentFromChartType(t: ChartType): ChartIntent {
  switch (t) {
    case 'line':
    case 'area':
    case 'area_line':
      return 'trend';
    case 'bar':
    case 'stacked_bar':
      return 'compare';
    case 'donut':
      return 'distribution';
    case 'waterfall':
      return 'flow';
    case 'table':
    case 'kpi':
    case 'heatmap':
    case 'combo':
      return 'detail';
    case 'gauge':
      return 'target_tracking';
    default:
      return 'detail';
  }
}

function Badge({ kind, children }: { kind: 'ok' | 'warn' | 'info'; children: React.ReactNode }) {
  const cls =
    kind === 'ok'
      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
      : kind === 'warn'
        ? 'bg-amber-50 text-amber-900 border-amber-200'
        : 'bg-sky-50 text-sky-900 border-sky-200';
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold ${cls}`}>
      {children}
    </span>
  );
}

export default function DashboardLibraryAdminPage() {
  const { currentUser } = useAuth();
  const [tab, setTab] = useState<Tab>('review');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const [templateName, setTemplateName] = useState('');
  const [templateSector, setTemplateSector] = useState('Admin Onaylı');
  const [templateNotes, setTemplateNotes] = useState('');

  const [noteMessage, setNoteMessage] = useState('');
  const [noteSeverity, setNoteSeverity] = useState<'info' | 'warning'>('warning');

  const allDashboards = useMemo(() => {
    void refreshKey;
    const raw = listAllDashboards();
    const q = query.trim().toLowerCase();
    if (!q) return raw;
    return raw.filter((d) => {
      const name = (d.name ?? '').toLowerCase();
      const src = (d.wizardData?.dataSource ?? '').toLowerCase();
      const typ = (d.wizardData?.dashboardType ?? '').toLowerCase();
      return name.includes(q) || src.includes(q) || typ.includes(q) || d.userId.toLowerCase().includes(q);
    });
  }, [query, refreshKey]);

  const selected = useMemo<UserDashboardRecord | null>(() => {
    if (!selectedId) return null;
    return allDashboards.find((d) => d.id === selectedId) ?? null;
  }, [allDashboards, selectedId]);

  const adminEmail = currentUser?.email ?? null;

  const notes = useMemo(() => {
    if (!selected) return [];
    void refreshKey;
    return listAdminNotes(selected.id);
  }, [selected, refreshKey]);

  const templates = useMemo(() => {
    void refreshKey;
    return listTemplateLibrary();
  }, [refreshKey]);

  const recommendation = useMemo(() => {
    if (!selected) return null;
    const profile = selected.wizardData.datasetProfileSnapshot;
    if (!profile) return null;
    const primaryChart = selected.wizardData.customizations?.chartTypes?.[0];
    if (!primaryChart) return null;
    const intent = intentFromChartType(primaryChart);
    return recommendChart(intent, profile, 'tr', undefined, undefined, 'live');
  }, [selected]);

  const applyTemplateDefaultsFromSelection = (d: UserDashboardRecord) => {
    setTemplateName(d.name);
    setTemplateSector('Admin Onaylı');
    setTemplateNotes('');
  };

  const handleAddTemplate = () => {
    if (!selected) return;
    const name = (templateName || selected.name || '').trim();
    if (!name) {
      alert('Şablon adı boş olamaz.');
      return;
    }
    addTemplateToLibrary({
      name,
      wizardData: selected.wizardData,
      sourceDashboardId: selected.id,
      sourceUserId: selected.userId,
      sectorLabel: templateSector || 'Admin Onaylı',
      notes: templateNotes.trim() || undefined,
      createdByAdminEmail: adminEmail,
    });
    setRefreshKey((x) => x + 1);
    setTab('library');
  };

  const handleAddNote = () => {
    if (!selected) return;
    const msg = noteMessage.trim();
    if (!msg) return;
    addAdminNote({
      dashboardId: selected.id,
      severity: noteSeverity,
      message: msg,
      adminEmail,
    });
    setNoteMessage('');
    setRefreshKey((x) => x + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full mb-4">
              <Shield className="w-4 h-4 text-emerald-700" />
              <span className="text-sm font-extrabold text-emerald-800">Admin • Dashboard Kütüphanesi</span>
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900">Dashboard İnceleme & Şablonlaştırma</h1>
            <p className="mt-2 text-gray-600 max-w-3xl">
              Kullanıcı dashboard’larını <strong>veriye bakmadan</strong> (sadece konfigürasyon) incele, uyarı bırak ve
              beğendiklerini “Admin Onaylı Şablon” olarak kütüphaneye ekle.
            </p>
            <p className="mt-2 text-xs text-gray-500">
              Not: Bu beta sürümünde kayıtlar tarayıcı (localStorage) bazlıdır; farklı cihazdaki kullanıcı dashboard’ları burada görünmez.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/office"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 hover:border-emerald-300 hover:shadow-sm transition-all text-sm font-semibold text-gray-800"
            >
              <ClipboardList className="w-4 h-4" />
              Yönetim Ofisi
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex items-center gap-2">
          <button
            onClick={() => setTab('review')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all ${
              tab === 'review'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-white text-gray-800 border-gray-200 hover:border-emerald-300'
            }`}
          >
            <Eye className="w-4 h-4" />
            Kullanıcı Dashboard İncele
          </button>
          <button
            onClick={() => setTab('library')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all ${
              tab === 'library'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-white text-gray-800 border-gray-200 hover:border-emerald-300'
            }`}
          >
            <Library className="w-4 h-4" />
            Şablon Kütüphanesi
            <span className="ml-1 text-xs font-bold opacity-90">({templates.length})</span>
          </button>
        </div>

        {tab === 'review' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Left: list */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="relative w-full">
                      <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Ara: isim, userId, kaynak, tip..."
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Toplam: <span className="font-bold text-gray-700">{allDashboards.length}</span>
                  </div>
                </div>

                <div className="max-h-[560px] overflow-y-auto">
                  {allDashboards.length === 0 ? (
                    <div className="p-6 text-sm text-gray-600">
                      Henüz kullanıcı dashboard kaydı bulunamadı. (Bu cihazda oluşturulmuş olmalı.)
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {allDashboards.map((d) => (
                        <button
                          key={d.id}
                          onClick={() => {
                            setSelectedId(d.id);
                            applyTemplateDefaultsFromSelection(d);
                          }}
                          className={`w-full text-left p-4 hover:bg-gray-50 transition-all ${
                            selectedId === d.id ? 'bg-emerald-50' : 'bg-white'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="font-extrabold text-gray-900 truncate">{d.name}</div>
                              <div className="mt-1 text-[11px] text-gray-500">
                                {new Date(d.updatedAtIso).toLocaleString('tr-TR')}
                              </div>
                              <div className="mt-2 flex flex-wrap gap-2">
                                <Badge kind="info">
                                  {d.wizardData.dashboardType ?? '—'} • {d.wizardData.dataSource ?? '—'}
                                </Badge>
                                {Array.isArray(d.wizardData.customizations?.chartTypes) &&
                                d.wizardData.customizations.chartTypes.length > 0 ? (
                                  <Badge kind="ok">
                                    {chartTypeLabel(d.wizardData.customizations.chartTypes[0] as ChartType)}
                                  </Badge>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right: details */}
            <div className="lg:col-span-2">
              {!selected ? (
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                  <div className="text-lg font-extrabold text-gray-900">Bir dashboard seç</div>
                  <div className="mt-2 text-sm text-gray-600">
                    Soldaki listeden bir dashboard seçerek uyarıları ve şablonlaştırmayı yönetebilirsin.
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-2xl font-extrabold text-gray-900">{selected.name}</div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Badge kind="info">UserId: {selected.userId}</Badge>
                          <Badge kind="info">{selected.wizardData.dashboardType ?? '—'}</Badge>
                          <Badge kind="info">{selected.wizardData.dataSource ?? '—'}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/dashboard/edit/${selected.id}`}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
                        >
                          Düzenle (User)
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Recommendation */}
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm font-extrabold text-gray-900">Otomatik Kontrol (Rule Engine)</div>
                        {recommendation ? (
                          <Badge kind="ok">
                            Öneri: {chartTypeLabel(recommendation.recommended)}
                          </Badge>
                        ) : (
                          <Badge kind="warn">
                            Profil yok → kontrol sınırlı
                          </Badge>
                        )}
                      </div>
                      {recommendation ? (
                        <>
                          <div className="mt-2 text-sm text-gray-700">
                            <span className="font-bold">Neden:</span> {recommendation.reason}
                          </div>
                          {recommendation.warnings.length > 0 ? (
                            <div className="mt-3 space-y-2">
                              {recommendation.warnings.map((w) => (
                                <div
                                  key={w}
                                  className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900"
                                >
                                  <AlertTriangle className="w-4 h-4 mt-0.5 text-amber-700" />
                                  <div>{w}</div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="mt-3 flex items-center gap-2 text-sm text-emerald-800">
                              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                              Bu profil için ek uyarı yok.
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="mt-2 text-sm text-gray-600">
                          Eski dashboard kayıtlarında “datasetProfileSnapshot” bulunmayabilir. Yeni kayıtlarda otomatik kontrol aktif olur.
                        </div>
                      )}
                    </div>

                    {/* Admin notes */}
                    <div className="rounded-2xl border border-gray-200 p-5">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-extrabold text-gray-900">Admin Uyarıları / Notlar</div>
                        <Badge kind="info">{notes.length}</Badge>
                      </div>

                      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                        <select
                          value={noteSeverity}
                          onChange={(e) => setNoteSeverity(e.target.value as any)}
                          className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm"
                        >
                          <option value="warning">Uyarı</option>
                          <option value="info">Bilgi</option>
                        </select>
                        <input
                          value={noteMessage}
                          onChange={(e) => setNoteMessage(e.target.value)}
                          placeholder="Örn: Pie için kategori sayısı fazla, Bar öner."
                          className="md:col-span-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm"
                        />
                      </div>
                      <div className="mt-3">
                        <button
                          onClick={handleAddNote}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
                        >
                          <Plus className="w-4 h-4" />
                          Not ekle
                        </button>
                      </div>

                      <div className="mt-4 space-y-2">
                        {notes.length === 0 ? (
                          <div className="text-sm text-gray-600">Henüz admin notu yok.</div>
                        ) : (
                          notes.map((n) => (
                            <div
                              key={n.id}
                              className={`rounded-xl border p-3 text-sm ${
                                n.severity === 'warning'
                                  ? 'border-amber-200 bg-amber-50 text-amber-900'
                                  : 'border-sky-200 bg-sky-50 text-sky-900'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="font-semibold">{n.message}</div>
                                <div className="text-[11px] opacity-80 whitespace-nowrap">
                                  {new Date(n.atIso).toLocaleString('tr-TR')}
                                </div>
                              </div>
                              {n.adminEmail ? (
                                <div className="mt-1 text-[11px] opacity-80">by {n.adminEmail}</div>
                              ) : null}
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Promote to template */}
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                      <div className="flex items-center gap-2 text-sm font-extrabold text-emerald-900">
                        <Library className="w-4 h-4" />
                        Şablon Kütüphanesine Ekle (Verisiz)
                      </div>
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input
                          value={templateName}
                          onChange={(e) => setTemplateName(e.target.value)}
                          placeholder="Şablon adı"
                          className="md:col-span-2 rounded-xl border border-emerald-200 bg-white px-3 py-2 text-sm"
                        />
                        <div className="relative">
                          <Tag className="w-4 h-4 text-emerald-700 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            value={templateSector}
                            onChange={(e) => setTemplateSector(e.target.value)}
                            placeholder="Sektör etiketi"
                            className="w-full rounded-xl border border-emerald-200 bg-white pl-9 pr-3 py-2 text-sm"
                          />
                        </div>
                      </div>
                      <textarea
                        value={templateNotes}
                        onChange={(e) => setTemplateNotes(e.target.value)}
                        placeholder="Opsiyonel admin notu (örn: CFO için uygun özet dashboard şablonu)"
                        className="mt-3 w-full rounded-xl border border-emerald-200 bg-white px-3 py-2 text-sm min-h-[80px]"
                      />
                      <div className="mt-3">
                        <button
                          onClick={handleAddTemplate}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 text-white font-semibold hover:bg-emerald-800"
                        >
                          <BookOpen className="w-4 h-4" />
                          Şablon olarak ekle
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-2xl font-extrabold text-gray-900">Şablon Kütüphanesi</div>
                  <div className="mt-1 text-sm text-gray-600">Admin onaylı şablonlar (konfigürasyon tabanlı).</div>
                </div>
                <Badge kind="info">{templates.length} şablon</Badge>
              </div>
            </div>
            <div className="p-6">
              {templates.length === 0 ? (
                <div className="text-sm text-gray-600">Henüz şablon eklenmedi.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {templates.map((t) => (
                    <div key={t.id} className="rounded-2xl border border-gray-200 bg-white p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-lg font-extrabold text-gray-900 truncate">{t.name}</div>
                          <div className="mt-1 text-xs text-gray-500">
                            {t.sectorLabel ? `${t.sectorLabel} • ` : ''}
                            {new Date(t.createdAtIso).toLocaleString('tr-TR')}
                          </div>
                          <div className="mt-2 text-xs text-gray-600">
                            Kaynak: {t.sourceDashboardId.slice(0, 8)}… • User: {t.sourceUserId}
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            const ok = confirm('Bu şablon silinsin mi?');
                            if (!ok) return;
                            deleteTemplateFromLibrary(t.id);
                            setRefreshKey((x) => x + 1);
                          }}
                          className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 hover:border-rose-300 hover:text-rose-700"
                          title="Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      {t.notes ? (
                        <div className="mt-3 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl p-3">
                          {t.notes}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

