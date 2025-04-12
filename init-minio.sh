#!/bin/bash

# Wait for MinIO to be ready
until curl -s -f -o /dev/null "http://localhost:9000/minio/health/live"; do
  echo "Waiting for MinIO to be ready..."
  sleep 1
done

# Configure MinIO client
mc alias set myminio http://localhost:9000 minioadmin minioadmin

# Create bucket if it doesn't exist
mc mb myminio/orthanc --ignore-existing

# Set bucket policy to public read
mc policy set download myminio/orthanc

echo "MinIO initialization complete!" 