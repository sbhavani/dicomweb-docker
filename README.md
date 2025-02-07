# DICOM Web Server with Orthanc, MinIO and OHIF Viewer

## Overview

This project provides a complete DICOM web server setup using Orthanc as the DICOM server, MinIO for object storage, and OHIF for web-based DICOM viewing.

This connects to the frontend built on Next.js with Postgres.

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

3. View uploaded studies:
   - OHIF Viewer: http://localhost:3000
   - Orthanc Explorer: http://localhost:8042
   - MinIO Console: http://localhost:9001 (login with credentials from .env file)

## Architecture

1. **Orthanc DICOM Server**: 
   - Core DICOM server with DICOMweb support
   - Web interface accessible via port 8042
   - Features enabled:
     - DICOMweb Plugin
     - OHIF Plugin
     - CORS support
     - S3 storage integration with MinIO
   - SQLite database for metadata storage

2. **MinIO**:
   - Object storage server for DICOM files
   - Ports:
     - 9000: API endpoint
     - 9001: Web console
   - Configured using environment variables for credentials
   - Data persistence through volume mounting at ./dicom-data

3. **OHIF Viewer**:
   - Zero-footprint DICOM viewer
   - Accessible on port 3000
   - Custom configuration via ohif.js
   - Integrated with Orthanc's DICOMweb endpoints

4. **Nginx**:
   - Reverse proxy for the web services
   - Handles routing and load balancing
   - Accessible on port 3080

## Configuration Files
- `.env`: Environment variables for MinIO credentials
- `nginx.conf`: Nginx reverse proxy configuration
- `ohif.js`: OHIF viewer configuration
- `docker-compose.yml`: Service orchestration

## Storage Structure
- `dicom-data/`: MinIO storage directory
- `orthanc-sqlite-storage`: Docker volume for Orthanc's SQLite database

## Roadmap
- [ ] Add support for Caddy as reverse proxy
- [ ] Integrate with a PACS
- [ ] Add support for DICOMweb client in OHIF Viewer

## References
- https://github.com/aws-samples/dicomweb-wado-qido-stow-serverless
- https://book.orthanc-server.com/
- https://docs.ohif.org/
