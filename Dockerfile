# Use Python 3.11 slim image for better performance and smaller size
FROM python:3.11-slim as base

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=/app \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    software-properties-common \
    git \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user for security
RUN adduser --disabled-password --gecos '' --shell /bin/bash appuser \
    && chown -R appuser:appuser /app
USER appuser

# Copy requirements first for better Docker layer caching
COPY --chown=appuser:appuser requirements.txt .

# Install Python dependencies
RUN pip install --user --no-cache-dir -r requirements.txt

# Copy application code
COPY --chown=appuser:appuser ./backend ./backend

# Set working directory to backend
WORKDIR /app/backend

# Create necessary directories
RUN mkdir -p /app/backend/models && \
    mkdir -p /app/backend/data

# Make startup script executable
RUN chmod +x /app/backend/start.sh

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/docs || exit 1

# Run the application using startup script
CMD ["./start.sh"] 