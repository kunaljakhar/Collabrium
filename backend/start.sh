#!/bin/bash

# Exit on any failure
set -e

echo "🚀 Starting Partnership Goals Backend..."

# Initialize database if it doesn't exist
echo "📊 Initializing database..."
python db_setup.py

# Download required models if they don't exist (cache them)
echo "🤖 Preparing AI models..."
python -c "
from transformers import AutoTokenizer, AutoModel, pipeline
import os

models = [
    'sentence-transformers/all-MiniLM-L6-v2',
    'gpt2',
    'cardiffnlp/twitter-roberta-base-emotion',
    'sentence-transformers/paraphrase-MiniLM-L6-v2'
]

for model in models:
    try:
        print(f'Loading {model}...')
        if 'sentence-transformers' in model:
            AutoTokenizer.from_pretrained(model)
            AutoModel.from_pretrained(model)
        else:
            pipeline('text-generation' if 'gpt2' in model else 'text-classification', model=model)
        print(f'✅ {model} loaded successfully')
    except Exception as e:
        print(f'⚠️  Warning: Could not preload {model}: {e}')
"

echo "🌟 Starting FastAPI server..."

# Start the application
exec uvicorn main:app \
    --host 0.0.0.0 \
    --port ${PORT:-8000} \
    --workers 1 \
    --access-log \
    --loop uvloop \
    --http httptools 