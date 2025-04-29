import QRCode from "qrcode"

/**
 * Escapes HTML special characters to prevent XSS attacks
 * @param {string} str - String to escape
 * @returns {string} - Escaped string
 */
const escapeHtml = (str) => {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
}

/**
 * Generates a QR code from a URL and opens a printable window
 *
 * @param {string} url - The URL to encode in the QR code
 * @param {string} title - The title to display in the printable page
 * @param {string} description - The description to display in the printable page
 * @param {Object} options - Options for QR code generation
 * @returns {Promise<boolean>} - Returns true on success
 */
export const generateQRCodeAndPrint = async (url, title, description, options = { width: 300 }) => {
    try {
        if (!url || !title || !description) {
            throw new Error("URL, title, and description are required")
        }

        // Sanitize inputs
        const safeUrl = escapeHtml(url)
        const safeTitle = escapeHtml(title)
        const safeDescription = escapeHtml(description)

        const qrDataUrl = await QRCode.toDataURL(url, options)

        const printWindow = window.open("", "_blank")

        if (!printWindow) {
            throw new Error("Please allow pop-ups to generate the QR code")
        }

        printWindow.document.write(`
      <html>
        <head>
          <title>${safeTitle} - QR Code</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta charset="UTF-8" />
          <style>
            body { 
              font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              padding: 2rem; 
              margin: 0;
              background-color: #f0f2f5;
              color: #333;
              line-height: 1.6;
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .content { 
              width: 100%;
              max-width: 500px;
              margin: 0 auto;
              text-align: center; 
              background-color: white;
              padding: 2.5rem;
              border-radius: 16px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            }
            h1 { 
              margin-bottom: 1rem; 
              color: #1a202c;
              font-weight: 700;
              font-size: 2rem;
              letter-spacing: -0.5px;
            }
            p { 
              margin-bottom: 2rem; 
              line-height: 1.7;
              color: #4a5568;
              font-size: 1.1rem;
            }
            .qr-container {
              background: linear-gradient(145deg, #ffffff, #f0f0f0);
              padding: 1.5rem;
              border-radius: 12px;
              display: inline-block;
              box-shadow: 0 8px 20px rgba(0,0,0,0.05);
              margin-bottom: 1.8rem;
              border: 1px solid rgba(0,0,0,0.03);
            }
            img { 
              display: block;
              max-width: 100%;
              height: auto;
            }
            .url-display {
              word-break: break-all;
              margin: 1.2rem auto;
              font-size: 0.95rem;
              color: #4a5568;
              background-color: #f7fafc;
              padding: 0.75rem 1rem;
              border-radius: 8px;
              display: block;
              width: 90%;
              border: 1px dashed #e2e8f0;
              font-family: monospace;
            }
            .footer {
              margin-top: 2rem;
              font-size: 0.85rem;
              color: #718096;
              background-color: #f8fafc;
              padding: 0.75rem;
              border-radius: 8px;
              display: inline-block;
            }
            .brand {
              margin-top: 1.5rem;
              font-size: 0.75rem;
              color: #a0aec0;
              display: block;
            }
            @media print {
              body {
                background-color: white;
                padding: 0;
              }
              .content {
                box-shadow: none;
                padding: 0;
                max-width: 100%;
              }
              .qr-container {
                box-shadow: none;
                background: white;
              }
            }
            /* iPad Pro and similar tablet devices */
            @media (min-width: 768px) and (max-width: 1366px) {
              body {
                padding: 2.5rem;
              }
              .content {
                max-width: 650px;
                padding: 3rem;
              }
              h1 {
                font-size: 2.5rem;
                margin-bottom: 1.5rem;
              }
              p {
                font-size: 1.25rem;
                margin-bottom: 2.5rem;
              }
              .qr-container {
                padding: 2rem;
                margin-bottom: 2.5rem;
              }
              img {
                width: 350px;
                margin: 0 auto;
              }
              .url-display {
                font-size: 1.1rem;
                padding: 1rem 1.5rem;
                margin: 1.5rem auto;
              }
              .footer {
                font-size: 1rem;
                padding: 1rem;
                margin-top: 2.5rem;
              }
              .brand {
                font-size: 0.9rem;
                margin-top: 2rem;
              }
            }
            /* iPad Pro landscape orientation */
            @media (min-width: 1024px) and (max-width: 1366px) and (orientation: landscape) {
              .content {
                max-width: 750px;
              }
              img {
                width: 400px;
              }
            }
            @media (max-width: 768px) {
              body {
                padding: 1rem;
              }
              .content {
                padding: 1.5rem;
              }
              h1 {
                font-size: 1.5rem;
              }
            }
          </style>
          <script>
            window.onload = function() {
              setTimeout(() => window.print(), 500);
            };
            window.onafterprint = function() {
              window.close();
            };
          </script>
        </head>
        <body>
          <div class="content">
            <h1>${safeTitle}</h1>
            <p>${safeDescription}</p>
            <div class="qr-container">
              <img src="${qrDataUrl}" alt="QR Code for ${safeTitle}" />
            </div>
            <div class="url-display">${safeUrl}</div>
            <div class="footer">📱 Scan with your phone camera or QR reader app</div>
            <span class="brand">Generated on ${new Date().toLocaleDateString()}</span>
          </div>
        </body>
      </html>
    `)

        printWindow.document.close()

        return true
    } catch (error) {
        console.error("Error generating QR code:", error)
        throw error
    }
}
