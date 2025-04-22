export const formatTime = (hour, minute) => {
    return `${hour}:${minute.toString().padStart(2, '0')}`;
};

export const formatTimeFromDate = (date) => {
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
};

export const isTimeInPast = (hour, minute) => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    return hour < currentHour || (hour === currentHour && minute <= currentMinute);
};

export const isTimeMatch = (hour1, minute1, hour2, minute2) => {
    return hour1 === hour2 && minute1 === minute2;
};

export const isTimePast = (hour1, minute1, hour2, minute2) => {
    return hour1 < hour2 || (hour1 === hour2 && minute1 < minute2);
};