#!/bin/bash

echo "╔══════════════════════════════════════════════════════════╗"
echo "║         FINOPS AI STUDIO - LOCALHOST BAŞLATICI           ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Cache temizle
echo "🧹 Cache temizleniyor..."
rm -rf node_modules/.vite dist .vite
echo "✅ Cache temizlendi"
echo ""

# Dev server başlat
echo "🚀 Dev server başlatılıyor..."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

npm run dev

# Not: Server Ctrl+C ile durdurulur
