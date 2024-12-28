import { getMinutes } from "date-fns";

export function generateRollNumber(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const date = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2,'0');
    const minutes = now.getMinutes().toString().padStart(2,'0');

    return `${year}${month}${date}${hours}${minutes}`;
}