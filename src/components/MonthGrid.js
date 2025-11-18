import { addDays, endOfMonth, endOfWeek, startOfMonth, startOfWeek } from "date-fns"

export const getCalendarDays = (currentDate) => {
    const startMonth = startOfMonth(currentDate);
    const endMonth = endOfMonth(currentDate);

    const startDate = startOfWeek(startMonth, {weekStartsOn: 0});
    const endDate = endOfWeek(endMonth, {weekStartsOn: 0});

    const days = [];
    let current = startDate;

    while(current <= endDate) {
        days.push(current);
        current = addDays(current, 1);
    }

    return days;
}

