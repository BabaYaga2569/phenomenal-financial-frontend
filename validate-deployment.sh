#!/bin/bash

# GitHub Pages Deployment Validation Script
# This script validates that the React app is properly configured for GitHub Pages deployment

set -e

echo "🔍 Validating GitHub Pages deployment configuration..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Run this script from the project root."
    exit 1
fi

# Validate package.json homepage
echo "📦 Checking package.json configuration..."
HOMEPAGE=$(node -p "require('./package.json').homepage")
if [ "$HOMEPAGE" = "https://babayaga2569.github.io/phenomenal-financial-frontend" ]; then
    echo "✅ Homepage correctly configured: $HOMEPAGE"
else
    echo "❌ Homepage misconfigured. Expected: https://babayaga2569.github.io/phenomenal-financial-frontend"
    echo "   Actual: $HOMEPAGE"
    exit 1
fi

# Check if GitHub Actions workflow exists
echo ""
echo "🔧 Checking GitHub Actions workflow..."
if [ -f ".github/workflows/deploy.yml" ]; then
    echo "✅ Deploy workflow found: .github/workflows/deploy.yml"
else
    echo "❌ Deploy workflow not found"
    exit 1
fi

# Validate build process
echo ""
echo "🏗️ Testing build process..."
npm run build > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

# Check build outputs
echo ""
echo "📂 Validating build outputs..."

if [ -f "build/index.html" ]; then
    echo "✅ index.html generated"
else
    echo "❌ index.html not found in build directory"
    exit 1
fi

if [ -f "build/.nojekyll" ]; then
    echo "✅ .nojekyll file present (prevents Jekyll processing)"
else
    echo "❌ .nojekyll file missing"
    exit 1
fi

if [ -d "build/static" ]; then
    echo "✅ Static assets directory present"
else
    echo "❌ Static assets directory missing"
    exit 1
fi

# Check if paths are correctly configured
echo ""
echo "🔗 Checking asset paths..."
if grep -q "/phenomenal-financial-frontend/" build/index.html; then
    echo "✅ Asset paths correctly configured for subdirectory"
else
    echo "❌ Asset paths not configured for subdirectory"
    exit 1
fi

echo ""
echo "🎉 All validations passed!"
echo ""
echo "🚀 Your React app is properly configured for GitHub Pages deployment."
echo ""
echo "📋 Next steps:"
echo "   1. Ensure GitHub Pages is configured to use 'GitHub Actions' as source"
echo "   2. Push changes to main branch to trigger deployment"
echo "   3. Visit: https://babayaga2569.github.io/phenomenal-financial-frontend/"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT_GUIDE.md"