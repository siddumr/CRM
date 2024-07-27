export interface ILead {
  id?: string;
  first_name?: string;
  last_name?: string;
  company?: string;
  title?: string;
  phone?: number;
  email?: string;
  fax?: string | null;
  website?: string;
  industry?: string;
  no_of_employees?: number;
  annual_Revenue?: number;
  street?: string | null;
  state?: string | null;
  zip_code?: number | null;
  description?: string | null;
}

export const defaultValue: Readonly<ILead> = {};
