## automotive-after-sales-performance-001

Servis ve after-sales performans verisi. Servis türüne göre iş emri hacmi, gelir-maliyet, ortalama tamir süresi, teknisyen saatleri ve parça gelirlerini içerir.

### Kolonlar
- `Ay` (YYYY-MM)
- `Servis_Turu` (Periyodik Bakım, Mekanik Onarım, Kaporta & Boya, Elektrik/Diagnostik, Sigorta, Aksesuar)
- `Is_Emri_Sayisi`
- `Gelir_TL`, `Maliyet_TL`, `Parca_Geliri_TL`
- `Ortalama_Tamir_Suresi_Saat`
- `Teknisyen_Saat`, `Faturalanan_Saat`

### Önerilen Sorgular
- Servis türü bazlı gelir ve brüt kâr
- Aksesuar & sigorta gelir payı
- Teknisyen saat verimliliği = Faturalanan_Saat / Teknisyen_Saat
- Ortalama tamir süresi trendi

### Kullanım
Servis & After-Sales dashboard'unda KPI kartları (servis geliri, brüt kâr, teknisyen verimliliği), grafikler (iş emri hacmi, gelir-maliyet kıyaslaması, tamir süresi trendi) için paylaşılır.

