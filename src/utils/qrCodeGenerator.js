import QRCode from "qrcode"

/**
 * Extracts domain from a URL
 * @param {string} url - The URL to extract domain from
 * @returns {string} - The extracted domain
 */
const extractDomain = (url) => {
    try {
        // Remove protocol and get domain
        const domain = new URL(url).hostname
        return domain
    } catch (error) {
        console.error("Error extracting domain:", error)
        return ""
    }
}

/**
 * Gets favicon URL for a domain
 * @param {string} url - The website URL
 * @returns {string} - The favicon URL
 */
const getFaviconUrl = (url) => {
    try {
        const domain = extractDomain(url)
        if (!domain) return ""

        // Use Google's favicon service as it's reliable
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
    } catch (error) {
        console.error("Error getting favicon:", error)
        return ""
    }
}

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
export const generateQRCodeAndPrint = async (
    url,
    title,
    description,
    options = { width: 200, margin: 1 }
) => {
    try {
        if (!url || !title || !description) {
            throw new Error("URL, title, and description are required")
        }

        // Sanitize inputs
        const safeUrl = escapeHtml(url)
        const safeTitle = escapeHtml(title)
        const safeDescription = escapeHtml(description)

        // Get favicon
        const faviconUrl = getFaviconUrl(url)

        const qrDataUrl = await QRCode.toDataURL(url, options)

        const printWindow = window.open("", "_blank", "toolbar=0,location=0,menubar=0")

        if (!printWindow) {
            throw new Error("Please allow pop-ups to generate the QR code")
        }

        printWindow.document.write(`
      <html>
        <head>
          <title>T.R.A.C.K. QR Code</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta charset="UTF-8" />
          <style>
            @page {
              size: A4;
              margin: 1cm;
              /* Ensure no browser headers/footers */
              margin-top: 0;
              margin-bottom: 0;
            }
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
              box-sizing: border-box;
            }
            * {
              box-sizing: border-box;
            }
            .content { 
              width: 100%;
              max-width: 650px;
              margin: 0 auto;
              text-align: center; 
              background-color: white;
              padding: 3rem;
              border-radius: 16px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            }
            h1 { 
              margin-bottom: 0.75rem; 
              color: #1a202c;
              font-weight: 700;
              font-size: 2.5rem;
              letter-spacing: -0.5px;
            }
            .site-logo {
              display: ${faviconUrl ? "block" : "none"};
              width: 90px;
              height: 90px;
              margin: 0.75rem auto 1.5rem;
              object-fit: contain;
              border-radius: 0;
              box-shadow: none;
              padding: 0;
              border: none;
              background-color: transparent;
            }
            p { 
              margin-bottom: 2.5rem; 
              line-height: 1.7;
              color: #4a5568;
              font-size: 1.25rem;
            }
            .qr-container {
              background: linear-gradient(145deg, #ffffff, #f0f0f0);
              padding: 2rem;
              border-radius: 12px;
              display: inline-block;
              box-shadow: 0 8px 20px rgba(0,0,0,0.05);
              margin-bottom: 2rem;
              border: 1px solid rgba(0,0,0,0.03);
            }
            img.qr-code { 
              display: block;
              width: 400px;
              height: 400px;
              max-width: 100%;
              margin: 0 auto;
            }
            .url-display {
              word-break: break-all;
              margin: 1.5rem auto;
              font-size: 1.1rem;
              color: #4a5568;
              background-color: #f7fafc;
              padding: 1rem 1.25rem;
              border-radius: 8px;
              display: block;
              width: 90%;
              border: 1px dashed #e2e8f0;
              font-family: monospace;
            }
            .footer {
              margin-top: 2rem;
              font-size: 1rem;
              color: #718096;
              background-color: #f8fafc;
              padding: 0.75rem 1.25rem;
              border-radius: 8px;
              display: inline-block;
            }
            .brand {
              margin-top: 1.5rem;
              font-size: 0.9rem;
              color: #a0aec0;
              display: block;
            }
            @media print {
              @page {
                size: A4;
                margin: 1.5cm;
              }
              * {
                box-sizing: border-box;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              body {
                background-color: white;
                padding: 0;
                min-height: auto;
                margin: 0;
                height: auto;
                overflow: visible;
                display: block;
              }
              .content {
                box-shadow: none;
                padding: 1rem;
                max-width: 100%;
                margin: 0 auto;
                page-break-inside: avoid;
                page-break-after: avoid;
                width: auto;
                background-color: white;
              }
              .qr-container {
                box-shadow: none;
                background: white;
                margin-bottom: 1rem;
                padding: 1rem;
              }
              h1 {
                margin-top: 0;
                font-size: 2.2rem;
                margin-bottom: 0.75rem;
              }
              .site-logo {
                width: 60px;
                height: 60px;
                margin: 0.5rem auto 1rem;
              }
              p {
                margin-bottom: 1rem;
                font-size: 1.1rem;
              }
              .footer, .brand {
                margin-top: 1rem;
                font-size: 0.85rem;
              }
              img.qr-code {
                width: 300px;
                height: 300px;
                margin: 0 auto;
              }
              .url-display {
                width: 85%;
                margin: 1rem auto;
                padding: 0.75rem 1rem;
                font-size: 1rem;
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
              .site-logo {
                width: 64px;
                height: 64px;
                margin: 0.5rem auto 1.5rem;
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
              .site-logo {
                width: 40px;
                height: 40px;
              }
            }
          </style>
          <script>
            window.onload = function() {
              // Ensure title is set
              document.title = "T.R.A.C.K. QR Code";
              // Set footer brand
              const brandElement = document.querySelector('.brand');
              if (brandElement) {
                const date = new Date().toLocaleDateString();
                brandElement.innerHTML = "T.R.A.C.K. QR Code - Generated on " + date;
              }
              // Print with specific settings
              setTimeout(() => {
                const mediaQueryList = window.matchMedia('print');
                mediaQueryList.addListener(function(mql) {
                  if (!mql.matches) {
                    // After print is complete or canceled
                    window.close();
                  }
                });
                
                try {
                  // Try to use the modern print API with options
                  window.print({
                    headerFooter: { default: 'off' }
                  });
                } catch (e) {
                  // Fallback to standard print
                  window.print();
                }
              }, 500);
            };
            // Define print settings
            const style = document.createElement('style');
            style.setAttribute('media', 'print');
            style.innerHTML = '@page { size: auto; margin: 0mm; }';
            document.head.appendChild(style);
          </script>
        </head>
        <body>
          <div class="content">
            <h1>${safeTitle}</h1>
            ${
                faviconUrl
                    ? `<img class="site-logo" src="${faviconUrl}" alt="${extractDomain(
                          safeUrl
                      )} logo" />`
                    : ""
            }
            <p>${safeDescription}</p>
            <div class="qr-container">
              <img class="qr-code" src="${qrDataUrl}" alt="QR Code for ${safeTitle}" />
            </div>
            <div class="url-display">${safeUrl}</div>
            <div class="footer">📱 Scan with your phone camera or QR reader app</div>
            <span class="brand">T.R.A.C.K. QR Code - Generated on ${new Date().toLocaleDateString()}</span>
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
