#!/bin/bash

# Script to set up and run the notes app
# Requires: Node.js, npm, and optionally PostgreSQL if DB is local.

set -e  # Exit on error

echo "🚀 Starting notes app setup..."

# Check for Node.js and npm
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Install it from https://nodejs.org/"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. It comes with Node.js."
    exit 1
fi

echo "✅ Node.js and npm detected."

# Set up .env if it doesn't exist
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "✅ .env file created from .env.example. Edit it with your Supabase credentials if needed."
    else
        echo "⚠️  .env.example not found. Create a .env file manually with required variables (e.g., SUPABASE_URL, SUPABASE_KEY)."
    fi
fi

# DB setup (if local PostgreSQL; adjust if using remote Supabase)
if command -v psql &> /dev/null; then
    echo "🔧 Setting up database..."
    # Assumes schema.sql in root or backend
    if [ -f "backend/schema.sql" ]; then
        # Create DB if not exists (adjust name and user)
        psql -U postgres -c "CREATE DATABASE IF NOT EXISTS notes_app;" || echo "⚠️  Could not create DB. Ensure PostgreSQL is running and configure the user."
        psql -U postgres -d notes_app -f backend/schema.sql
        echo "✅ DB schema applied."
    else
        echo "⚠️  backend/schema.sql not found. If using Supabase, ignore this."
    fi
else
    echo "⚠️  PostgreSQL not detected. If using local DB, install it. For Supabase, configure .env."
fi

# Install backend dependencies
if [ -d "backend" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend
    npm install
    cd ..
    echo "✅ Backend dependencies installed."
fi

# Install frontend dependencies
if [ -d "frontend" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
    echo "✅ Frontend dependencies installed."
fi

# Start the app (backend and frontend in parallel)
echo "🎯 Starting the app..."
if [ -d "backend" ] && [ -d "frontend" ]; then
    # Use concurrently if installed globally, or npm-run-all
    if command -v concurrently &> /dev/null; then
        concurrently "cd backend && npm start" "cd frontend && npm run dev"
    else
        echo "📦 Installing concurrently globally to run in parallel..."
        npm install -g concurrently
        concurrently "cd backend && npm start" "cd frontend && npm run dev"
    fi
elif [ -d "backend" ]; then
    cd backend && npm start
elif [ -d "frontend" ]; then
    cd frontend && npm run dev
else
    echo "❌ No backend or frontend folders found."
    exit 1
fi