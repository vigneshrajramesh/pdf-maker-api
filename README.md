# PDF Maker API

This is a Node.js API that generates PDF files from input images and provides a URL for downloading the generated PDF.

## Features

- Upload multiple images in PNG, JPEG, or JPG format.
- Converts the uploaded images into a PDF document.
- Provides a URL for downloading the generated PDF file.
- Handles error cases gracefully.

## Prerequisites

- Node.js installed on your machine.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/vigneshrajramesh/pdf-maker-api.git
    ```

2. Navigate to the project directory:

    ```bash
    cd pdf-maker-api
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the server:

    ```bash
    node index.js
    ```

## Usage

### Uploading Images

Send a POST request to `/generate-pdf` endpoint with images attached as multipart form data. The server will convert the images into a PDF file and provide a URL for downloading the generated PDF.

Example using cURL:

```bash
curl -X POST -F "images=@image1.jpg" -F "images=@image2.png" http://localhost:3000/generate-pdf
