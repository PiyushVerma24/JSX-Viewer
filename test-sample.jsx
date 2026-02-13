import React from 'react';

export default function InvoiceReport() {
  const invoiceData = {
    company: "Curling AI Solutions",
    invoiceNumber: "INV-2024-001",
    date: "February 7, 2026",
    items: [
      { description: "AI Consultation", hours: 40, rate: 150 },
      { description: "Model Training", hours: 20, rate: 200 },
      { description: "Deployment Setup", hours: 10, rate: 175 },
    ],
  };

  const total = invoiceData.items.reduce(
    (sum, item) => sum + item.hours * item.rate,
    0
  );

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a1a1a', margin: 0 }}>INVOICE</h1>
          <p style={{ color: '#666', marginTop: '4px' }}>{invoiceData.invoiceNumber}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', margin: 0 }}>
            {invoiceData.company}
          </h2>
          <p style={{ color: '#666', marginTop: '4px' }}>{invoiceData.date}</p>
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #1a1a1a' }}>
            <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: '600' }}>Description</th>
            <th style={{ textAlign: 'right', padding: '12px 8px', fontWeight: '600' }}>Hours</th>
            <th style={{ textAlign: 'right', padding: '12px 8px', fontWeight: '600' }}>Rate</th>
            <th style={{ textAlign: 'right', padding: '12px 8px', fontWeight: '600' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #e5e5e5' }}>
              <td style={{ padding: '12px 8px' }}>{item.description}</td>
              <td style={{ textAlign: 'right', padding: '12px 8px' }}>{item.hours}</td>
              <td style={{ textAlign: 'right', padding: '12px 8px' }}>${item.rate}</td>
              <td style={{ textAlign: 'right', padding: '12px 8px', fontWeight: '500' }}>
                ${(item.hours * item.rate).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ width: '250px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '2px solid #1a1a1a' }}>
            <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Total</span>
            <span style={{ fontWeight: 'bold', fontSize: '18px' }}>${total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '60px', paddingTop: '20px', borderTop: '1px solid #e5e5e5', color: '#999', fontSize: '12px' }}>
        <p>Payment is due within 30 days. Thank you for your business.</p>
      </div>
    </div>
  );
}
