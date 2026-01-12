import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Database, 
  Search, 
  Filter, 
  Trash2, 
  Archive, 
  ArchiveRestore, 
  Upload, 
  FileText,
  Calendar,
  Tag,
  Building
} from 'lucide-react';
import {
  getUserUploadedFiles,
  getCategoryStats,
  getUserBranches,
  deleteUploadedFile,
  toggleArchiveFile,
  cleanupArchivedFiles,
  DATA_CATEGORIES,
  type UploadedFile,
  type DataCategory,
} from '../utils/userDataStorage';

// Kategori renk eşleştirmesi (Tailwind için statik)
const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-700' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-700' },
  green: { bg: 'bg-green-100', text: 'text-green-700' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-700' },
  pink: { bg: 'bg-pink-100', text: 'text-pink-700' },
  indigo: { bg: 'bg-indigo-100', text: 'text-indigo-700' },
  gray: { bg: 'bg-gray-100', text: 'text-gray-700' },
};

const DataLibraryPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<UploadedFile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DataCategory | 'all'>('all');
  const [selectedBranch, setSelectedBranch] = useState<string | 'all'>('all');
  const [showArchived, setShowArchived] = useState(false);
  const [categoryStats, setCategoryStats] = useState<Record<DataCategory, number>>({} as any);
  const [branches, setBranches] = useState<Array<{ id: string; name: string; count: number }>>([]);

  // Verileri yükle
  useEffect(() => {
    if (currentUser?.email) {
      loadData();
    }
  }, [currentUser, showArchived]);

  const loadData = () => {
    if (!currentUser?.email) return;
    
    const userFiles = getUserUploadedFiles(currentUser.email, showArchived);
    setFiles(userFiles);
    setFilteredFiles(userFiles);
    
    const stats = getCategoryStats(currentUser.email);
    setCategoryStats(stats);
    
    const userBranches = getUserBranches(currentUser.email);
    setBranches(userBranches);
  };

  // Filtreleme
  useEffect(() => {
    let result = [...files];

    // Arama
    if (searchQuery) {
      result = result.filter(f => 
        f.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Kategori filtresi
    if (selectedCategory !== 'all') {
      result = result.filter(f => f.category === selectedCategory);
    }

    // Şube filtresi
    if (selectedBranch !== 'all') {
      result = result.filter(f => f.branchId === selectedBranch);
    }

    setFilteredFiles(result);
  }, [searchQuery, selectedCategory, selectedBranch, files]);

  const handleDelete = (fileId: string) => {
    if (confirm('Bu dosyayı kalıcı olarak silmek istediğinizden emin misiniz?')) {
      deleteUploadedFile(fileId);
      loadData();
    }
  };

  const handleToggleArchive = (fileId: string) => {
    toggleArchiveFile(fileId);
    loadData();
  };

  const handleCleanupArchive = () => {
    if (confirm('30 günden eski arşivlenmiş dosyalar silinecek. Devam etmek istiyor musunuz?')) {
      const deleted = cleanupArchivedFiles(currentUser?.email || '', 30);
      alert(`${deleted} dosya temizlendi.`);
      loadData();
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Lütfen giriş yapın.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-2xl shadow-lg mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <Database size={40} />
                <span>Veri Kütüphanem</span>
              </h1>
              <p className="text-blue-100 text-lg">
                Tüm verilerinizi kategorize edilmiş olarak yönetin
              </p>
            </div>
            <button
              onClick={() => navigate('/veri-girisi')}
              className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-md flex items-center gap-2"
            >
              <Upload size={20} />
              <span>Yeni Veri Yükle</span>
            </button>
          </div>

          {/* İstatistikler */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">{files.length}</div>
              <div className="text-sm text-blue-100">Toplam Dosya</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">
                {Object.keys(DATA_CATEGORIES).filter(k => categoryStats[k as DataCategory] > 0).length}
              </div>
              <div className="text-sm text-blue-100">Kategori</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">{branches.length}</div>
              <div className="text-sm text-blue-100">Şube</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">
                {files.filter(f => f.isArchived).length}
              </div>
              <div className="text-sm text-blue-100">Arşivlenmiş</div>
            </div>
          </div>
        </div>

        {/* Filtreler */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Arama */}
            <div className="md:col-span-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Dosya adı, açıklama veya etiket ile ara..."
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Kategori Filtresi */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Filter className="inline" size={16} /> Kategori
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as DataCategory | 'all')}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tümü ({files.length})</option>
                {Object.entries(DATA_CATEGORIES).map(([key, cat]) => (
                  <option key={key} value={key}>
                    {cat.icon} {cat.name} ({categoryStats[key as DataCategory] || 0})
                  </option>
                ))}
              </select>
            </div>

            {/* Şube Filtresi */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Building className="inline" size={16} /> Şube
              </label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                disabled={branches.length === 0}
              >
                <option value="all">Tümü</option>
                {branches.map(branch => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name} ({branch.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Arşiv Toggle */}
            <div className="flex items-end">
              <button
                onClick={() => setShowArchived(!showArchived)}
                className={`w-full px-4 py-2 rounded-lg font-semibold transition-colors ${
                  showArchived
                    ? 'bg-orange-100 text-orange-700 border-2 border-orange-300'
                    : 'bg-gray-100 text-gray-700 border-2 border-gray-300'
                }`}
              >
                {showArchived ? '📦 Arşiv Gösteriliyor' : '📂 Aktif Dosyalar'}
              </button>
            </div>
          </div>

          {/* Arşiv Temizleme */}
          {showArchived && files.filter(f => f.isArchived).length > 0 && (
            <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-center justify-between">
              <span className="text-sm text-orange-800">
                {files.filter(f => f.isArchived).length} arşiv dosyası var
              </span>
              <button
                onClick={handleCleanupArchive}
                className="px-3 py-1 bg-orange-600 text-white rounded text-sm font-semibold hover:bg-orange-700"
              >
                30+ Gün Eskilerini Temizle
              </button>
            </div>
          )}
        </div>

        {/* Dosya Listesi */}
        <div className="space-y-3">
          {filteredFiles.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <FileText className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchQuery || selectedCategory !== 'all' || selectedBranch !== 'all'
                  ? 'Filtre kriterlerine uygun dosya bulunamadı'
                  : 'Henüz veri yüklemediniz'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchQuery || selectedCategory !== 'all' || selectedBranch !== 'all'
                  ? 'Farklı filtreler deneyebilir veya arama sorgusunu değiştirebilirsiniz.'
                  : 'Başlamak için veri yükleme sayfasına gidin.'}
              </p>
              {!searchQuery && selectedCategory === 'all' && selectedBranch === 'all' && (
                <button
                  onClick={() => navigate('/veri-girisi')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Veri Yükle
                </button>
              )}
            </div>
          ) : (
            filteredFiles.map(file => {
              const category = DATA_CATEGORIES[file.category];
              
              return (
                <div
                  key={file.id}
                  className={`bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow ${
                    file.isArchived ? 'opacity-60 border-2 border-orange-300' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Dosya Adı ve İkon */}
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`text-3xl`}>
                          {category.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            {file.fileName}
                            {file.isArchived && (
                              <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full font-semibold">
                                Arşiv
                              </span>
                            )}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span className={`px-2 py-0.5 ${CATEGORY_COLORS[category.color]?.bg || 'bg-gray-100'} ${CATEGORY_COLORS[category.color]?.text || 'text-gray-700'} rounded-full font-medium`}>
                              {category.name}
                            </span>
                            {file.branchName && (
                              <span className="flex items-center gap-1">
                                <Building size={14} />
                                {file.branchName}
                              </span>
                            )}
                            <span>{formatFileSize(file.fileSize)}</span>
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              {formatDate(file.uploadedAt)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Açıklama */}
                      {file.description && (
                        <p className="text-sm text-gray-700 mt-2 ml-12">
                          {file.description}
                        </p>
                      )}

                      {/* Etiketler */}
                      {file.tags && file.tags.length > 0 && (
                        <div className="flex items-center gap-2 mt-2 ml-12">
                          <Tag size={14} className="text-gray-400" />
                          {file.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Veri Detayları */}
                      {(file.rowCount || file.columnCount) && (
                        <div className="text-xs text-gray-500 mt-2 ml-12">
                          {file.rowCount && `${file.rowCount} satır`}
                          {file.rowCount && file.columnCount && ' × '}
                          {file.columnCount && `${file.columnCount} sütun`}
                        </div>
                      )}
                    </div>

                    {/* Aksiyonlar */}
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => handleToggleArchive(file.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          file.isArchived
                            ? 'text-orange-600 hover:bg-orange-50'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                        title={file.isArchived ? 'Arşivden Çıkar' : 'Arşivle'}
                      >
                        {file.isArchived ? <ArchiveRestore size={20} /> : <Archive size={20} />}
                      </button>
                      <button
                        onClick={() => handleDelete(file.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Sil"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default DataLibraryPage;
