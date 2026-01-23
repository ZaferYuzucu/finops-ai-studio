#!/bin/bash

echo "╔══════════════════════════════════════════════════════════╗"
echo "║         CACHE TEMİZLE + YENİDEN BAŞLAT                   ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Cache temizle
echo "🧹 Cache temizleniyor..."
rm -rf node_modules/.vite dist .vite
echo "✅ Cache temizlendi"
echo ""

# Dev server'ı durdur (eğer çalışıyorsa)
echo "🛑 Eski server'lar durduruluyor..."
pkill -f "vite" 2>/dev/null || true
echo ""

# Yeni server başlat
echo "🚀 Dev server başlatılıyor..."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ Server hazır olunca:"
echo "   http://localhost:5173/admin-login"
echo ""
echo "   Şifre gir → Admin paneli açılacak!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

npm run dev
