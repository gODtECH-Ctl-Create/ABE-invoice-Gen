export type InvoiceStatus = "Draft" | "Sent" | "Partially Paid" | "Paid" | "Void";
export type ProjectStatus = "Planning" | "Active" | "On Hold" | "Completed";

export type Branding = {
  companyName: string;
  logoDataUrl: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  accent: string;
  ink: string;
  watermark: string;
};

export type InvoiceItem = {
  id: string;
  description: string;
  details: string;
  quantity: number;
  unitPrice: number;
};

export type Invoice = {
  id: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
  currency: string;
  business: Branding;
  clientCompany: string;
  clientContact: string;
  clientAddress: string;
  clientEmail: string;
  clientPhone: string;
  project: string;
  items: InvoiceItem[];
  amountPaid: number;
  tax: number;
  notes: string;
};

export type Project = {
  id: string;
  name: string;
  client: string;
  status: ProjectStatus;
  progress: number;
  budget: number;
  currency: string;
  startDate: string;
  dueDate: string;
  notes: string;
};
