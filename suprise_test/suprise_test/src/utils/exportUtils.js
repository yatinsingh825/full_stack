// Export utilities for CSV and PDF
export function exportToCSV(complaints, filename = 'complaints.csv') {
  const headers = ['ID', 'Title', 'Description', 'Status', 'Priority', 'Category', 'User', 'Email', 'Created At'];

  const rows = complaints.map(c => [
    c.id,
    `"${c.title.replace(/"/g, '""')}"`,
    `"${c.description.replace(/"/g, '""')}"`,
    c.status,
    c.priority,
    c.category,
    c.user.fullName,
    c.user.email,
    new Date(c.createdAt).toLocaleString(),
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  downloadFile(csvContent, filename, 'text/csv');
}

export function exportToPDF(complaints, filename = 'complaints.pdf') {
  // Using a simple approach with html2pdf library
  // For production, consider using jsPDF or similar library
  const html = generatePDFHTML(complaints);

  const newWindow = window.open('', '', 'width=800,height=600');
  newWindow.document.write(html);
  newWindow.document.close();
  newWindow.print();

  setTimeout(() => newWindow.close(), 250);
}

function generatePDFHTML(complaints) {
  const tableRows = complaints.map(c => `
    <tr>
      <td>${c.id}</td>
      <td>${c.title}</td>
      <td>${c.description.substring(0, 50)}...</td>
      <td>${c.status}</td>
      <td>${c.priority}</td>
      <td>${c.category}</td>
      <td>${c.user.fullName}</td>
      <td>${new Date(c.createdAt).toLocaleString()}</td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Complaints Report</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #333; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #667eea; color: white; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        .meta { color: #666; font-size: 12px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <h1>Complaints Report</h1>
      <p>Generated on: ${new Date().toLocaleString()}</p>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Category</th>
            <th>User</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
      <div class="meta">
        <p>Total Records: ${complaints.length}</p>
      </div>
    </body>
    </html>
  `;
}

function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}
