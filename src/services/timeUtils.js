// Convert "HH:mm" to minutes 
export const toMinutes = (timeStr) => {
    const [h,m] = timeStr?.split(":").map(Number);
    return h * 60 + m
}

// Logic for detect overlapping
export const isOverlapping = (existingEvents, newStart, newEnd) => {
    for(let ev of existingEvents){
        const evStart = toMinutes(ev.startTime);
        const evend = toMinutes(ev.endTime);

        if(newStart < evend && newEnd > evStart){
            return true;
        }
    }

    return false;
};

export const generateTimeSlots = () => {
    const times =[];
    for(let h = 0; h < 24; h++){
        for(let m of [0,30]){
            const hh = String(h).padStart(2,"0");
            const mm = String(m).padStart(2,"0");
            times.push(`${hh}:${mm}`);
        }
    }

    return times;
};

export const validateEvent = (title, startTime, endTime, existing) => {
    if(!title.trim()) return "Title required";
    if(!startTime || !endTime) return "Please select time";
    if(toMinutes(endTime) <= toMinutes(startTime)) return "End time must be after start time";

    const newStart = toMinutes(startTime);
    const newEnd = toMinutes(endTime);
     
    if(isOverlapping(existing,newStart,newEnd)) return "Time slot overlaps with another event";

    return null;
};