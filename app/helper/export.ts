import * as XLSX from "xlsx";
import { CardData } from "@/app/types"; 

export async function exportToXLSX(data: CardData[]) {

    // filter data first 
    data = data.filter(data => data.cardCode.startsWith("GD")).sort((a,b) => parseInt(a.cardCode.split("-")[1]) - parseInt(b.cardCode.split("-")[1]))
    console.log(data.toString())
  // Convert JSON → worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Create workbook
  const workbook = XLSX.utils.book_new();

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Cards");

  // Write file to disk
  XLSX.writeFile(workbook, "cards.xlsx");
}