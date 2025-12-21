export function formatDate(date: string | Date, timezone: string = 'UTC') {
    if (!date) return 'Never';
    return new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    }).format(new Date(date));
}
