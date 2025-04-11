# DICOM Web Server with Orthanc, MinIO and OHIF Viewer

## Overview

This project provides a complete DICOM web server setup using Orthanc as the DICOM server, MinIO for object storage, and OHIF for web-based DICOM viewing.

## Docker Setup

Before running this project, you'll need to set up Docker and Docker Compose:

1. **Install Docker Desktop**:
   - Download Docker Desktop from [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)
   - Run the installer and follow the setup wizard
   - Restart your computer after installation

2. **Verify Installation**:
   - Open terminal
   - Run `docker --version` to verify Docker installation
   - Run `docker-compose --version` to verify Docker Compose installation

3. **Configure Docker Desktop**:
   - Open Docker Desktop
   - Go to Settings > Resources
   - Allocate at least 4GB of RAM and 2 CPU cores

## Environment Setup

1. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

2. Edit the `.env` file with your desired credentials:
```
MINIO_ROOT_USER=your_minio_username
MINIO_ROOT_PASSWORD=your_minio_password
CUSTOMER=your_customer_name
```

## Quickstart

1. Start the services:
```bash
docker-compose up -d
```

2. Upload a DICOM file using one of these methods:
   - Using DICOMweb (STOW-RS):
   ```bash
   curl -X POST http://localhost:8042/dicom-web/studies -H "Content-Type: application/dicom" --data-binary @test.dcm
   ```
   - Using Orthanc's API:
   ```bash
   curl -X POST -H "Content-Type: application/dicom" --data-binary @test.dcm http://localhost:8042/instances
   ```
   - Using DICOM listener (storescp):
   ```bash
   # Files placed in ./customer/${CUSTOMER}/uploads will be automatically processed
   ```

3. View uploaded studies:
   - OHIF Viewer: http://localhost:8080
   - Orthanc Explorer: http://localhost:8042
   - MinIO Console: http://localhost:9001 (login with credentials from .env file)
   - Nginx Proxy: http://localhost:3080

## Architecture

1. **DICOM Listener (storescp)**:
   - Listens on port 104 (mapped to 32773)
   - Automatically processes DICOM files from upload directory
   - Uses dcmtk for DICOM operations

2. **Orthanc DICOM Server**: 
   - Core DICOM server with DICOMweb support
   - Web interface accessible via port 8042
   - Features enabled:
     - DICOMweb Plugin
     - OHIF Plugin
     - CORS support
     - S3 storage integration with MinIO
   - SQLite database for metadata storage

3. **MinIO**:
   - Object storage server for DICOM files
   - Ports:
     - 9000: API endpoint
     - 9001: Web console
   - Configured using environment variables for credentials
   - Data persistence through volume mounting

4. **OHIF Viewer**:
   - Zero-footprint DICOM viewer
   - Accessible on port 8080
   - Custom configuration via ohif.js
   - Integrated with Orthanc's DICOMweb endpoints

5. **Nginx**:
   - Reverse proxy for the web services
   - Handles routing and load balancing
   - Accessible on port 3080

## Configuration Files
- `.env`: Environment variables for credentials
- `.env.example`: Template for environment variables
- `nginx.conf`: Nginx reverse proxy configuration
- `ohif.js`: OHIF viewer configuration
- `docker-compose.yml`: Service orchestration

## Storage Structure
- `./customer/${CUSTOMER}/uploads`: Directory for DICOM file uploads
- `minio-data`: Docker volume for MinIO storage
- `orthanc-sqlite-storage`: Docker volume for Orthanc's SQLite database

## References
- https://github.com/aws-samples/dicomweb-wado-qido-stow-serverless
- https://book.orthanc-server.com/
- https://docs.ohif.org/
