export const downloadPDF = (leads) => {
  // Create jsPDF instance
   const { jsPDF } = window.jspdf;

  const doc = new jsPDF('a4');
  // Table headers
  const headers = [
    "Lead Name",
    "Email",
    "Phone",
    "Company",
    "Source",
    "Status",
    "Assigned To",
    "Date",
    "Value",
  ];

  // Map leads data to rows
  const rows = leads.map((lead) => [
    lead.name || "N/A",
    lead.email || "N/A",
    lead.phone || "N/A",
    lead.company || "N/A",
    lead.source || "N/A",
    lead.status || "N/A",
    lead.employee ? lead.employee.name : "Unassigned",
    lead.createdAt ? new Date(lead.createdAt).toISOString().split("T")[0] : "N/A",
    lead.value || "N/A",
  ]);

  // Use autoTable - note: no need to wrap headers in an extra array
  doc.autoTable({
  head: [headers],
  body: rows,
  theme: "grid",
  headStyles: {
    fillColor: [55, 65, 81],
    textColor: [255, 255, 255],
    fontSize: 9,
  },
  bodyStyles: {
    fontSize: 8,
  },
  margin: { top: 20, right: 0, bottom: 20, left: 8 }, // Smaller margins
  styles: {
    fontSize: 8,
    cellPadding: 2,
    overflow: 'linebreak',
  },
  // Let autoTable calculate widths automatically
  tableWidth: 'auto',
  // OR set to fit exactly to page width
  tableWidth: 'wrap',
});

  // Save the generated PDF
  doc.save("leads.pdf");
};