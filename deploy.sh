#!/bin/bash
# Sophia's Clean — one-command deploy to surge.sh
# Run: ./deploy.sh
# First time: surge will ask for email + a new password (one time only)
# After that: future deploys are instant — no password needed

set -e

cd "$(dirname "$0")"

echo "📦  Building production bundle..."
npm run build

echo "🔁  Adding SPA fallback..."
cp dist/index.html dist/200.html

echo "🚀  Deploying to https://sophias-clean.surge.sh ..."
npx surge dist/ sophias-clean.surge.sh

echo ""
echo "✅  Live at: https://sophias-clean.surge.sh"
echo "   Share this link over WhatsApp."
