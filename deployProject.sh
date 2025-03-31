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

# Remove gh-pages branch locally and remotely (ignore errors if branch doesn't exist)
git branch -D gh-pages || true
git push origin --delete gh-pages || true

# Commit any pending changes
git add .
git commit -m "Update before deployment" || true
git push || true

# Build and deploy
npm run build || {
    echo "Build failed!"
    exit 1
}

npm run deploy

# Print completion message
echo "Deployment completed! Please check https://abhishekbharti444.github.io/todoapp/"
