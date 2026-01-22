#!/bin/bash
# =====================================================
# FinOps AI Studio - Otomatik Kurulum Scripti
# =====================================================
# Bu script her şeyi otomatik yapar. Siz sadece çalıştırın!
# =====================================================

echo "🚀 FinOps AI Studio - Otomatik Kurulum Başlatılıyor..."
echo "=================================================="
echo ""

# Renk kodları
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. .env dosyası oluştur
echo -e "${BLUE}📝 Adım 1: .env dosyası oluşturuluyor...${NC}"

cat > .env << 'EOF'
# ============================================
# 🔐 ADMIN YETKİLENDİRME
# ============================================
VITE_ADMIN_PASSWORD=ATA1923Tesla
VITE_ADMIN_EMAIL=admin@finops.ist
ADMIN_PASSWORD=ATA1923Tesla
ADMIN_SESSION_SECRET=finops-super-secret-key-2026-secure-token-12345678

# ============================================
# 🔥 FIREBASE CONFIGURATION
# ============================================
VITE_FIREBASE_API_KEY=AIzaSyCUNupPVu-FxXaJW9jfyZ1PvWJRcp2-tcQ
VITE_FIREBASE_AUTH_DOMAIN=finopsprojesi-39510656-2ec03.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=finopsprojesi-39510656-2ec03
VITE_FIREBASE_STORAGE_BUCKET=finopsprojesi-39510656-2ec03.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=922068833510
VITE_FIREBASE_APP_ID=1:922068833510:web:4e0f0b7d8c8b8e8e8e8e8e

# ============================================
# 📧 EMAIL CONFIGURATION
# ============================================
SMTP_HOST=smtp.titan.email
SMTP_PORT=587
SMTP_USER=info@finops.ist
SMTP_PASSWORD=your-email-password-here

# ============================================
# 🌐 DOMAIN & CONTACT
# ============================================
VITE_DOMAIN=finops.ist
VITE_CONTACT_EMAIL=info@finops.ist

# ============================================
# 🔒 ENVIRONMENT
# ============================================
NODE_ENV=development
EOF

if [ -f .env ]; then
    echo -e "${GREEN}✅ .env dosyası oluşturuldu!${NC}"
else
    echo -e "${RED}❌ .env dosyası oluşturulamadı!${NC}"
    exit 1
fi

echo ""

# 2. Node modules kontrolü
echo -e "${BLUE}📦 Adım 2: Bağımlılıklar kontrol ediliyor...${NC}"

if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  node_modules bulunamadı. Yükleniyor...${NC}"
    npm install
    echo -e "${GREEN}✅ Bağımlılıklar yüklendi!${NC}"
else
    echo -e "${GREEN}✅ Bağımlılıklar mevcut!${NC}"
fi

echo ""

# 3. Firebase Admin SDK kontrol
echo -e "${BLUE}🔥 Adım 3: Firebase Admin SDK kontrol ediliyor...${NC}"

if ! npm list firebase-admin &> /dev/null; then
    echo -e "${YELLOW}⚠️  firebase-admin yükleniyor...${NC}"
    npm install firebase-admin
    echo -e "${GREEN}✅ firebase-admin yüklendi!${NC}"
else
    echo -e "${GREEN}✅ firebase-admin mevcut!${NC}"
fi

if ! npm list tsx &> /dev/null; then
    echo -e "${YELLOW}⚠️  tsx yükleniyor...${NC}"
    npm install -D tsx
    echo -e "${GREEN}✅ tsx yüklendi!${NC}"
else
    echo -e "${GREEN}✅ tsx mevcut!${NC}"
fi

echo ""

# 4. Özet
echo -e "${GREEN}=================================================="
echo -e "🎉 KURULUM TAMAMLANDI!"
echo -e "==================================================${NC}"
echo ""
echo -e "${BLUE}📋 Kurulum Özeti:${NC}"
echo -e "  ✅ .env dosyası oluşturuldu"
echo -e "  ✅ Şifreler ayarlandı (ATA1923Tesla)"
echo -e "  ✅ Bağımlılıklar yüklendi"
echo ""
echo -e "${YELLOW}⚠️  ÖNEMLİ NOT:${NC}"
echo -e "  Firebase Service Account Key'i almak için:"
echo -e "  1. https://console.firebase.google.com adresine gidin"
echo -e "  2. Project Settings > Service Accounts"
echo -e "  3. 'Generate New Private Key' butonuna tıklayın"
echo -e "  4. İndirilen JSON'u .env dosyasına ekleyin"
echo ""
echo -e "${GREEN}🚀 Uygulamayı başlatmak için:${NC}"
echo -e "  ${BLUE}npm run dev${NC}"
echo ""
echo -e "${GREEN}🔐 Giriş Bilgileri:${NC}"
echo -e "  ${BLUE}Kullanıcı:${NC} zaferyuzucu@gmail.com"
echo -e "  ${BLUE}Şifre:${NC} ATA1923Tesla"
echo ""
echo -e "  ${BLUE}Admin Panel:${NC} http://localhost:5173/admin-login"
echo -e "  ${BLUE}Admin Şifre:${NC} ATA1923Tesla"
echo ""
echo -e "${GREEN}📚 Yardım Dokümantasyonu:${NC}"
echo -e "  - SIFRE_GUNCELLEME_OZET.md"
echo -e "  - KULLANICI_MIGRATION_KILAVUZU.md"
echo ""
