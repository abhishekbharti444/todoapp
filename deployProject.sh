#!/bin/bash

# Print commands as they are executed
set -x

# Remove existing build files
rm -rf dist
rm -rf node_modules/.vite
rm -rf node_modules

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
npm install

# Make sure the src/main.jsx file exists
if [ ! -f "src/main.jsx" ]; then
    echo "Error: src/main.jsx not found!"
    exit 1
fi

# Commit any pending changes to main branch
git add .
git commit -m "Update before deployment" || true
git push origin main || true

# Build the project
npm run build || {
    echo "Build failed!"
    exit 1
}

# Deploy using gh-pages (this will create/update gh-pages branch automatically)
npm run deploy

# Print completion message
echo "Deployment completed! Please check https://abhishekbharti444.github.io/todoapp/"
