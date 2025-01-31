import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import toast from "react-hot-toast";

/**
 * Flattens an object recursively to handle nested objects.
 * @param obj - The object to flatten.
 * @param parentKey - The key of the parent object (used for recursion).
 * @param separator - Separator to use in flattened keys (default is ".").
 * @returns A flattened object.
 */
const flattenObject =<T> (obj: T, parentKey = '', separator = '.') => {
    const flattened: Record<string, unknown> = {};

    for (const key in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

        const newKey = parentKey ? `${parentKey}${separator}${key}` : key;

        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            // Recursively flatten for nested objects
            Object.assign(flattened, flattenObject(obj[key], newKey, separator));
        } else {
            // Directly assign values for non-object types
            flattened[newKey] = obj[key];
        }
    }

    return flattened;
};

/**
 * Exports the given data to an Excel (.xlsx) file.
 * Automatically flattens nested objects for better presentation in Excel.
 * @param data - The array of objects to export.
 * @param fileName - The name of the file to save (without extension).
 */
const exportToExcel =<T> (data: Array<T>, fileName: string) => {
    if (!data || !data.length) {
        console.error("No data available to export");
        return;
    }
    const flattenedData= data.map(item => flattenObject<T>(item));
    const worksheet = XLSX.utils.json_to_sheet(flattenedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    try {
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, `${fileName}.xlsx`);
        toast.success("Excel file exported successfully!");
    } catch (error) {
        console.error("Failed to export Excel file:", error);
    }
};

export default exportToExcel;