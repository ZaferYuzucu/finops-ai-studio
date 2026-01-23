#!/bin/bash

# OTONOM ADMİN OLUŞTURUCU SCRIPT
# Bu script'i çalıştır, admin olacaksın!

echo "╔══════════════════════════════════════════════════════════╗"
echo "║        OTONOM ADMİN AYARLAYICI                          ║"
echo "║        zaferyuzucu@gmail.com → ADMIN                    ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Firebase Service Account Key kontrolü
if [ -z "$FIREBASE_SERVICE_ACCOUNT_KEY" ]; then
    echo "❌ HATA: FIREBASE_SERVICE_ACCOUNT_KEY bulunamadı"
    echo ""
    echo "📋 ÇÖZÜM - 3 BASIT ADIM:"
    echo ""
    echo "1️⃣  Firebase Console'a git:"
    echo "   https://console.firebase.google.com/project/finopsprojesi-39510656-2ec03/settings/serviceaccounts/adminsdk"
    echo ""
    echo "2️⃣  'Generate New Private Key' butonuna tıkla"
    echo "   İndirilen JSON dosyasını aç"
    echo ""
    echo "3️⃣  Bu komutu çalıştır (JSON içeriğini yapıştır):"
    echo "   export FIREBASE_SERVICE_ACCOUNT_KEY='BURAYA_JSON_YAPISTIR'"
    echo ""
    echo "4️⃣  Sonra bu script'i tekrar çalıştır:"
    echo "   ./OTOMATIK_ADMIN.sh"
    echo ""
    exit 1
fi

echo "✅ Firebase credentials bulundu"
echo ""

# Node.js kontrolü
if ! command -v node &> /dev/null; then
    echo "❌ HATA: Node.js bulunamadı"
    echo "📋 ÇÖZÜM: Node.js yükle: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js bulundu: $(node --version)"
echo ""

# tsx kontrolü ve yükleme
if ! command -v npx &> /dev/null; then
    echo "❌ HATA: npx bulunamadı"
    exit 1
fi

echo "🚀 Admin rolü ayarlanıyor..."
echo ""

# Script'i çalıştır
npx tsx scripts/set-admin-role.ts

if [ $? -eq 0 ]; then
    echo ""
    echo "╔══════════════════════════════════════════════════════════╗"
    echo "║                  🎉 BAŞARILI!                           ║"
    echo "╚══════════════════════════════════════════════════════════╝"
    echo ""
    echo "✅ zaferyuzucu@gmail.com artık ADMIN!"
    echo ""
    echo "📍 ŞIMDI NE YAPACAKSIN?"
    echo ""
    echo "1. Tarayıcıda aç:"
    echo "   http://localhost:5173/admin-login"
    echo ""
    echo "2. Giriş bilgileri:"
    echo "   Email: zaferyuzucu@gmail.com"
    echo "   Şifre: Zafer1961"
    echo ""
    echo "3. 'Giriş Yap' butonuna tıkla"
    echo ""
    echo "4. ✅ Admin paneline yönlendirileceksin!"
    echo ""
else
    echo ""
    echo "❌ Script başarısız oldu"
    echo "📋 Lütfen hata mesajlarını oku ve düzelt"
    exit 1
fi
