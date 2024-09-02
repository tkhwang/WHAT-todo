import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";

dayjs.extend(weekday);

export function getDateWithDayOfWeek(date: Date, offset: number) {
  return `${dayjs(date).add(offset, "day").format("ddd")} ${dayjs(date).add(offset, "day").format("MM/DD")} `;
}
