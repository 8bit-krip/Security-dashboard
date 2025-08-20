import axios from "axios";

export const fetchSheetData = async () => {
  const SHEET_ID = import.meta.env.VITE_SHEET_ID;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const SHEET_NAME = "Sheet1";

  if (!SHEET_ID || !API_KEY) {
    console.error("Missing SHEET_ID or API_KEY in environment variables.");
    return {};
  }

  const clean = (s) => (s ?? "").replace(/[\u200B-\u200D\uFEFF]/g, "").trim();

  // Convert RGB values from Google Sheets to simple color names
  const rgbToColorName = (rgbColor) => {
    if (!rgbColor) return "Gray";
    const { red = 0, green = 0, blue = 0 } = rgbColor;
    if (red > 0.8 && green < 0.2 && blue < 0.2) return "Red";
    if (green > 0.5 && red < 0.5) return "Green";
    return "Gray";
  };

  const parseSheetData = (gridData) => {
    const sheet = gridData.sheets.find((s) => s.properties.title === SHEET_NAME);
    if (!sheet || !sheet.data || !sheet.data[0].rowData) return { [SHEET_NAME]: {} };

    const rows = sheet.data[0].rowData;
    const headers = rows[0].values.map((cell) => clean(cell.formattedValue));
    const data = {};
    let currentServiceKey = null;

    // Map headers to column indexes
    const headerMap = {};
    headers.forEach((header, index) => {
      if (header) headerMap[header] = index;
    });

    const getCellData = (rowData, headerName) => {
      const index = headerMap[headerName];
      if (index === undefined || !rowData[index]) return { value: "", color: "Gray" };
      const cell = rowData[index];
      return {
        value: clean(cell.formattedValue || ""),
        color: rgbToColorName(cell.effectiveFormat?.backgroundColor),
      };
    };

    for (let i = 1; i < rows.length; i++) {
      const rowData = rows[i].values || [];

      const serviceName = getCellData(rowData, "Service").value;
      const subheadingName = getCellData(rowData, "Subheading").value;

      // Main service row
      if (serviceName) {
        currentServiceKey = serviceName;
        data[currentServiceKey] = {
          Subheading: {},
          Compliant: Number(getCellData(rowData, "Compliant").value) || 0,
          Total: Number(getCellData(rowData, "Total").value) || 0,
          Mising: Number(getCellData(rowData, "Mising").value) || 0,
          Other: Number(getCellData(rowData, "Other").value) || 0,
          "%Compliant": getCellData(rowData, "% Compliant").value,
        };

        // Optional service-level statuses (kept if you use them elsewhere)
        const statusCService = getCellData(rowData, "Status C");
        if (statusCService.value) {
          data[currentServiceKey].status_C = {
            name: statusCService.value,
            colour: statusCService.color,
          };
        }
        const statusEService = getCellData(rowData, "Status E");
        if (statusEService.value) {
          data[currentServiceKey].status_E = {
            name: statusEService.value,
            colour: statusEService.color,
          };
        }
      }

      // Subheading row (now includes status_C/status_E)
      if (currentServiceKey && subheadingName) {
        const statusC = getCellData(rowData, "Status C");
        const statusE = getCellData(rowData, "Status E");

        data[currentServiceKey].Subheading[subheadingName] = {
          Compliant: Number(getCellData(rowData, "Compliant").value) || 0,
          Mising: Number(getCellData(rowData, "Mising").value) || 0,
          Other: Number(getCellData(rowData, "Other").value) || 0,
          Total: Number(getCellData(rowData, "Total").value) || 0,
          colour: getCellData(rowData, "Subheading").color,
          status_C: {
            name: statusC.value,          // <-- this is what your UI reads
            colour: statusC.color,
          },
          status_E: {
            name: statusE.value,
            colour: statusE.color,
          },
        };
      }
    }

    // Replace empty subheadings with 0
    for (const serviceKey in data) {
      if (Object.keys(data[serviceKey].Subheading).length === 0) {
        data[serviceKey].Subheading = 0;
      }
    }

    return { [SHEET_NAME]: data };
  };

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}?key=${API_KEY}&ranges=${SHEET_NAME}&includeGridData=true`;
    const response = await axios.get(url);
    return parseSheetData(response.data);
  } catch (error) {
    console.error("Failed to fetch or parse Google Sheet data:", error);
    return {};
  }
};
