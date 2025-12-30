# 🔐 FINOPS AI STUDIO - GÜVENLİK REHBERİ

## 📍 CHECKPOINT (NİRENGİ) SİSTEMİ

### ✅ YENİ CHECKPOINT OLUŞTURMA

Stabil bir noktaya geldiğinizde:

```bash
# 1. Tüm değişiklikleri kaydet
git add -A

# 2. Checkpoint oluştur (tarih ve açıklama ekle)
git commit -m "✅ CHECKPOINT-[İSİM]: [Açıklama]"

# 3. Kolay erişim için tag ekle
git tag -a "CHECKPOINT-[İSİM]" -m "Açıklama"
```

**ÖRNEK:**
```bash
git add -A
git commit -m "✅ CHECKPOINT-BETA2: CSV upload özelliği tamamlandı"
git tag -a "CHECKPOINT-BETA2" -m "CSV upload çalışıyor"
```

---

## ⏪ CHECKPOINT'E GERİ DÖNME

### 📌 MEVCUT CHECKPOINT'LERİ GÖRÜNTÜLE

```bash
# Tüm tag'leri listele
git tag -l

# Son 10 commit'i görüntüle
git log --oneline -10
```

### 🔙 GERİ DÖNÜŞ SEÇENEKLERİ

#### **OPTION 1: Tüm Değişiklikleri İptal Et (En Basit)**
```bash
# Tüm değişiklikleri sil, son commit'e dön
git reset --hard HEAD
```

#### **OPTION 2: Belirli Bir Checkpoint'e Dön**
```bash
# Tag adıyla geri dön
git reset --hard CHECKPOINT-BETA1-STABLE

# VEYA commit hash ile geri dön
git reset --hard 8158a3f9
```

#### **OPTION 3: Sadece Belirli Dosyaları Geri Al**
```bash
# Tek dosya geri al
git checkout HEAD -- src/App.tsx

# Klasör geri al
git checkout HEAD -- src/components/
```

---

## 📂 TIMELINE (YEREL GEÇMİŞ)

VS Code'da:

1. Bir dosyayı aç
2. Sağ tıkla → **"Open Timeline"**
3. Geçmiş değişiklikleri gör
4. İstediğin versiyonu kopyala

---

## 🆘 ACİL DURUM KOMUTLARI

### 🚨 "HER ŞEYİ BOZDUM, GERI AL!"
```bash
# Son checkpoint'e dön (CHECKPOINT-BETA1-STABLE)
cd /Users/zaferyuzucu/FINOPSPROJESİ/finops-ai-studio
git reset --hard CHECKPOINT-BETA1-STABLE
```

### 📦 YEDEK DOSYADAN GERİ YÜKLE
```bash
# Yedek listesini gör
ls -lh src_backup/

# Yedeği çıkart (tarih ve saat örnektir)
tar -xzf src_backup/FINOPS_PROJESI_BACKUP_Beta1_2025-12-26_11.49_v1.tar.gz -C /tmp/
```

### 🔍 SON DEĞİŞİKLİKLERİ GÖRÜNTÜLE
```bash
# Hangi dosyalar değişti?
git status

# Ne değişti? (detaylı)
git diff

# Hangi dosyalar stage'de?
git diff --cached
```

---

## 🎯 CHECKPOINT OLUŞTURMA ZAMANI

Şu durumlarda **MUTLAKA** checkpoint oluştur:

✅ **Yeni özellik çalıştı**  
✅ **Tüm testler geçti**  
✅ **Production'a hazır**  
✅ **Büyük değişiklik öncesi**  
✅ **Riskli işlem öncesi**

---

## 📊 MEVCUT CHECKPOINT'LER

### ✅ CHECKPOINT-BETA1-STABLE
- **Tarih:** 26 Aralık 2025, 11:49
- **Durum:** Stabil, tüm paketler yüklü
- **Açıklama:**
  - Tüm browser runtime kodları temizlendi
  - Çeviri dosyaları tamamlandı (1049 satır)
  - Eksik paketler yüklendi
  - Import yolları düzeltildi
  - Backup: `FINOPS_PROJESI_BACKUP_Beta1_2025-12-26_11.49_v1.tar.gz`

**GERİ DÖNÜŞ:**
```bash
git reset --hard CHECKPOINT-BETA1-STABLE
```

---

## 📝 NOTLAR

- Her checkpoint'te `CMD+S` yapın (dosyaları kaydedin)
- Tag adlarını anlamlı yapın (BETA1, FEATURE-CSV, vb.)
- Commit mesajlarında emoji kullanın (✅ ❌ 🔧 🎨)
- Büyük değişiklik öncesi **MUTLAKA** checkpoint oluşturun

---

## 🔗 HIZLI ERİŞİM KOMUTLARI

```bash
# Proje dizinine git
cd /Users/zaferyuzucu/FINOPSPROJESİ/finops-ai-studio

# Sunucuyu başlat
npm run dev

# Son checkpoint'e dön
git reset --hard CHECKPOINT-BETA1-STABLE

# Değişiklikleri gör
git status
```

---

**🛡️ GÜVENLİK İPUCU:**  
Şüphe duyduğunda, değişiklik yapmadan önce checkpoint oluştur!










