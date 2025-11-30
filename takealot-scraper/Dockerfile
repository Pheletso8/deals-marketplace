# Use Playwright Python base
FROM mcr.microsoft.com/playwright/python:latest

WORKDIR /app

# Copy requirements
COPY requirements.txt .

# Install requirements including uvicorn
RUN pip install --no-cache-dir -r requirements.txt \
    && pip install uvicorn[standard] fastapi

# Copy app code
COPY app /app/app

# Expose port
EXPOSE 8000

# Start Uvicorn server
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]