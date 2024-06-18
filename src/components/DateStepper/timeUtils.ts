import { getDay, getMonth, getDate } from "date-fns";
import { RO_ro } from "./localeRo";

export const getDateTimeString = (
  date: Date,
  options = { shortDayName: false, shortMonthName: false }
) => {
  if (!date) return "";

  const dayName =
    RO_ro.time[options.shortDayName ? "daysShort" : "days"][getDay(date)];
  const monthName =
    RO_ro.time[options.shortMonthName ? "monthsShort" : "months"][
      getMonth(date)
    ];
  const dayDate = getDate(date);

  return `${dayName},  ${dayDate} ${monthName}`;
};
