import { DatasetType } from './types';

export const DATASET_TYPE_OPTIONS: { value: DatasetType; label: string; icon: string; description: string }[] = [
  { 
    value: 'Sales', 
    label: 'Satış Verileri', 
    icon: '💰',
    description: 'Faturalar, siparişler, gelir kayıtları'
  },
  { 
    value: 'Expenses', 
    label: 'Gider/Masraf', 
    icon: '💸',
    description: 'Operasyonel giderler, faturalar, ödemeler'
  },
  { 
    value: 'Inventory', 
    label: 'Stok/Envanter', 
    icon: '📦',
    description: 'Depo kayıtları, ürün stok seviyeleri'
  },
  { 
    value: 'Production', 
    label: 'Üretim', 
    icon: '🏭',
    description: 'Üretim miktarları, fire, kapasite verileri'
  },
  { 
    value: 'HR', 
    label: 'İnsan Kaynakları', 
    icon: '👥',
    description: 'Personel, bordro, performans kayıtları'
  },
  { 
    value: 'Marketing', 
    label: 'Pazarlama', 
    icon: '📢',
    description: 'Kampanya verileri, reklam harcamaları'
  },
  { 
    value: 'Finance', 
    label: 'Finans/Muhasebe', 
    icon: '📊',
    description: 'Bilanço, gelir-gider tablosu, bütçe'
  },
  { 
    value: 'Agriculture', 
    label: 'Tarım', 
    icon: '🌱',
    description: 'Hasat, verim, dönüm başı üretim'
  },
  { 
    value: 'Custom', 
    label: 'Özel/Diğer', 
    icon: '📋',
    description: 'Sektörünüze özel diğer veri türleri'
  }
];

export const DATE_COLUMN_PATTERNS = [
  'date', 'tarih', 'işlem tarihi', 'transaction date', 
  'fatura tarihi', 'invoice date', 'ödeme tarihi', 'payment date',
  'sipariş tarihi', 'order date', 'created_at', 'created'
];

export const VALUE_COLUMN_PATTERNS = [
  'value', 'amount', 'tutar', 'miktar', 'değer', 
  'fiyat', 'price', 'toplam', 'total', 'gelir', 'revenue',
  'gider', 'expense', 'maliyet', 'cost', 'kâr', 'profit'
];

export const CATEGORY_COLUMN_PATTERNS = [
  'category', 'kategori', 'tür', 'type', 'sınıf', 'class',
  'hesap kodu', 'account', 'ürün', 'product', 'masraf türü',
  'expense type', 'departman', 'department'
];

export const ENTITY_COLUMN_PATTERNS = [
  'entity', 'firma', 'company', 'müşteri', 'customer',
  'tedarikçi', 'supplier', 'vendor', 'personel', 'employee',
  'şirket', 'organization'
];

export const STANDARD_COLUMNS = [
  { key: 'date', label: 'Tarih', required: true, type: 'date' },
  { key: 'entity', label: 'Varlık/Kişi', required: false, type: 'string' },
  { key: 'category', label: 'Kategori', required: false, type: 'string' },
  { key: 'sub_category', label: 'Alt Kategori', required: false, type: 'string' },
  { key: 'metric', label: 'Metrik Adı', required: false, type: 'string' },
  { key: 'value', label: 'Değer', required: true, type: 'number' },
  { key: 'currency', label: 'Para Birimi', required: false, type: 'string' },
  { key: 'unit', label: 'Birim', required: false, type: 'string' },
  { key: 'source', label: 'Kaynak', required: false, type: 'string' },
  { key: 'notes', label: 'Notlar', required: false, type: 'string' }
] as const;

export const SUPPORTED_FILE_TYPES = [
  '.xlsx',
  '.xls',
  '.csv',
  '.tsv'
];

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

