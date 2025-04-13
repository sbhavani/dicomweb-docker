# DICOM Web Server with Orthanc and OHIF Viewer

## Overview

This project provides a complete DICOM web server setup using:
- Orthanc as the DICOM server with DICOMweb support
- MinIO for object storage
- OHIF for web-based DICOM viewing
- DICOM Listener (storescp) for automatic DICOM file processing

## Project Structure

```
dicomweb-docker/
├── config/                  # Configuration files
│   ├── nginx/               # Nginx configuration
│   ├── ohif/                # OHIF Viewer configuration
│   ├── orthanc/             # Orthanc configuration
│   └── minio/               # MinIO configuration
├── docker/                  # Custom Dockerfiles
├── scripts/                 # Helper scripts
├── volumes/                 # Persistent data volumes
│   ├── customer/            # Customer data
│   ├── minio-data/          # MinIO data
│   └── orthanc-db/          # Orthanc SQLite database
├── test/                    # Test files and resources
│   └── dicom/               # Test DICOM files
├── .env                     # Environment variables
├── .env.example             # Example environment file
├── docker-compose.yml       # Docker service orchestration
└── README.md                # Documentation
```

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
MINIO_ROOT_USER=minioadmin
MINIO_ROOT_PASSWORD=minioadmin
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
   - Uses dcmtk for DICOM operations
   - Automatically processes DICOM files from ./customer/${CUSTOMER}/uploads
   - AE Title: INNOVATIONDX

2. **Orthanc DICOM Server**: 
   - Core DICOM server with DICOMweb support
   - Web interface accessible via port 8042
   - Features enabled:
     - DICOMweb Plugin
     - OHIF Plugin
     - CORS support
     - S3 storage integration with MinIO
   - SQLite database for metadata storage (persisted in orthanc-sqlite-storage volume)

3. **MinIO**:
   - Object storage server for DICOM files
   - Ports:
     - 9000: API endpoint
     - 9001: Web console
   - Default credentials:
     - Username: minioadmin
     - Password: minioadmin
   - Data persistence through minio-data volume

4. **OHIF Viewer**:
   - Zero-footprint DICOM viewer
   - Accessible on port 8080
   - Custom configuration via ohif.js
   - Integrated with Orthanc's DICOMweb endpoints

5. **Nginx**:
   - Reverse proxy for the web services
   - Handles routing and load balancing
   - Accessible on port 3080
   - Configuration in nginx.conf

## Configuration Files
- `.env`: Environment variables for credentials
- `.env.example`: Template for environment variables
- `config/nginx/nginx.conf`: Nginx reverse proxy configuration
- `config/ohif/ohif.js`: OHIF viewer configuration
- `docker-compose.yml`: Service orchestration

## Storage Structure
- `volumes/customer/${CUSTOMER}/uploads`: Directory for DICOM file uploads
- `volumes/minio-data`: Docker volume for MinIO storage
- `volumes/orthanc-db`: Docker volume for Orthanc's SQLite database

## Future Roadmap
- Add DICOM Listener (storescp) for automatic DICOM file processing
- Add Prometheus and Grafana for monitoring
- Add Authentication and proxy with Caddy/nginx
- Add DICOM Gateway frontend

## References
- https://github.com/aws-samples/dicomweb-wado-qido-stow-serverless
- https://book.orthanc-server.com/
- https://docs.ohif.org/
