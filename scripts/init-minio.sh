#!/bin/bash

# Wait for MinIO to be ready (fixed wait instead of health check)
echo "Waiting for MinIO to start up (sleeping for 5 seconds)..."
sleep 5

# Configure MinIO client
mc alias set myminio http://localhost:9000 minioadmin minioadmin

# Create bucket if it doesn't exist
mc mb myminio/orthanc --ignore-existing

# Set bucket policy to public read
mc policy set download myminio/orthanc

echo "MinIO initialization complete!" 