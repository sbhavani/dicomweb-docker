# DICOM Web Server with CouchDB and MinIO

## Overview

This project is a DICOM web server that uses CouchDB and MinIO to store and retrieve DICOM files.

## Quickstart
```dcmsend -v localhost 32773 -aec INTELPIXEL -aet ASTER +r +sd -nh test.dcm```

### Files to edit
- development.js.example
- .env

## Architecture

The architecture of this DICOM web server project is composed of several key components, each serving a specific role in the system:

1. **DICOM Web Server**: 
   - Built using the `dicomweb-server` from the [dcmjs-org](https://github.com/dcmjs-org/dicomweb-server) repository.
   - Runs on Node.js and is responsible for handling DICOM file storage and retrieval requests.

2. **CouchDB**:
   - Used as the database server to store metadata and other relevant information.
   - Configured to run on port 5984 and is initialized with system databases `_users`, `_replicator`, and `_global_changes`.

3. **MinIO**:
   - Acts as the object storage server for storing DICOM files.
   - Accessible via ports 9000 and 9001, with credentials set through environment variables `MINIO_ACCESS_KEY` and `MINIO_SECRET_KEY`.

4. **DICOM Listener**:
   - Utilizes the `darthunix/dcmtk` Docker image to listen for incoming DICOM files on port 32773.
   - Configured to store received files in a specified directory.

5. **Networking**:
   - All services are connected through a Docker network named `intelpixel`, allowing seamless communication between components.

6. **Docker and Docker Compose**:
   - The entire setup is containerized using Docker, with a `Dockerfile` to build the DICOM web server image and a `docker-compose.yml` file to orchestrate the multi-container application.

This architecture ensures a scalable and efficient system for managing DICOM files, leveraging the strengths of CouchDB for database management and MinIO for object storage.

### Dependencies
- https://github.com/dcmjs-org/dicomweb-server

