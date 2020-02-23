import moment from 'moment';

export interface CalendarEvent {
    title: string,
    description: string,
    startSchedule: moment.Moment,
    endSchedule: moment.Moment,
    calendarName: string,
}
