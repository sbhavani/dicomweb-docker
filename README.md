# DICOM Web Server with SQLite and MinIO

## Overview

This project is a DICOM web server using Node.js, SQLite and MinIO to store and retrieve DICOM files.

The architecture provides a scalable DICOM management system with clear separation of concerns between file storage, metadata management, and DICOM communication protocols.

## Quickstart
1. Upload a DICOM file to the server
```dcmsend -v localhost 32773 -aec INTELPIXEL -aet ASTER +r +sd -nh test.dcm```

2. Get study list
```dicomweb_client --url http://localhost:5985 search studies```

We test with a Python implementation dicomweb_client.

3. View the file in the MinIO web interface

4. View the file in the OHIF viewer

### Files to edit
- development.js.example
- .env

## Architecture

1. **DICOM Web Server**: 
   - Runs on Node.js 20.x LTS and exposes port 5001
   - Handles DICOM file storage and retrieval requests
   - Web interface accessible via port 8080 (OHIF viewer)
   - DIMSE port available on 8888

2. **SQLite**:
   - Used as the database server to store metadata

3. **MinIO**:
   - Object storage server for DICOM files
   - Accessible via ports:
     - 9000: API endpoint
     - 9001: Web console
   - Configured using environment variables for credentials
   - Data persistence through volume mounting at /data
   - Includes health checking every 30 seconds

4. **DICOM Listener**:
   - Based on darthunix/dcmtk Docker image
   - Listens on port 32773 (mapped to internal port 104)
   - Configured with AE Title: INTELPIXEL
   - Stores received files in customer-specific upload directory
   - Automatically adds .dcm extension to received files

5. **Storage Structure**:
   - Customer-specific storage organization
   - Separate upload directories for each customer
   - Ignores .dcm files and customer directories in version control

6. **Docker and Docker Compose**:
   - Multi-container setup with custom networking
   - All services connected through 'intelpixel' network
   - Volume mappings for persistent storage:
     - DICOM data: ./dicom_data:/app/data
     - Customer uploads: ./customer/${CUSTOMER}/uploads:/dcmfiles
     - MinIO storage: ./customer/${CUSTOMER}:/data
