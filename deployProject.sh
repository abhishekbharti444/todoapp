#!/bin/bash

# Print commands as they are executed
set -x

# Stop on any error
set -e

# Remove existing build files
rm -rf dist
rm -rf node_modules/.vite
rm -rf node_modules

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
npm install

# Make sure we're on the main branch
git checkout main || {
    echo "Failed to checkout main branch"
    exit 1
}

# Pull latest changes
git pull origin main || {
    echo "Failed to pull latest changes"
    exit 1
}

# Add all changes to git
git add . || {
    echo "Failed to stage changes"
    exit 1
}

# Commit changes (will not fail if there's nothing to commit)
git commit -m "Updates before deployment" || true

# Push to main branch
git push origin main || {
    echo "Failed to push to main branch"
    exit 1
}

# Build the project
npm run build || {
    echo "Build failed!"
    exit 1
}

# Create .nojekyll file
touch dist/.nojekyll

# Deploy using gh-pages
# This will create/update the gh-pages branch and push to GitHub
npm run deploy || {
    echo "Deployment failed!"
    exit 1
}

# Print completion message
echo "Deployment completed! Please check https://abhishekbharti444.github.io/todoapp/"

# Print additional information
echo "Note: It might take a few minutes for GitHub Pages to update."
echo "If you don't see your changes, please:"
echo "1. Check the Actions tab on GitHub for deployment status"
echo "2. Clear your browser cache"
echo "3. Wait a few minutes and try again"
