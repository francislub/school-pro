export function getNormalDate(inputDate: Date | string): string {

  const date = inputDate instanceof Date ? inputDate : new Date (inputDate);

  if (isNaN(date.getTime())){
    throw new Error('Invalid date format');
  }
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    date
  );

  // Add ordinal suffix to the day
  const day = date.getDate();
  const suffix =
    day === 1 || day === 21 || day === 31
      ? "st"
      : day === 2 || day === 22
      ? "nd"
      : day === 3 || day === 23
      ? "rd"
      : "th";
  return formattedDate.replace(/\b(\d{1,2})\b/, `$1${suffix}`);
}
