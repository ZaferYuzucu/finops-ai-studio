import { useEffect, useState } from 'react';
import Papa from 'papaparse';

export interface AutomotiveOperationsRow {
  Ay: string;
  Arac_Grubu: string;
  Gelir_TL: number;
  COGS_TL: number;
  Brut_Kar_TL: number;
  Nakit_Akisi_TL: number;
  Satilan_Adet: number;
}

export interface AutomotiveSalesRow {
  Ay: string;
  Satis_Ajani: string;
  Arac_Grubu: string;
  Hedef_Adet: number;
  Gerceklesen_Adet: number;
  Gelir_TL: number;
  Brut_Kar_TL: number;
}

export interface AutomotiveServiceRow {
  Ay: string;
  Servis_Turu: string;
  Is_Emri_Sayisi: number;
  Gelir_TL: number;
  Maliyet_TL: number;
  Ortalama_Tamir_Suresi_Saat: number;
  Teknisyen_Saat: number;
  Faturalanan_Saat: number;
  Parca_Geliri_TL: number;
}

const CSV_PATHS = {
  operations: '/demo-data/automotive/otomotiv_dealer_yillik_operasyon_finans.csv',
  sales: '/demo-data/automotive/otomotiv_dealer_satis_kpi_detay.csv',
  service: '/demo-data/automotive/otomotiv_servis_aksesuar_sigorta_detay.csv',
};

async function parseCsv<T>(url: string): Promise<T[]> {
  const response = await fetch(url);
  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse<T>(csvText, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: (error) => reject(error),
    });
  });
}

export function useAutomotiveDemoData() {
  const [operations, setOperations] = useState<AutomotiveOperationsRow[]>([]);
  const [sales, setSales] = useState<AutomotiveSalesRow[]>([]);
  const [service, setService] = useState<AutomotiveServiceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const loadAll = async () => {
      try {
        setLoading(true);
        const [ops, saleRows, serviceRows] = await Promise.all([
          parseCsv<AutomotiveOperationsRow>(CSV_PATHS.operations),
          parseCsv<AutomotiveSalesRow>(CSV_PATHS.sales),
          parseCsv<AutomotiveServiceRow>(CSV_PATHS.service),
        ]);
        if (cancelled) return;
        setOperations(ops);
        setSales(saleRows);
        setService(serviceRows);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        console.error('Automotive demo CSV load error', err);
        setError('Veri yüklenirken bir sorun oluştu.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadAll();
    return () => {
      cancelled = true;
    };
  }, []);

  return {
    operations,
    sales,
    service,
    loading,
    error,
    isReady: !loading && !error,
  };
}

export default useAutomotiveDemoData;
