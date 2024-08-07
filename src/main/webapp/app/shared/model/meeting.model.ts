import dayjs from 'dayjs';

export interface IMeeting {
  id?: string;
  title?: string;
  from?: dayjs.Dayjs | null;
  to?: dayjs.Dayjs | null;
  realated_to?: string | null;
  contact_name?: string | null;
  host?: string;
}

export const defaultValue: Readonly<IMeeting> = {};
