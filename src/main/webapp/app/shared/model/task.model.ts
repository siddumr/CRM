import dayjs from 'dayjs';

export interface ITask {
  id?: string;
  subject?: string;
  due_Date?: dayjs.Dayjs | null;
  status?: string;
  priority?: string | null;
  related_to?: string | null;
  task_Owner?: string | null;
}

export const defaultValue: Readonly<ITask> = {};
