import { ModbusRecord } from '../types';

export const downloadCSV = (data: ModbusRecord[], filename: string = 'modbus_config.csv') => {
  // Define columns
  const headers = ['序號', '位址', '參數名稱', '資料類型', '數值', '備註'];
  
  // Map data to CSV rows
  const rows = data.map(row => [
    row.id,
    `"${row.address}"`,
    `"${row.name.replace(/"/g, '""')}"`,
    `"${row.dataType}"`,
    `"${row.value}"`,
    `"${row.comment.replace(/"/g, '""')}"`,
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(r => r.join(','))
  ].join('\n');

  // Add BOM for Excel compatibility with UTF-8
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // Create download link
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};