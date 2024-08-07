export interface IContacts {
  id?: string;
  contact_Name?: string;
  account_Name?: string;
  email?: string;
  phone?: number;
  contact_Owner?: string | null;
}

export const defaultValue: Readonly<IContacts> = {};
