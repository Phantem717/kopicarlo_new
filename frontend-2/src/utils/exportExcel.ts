import { Timestamp } from 'next/dist/server/lib/cache-handlers/types';
import * as XLSX from 'xlsx';


interface PosterData {
  id: number;
  title: string;
  description: string;
  votes: number;
}

interface ResponsesData {
  id: number;
  name: string;
  phone_number: string;
  unit: string;
  role: string;
  choice: number;
  otp:string;
  success: boolean;
  authorized: boolean;
  date_created: string;
}

const ExportPosterToExcel = (filteredData: PosterData[]) => {

  const exportData = filteredData.map(item => ({
    id: item.id,
    title: item.title,
    description: item.description,
    votes: item.votes,
  }));

  // Create worksheet
  const ws = XLSX.utils.json_to_sheet(exportData);

  // Optional: set first row height
  ws['!rows'] = [{ hpx: 50 }];

  // Create workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Data Poster");

  // Write file
  XLSX.writeFile(wb, `Data_Poster_${new Date().toISOString().split('T')[0]}.xlsx`);
};

const ExportResponsesToExcel = (filteredData: ResponsesData[]) => {
    
  const exportData = filteredData.map(item => ({
    id: item.id,
    name: item.name,
    phone_number: item.phone_number,
    unit: item.unit,
    role: item.role,
    choice: item.choice,
    otp: item.otp,
    success: item.success,
    authorized: item.authorized,
    date_created:item.date_created, // item.date_created
  }));

  // Create worksheet
  const ws = XLSX.utils.json_to_sheet(exportData);

  // Optional: set first row height
  ws['!rows'] = [{ hpx: 50 }];

  // Create workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Data Responses");

  // Write file
  XLSX.writeFile(wb, `Data_Responses_${new Date().toISOString().split('T')[0]}.xlsx`);
}
export { ExportPosterToExcel, ExportResponsesToExcel };
