const express = require('express');
const PDFDocument = require('pdfkit');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up multer for handling file uploads
const upload = multer({ dest: 'uploads/' });

// Function to generate a unique filename for the PDF
function generatePdfFilename() {
  return `generated-${Date.now()}.pdf`;
}

// Function to get the public URL for a PDF file
function getPdfUrl(pdfFilename) {
  return `/pdfs/${pdfFilename}`;
}

app.post('/generate-pdf', upload.array('images', 10), (req, res) => {
  const doc = new PDFDocument();

  // Generate a unique filename for the PDF
  const pdfFilename = generatePdfFilename();
  const pdfPath = path.join(__dirname, 'public', 'pdfs', pdfFilename);

  // Ensure the directory structure exists
  const pdfDir = path.dirname(pdfPath);
  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir, { recursive: true });
  }

  // Pipe the PDF content to a file
  const writeStream = fs.createWriteStream(pdfPath);
  doc.pipe(writeStream);

  // Add images to PDF
  req.files.forEach(file => {
    doc.addPage().image(file.path, {
      fit: [250, 250], // Adjust image dimensions as needed
      align: 'center',
      valign: 'center'
    });
  });

  // Finalize the PDF
  doc.end();

  // Cleanup uploaded files
  req.files.forEach(file => {
    fs.unlinkSync(file.path);
  });

  // Return the URL for the generated PDF
  const pdfUrl = getPdfUrl(pdfFilename);
  res.status(201).json({ pdfUrl });
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
