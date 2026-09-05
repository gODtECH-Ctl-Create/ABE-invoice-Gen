import type { Branding, Invoice, Project } from "./types";

const BRAND_KEY = "abe-invoice-branding";
const INVOICE_KEY = "abe-invoice-records";
const PROJECT_KEY = "abe-project-records";
const BACKUP_VERSION = 1;

export type AppBackup = {
  app: "ABE Invoice & Projects";
  version: number;
  exportedAt: string;
  branding: Branding;
  invoices: Invoice[];
  projects: Project[];
};

export const defaultBranding: Branding = {
  companyName: "ABE TechLab",
  logoDataUrl: "",
  address: "14 Layi Haruna Street, Governor's Road, Ikotun, Lagos",
  phone: "+234 814 047 9738",
  email: "",
  website: "www.abetechlab.com",
  bankName: "OPay",
  accountName: "AYO RICHARD ABE",
  accountNumber: "6118825472",
  accent: "#b7ff3c",
  ink: "#17191c",
  watermark: "ABE TechLab",
};

export function loadBranding(): Branding {
  if (typeof window === "undefined") return defaultBranding;
  try {
    const raw = window.localStorage.getItem(BRAND_KEY);
    return raw ? { ...defaultBranding, ...JSON.parse(raw) } : defaultBranding;
  } catch {
    return defaultBranding;
  }
}

export function saveBranding(value: Branding) {
  window.localStorage.setItem(BRAND_KEY, JSON.stringify(value));
}

export function loadInvoices(): Invoice[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(window.localStorage.getItem(INVOICE_KEY) || "[]"); } catch { return []; }
}

export function saveInvoices(items: Invoice[]) {
  window.localStorage.setItem(INVOICE_KEY, JSON.stringify(items));
}

export function loadProjects(): Project[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(window.localStorage.getItem(PROJECT_KEY) || "[]"); } catch { return []; }
}

export function saveProjects(items: Project[]) {
  window.localStorage.setItem(PROJECT_KEY, JSON.stringify(items));
}

export function exportBackup(): AppBackup {
  return {
    app: "ABE Invoice & Projects",
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    branding: loadBranding(),
    invoices: loadInvoices(),
    projects: loadProjects(),
  };
}

export function importBackup(raw: string) {
  let data: Partial<AppBackup>;
  try {
    data = JSON.parse(raw);
  } catch {
    throw new Error("This file is not valid JSON.");
  }

  if (data.app !== "ABE Invoice & Projects") throw new Error("This backup was not created by ABE Invoice & Projects.");
  if (data.version !== BACKUP_VERSION) throw new Error("This backup uses an unsupported version.");
  if (!data.branding || !Array.isArray(data.invoices) || !Array.isArray(data.projects)) throw new Error("This backup is incomplete or corrupted.");

  saveBranding({ ...defaultBranding, ...data.branding });
  saveInvoices(data.invoices);
  saveProjects(data.projects);
  return { invoices: data.invoices.length, projects: data.projects.length };
}

export function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function nextInvoiceNumber(existing: Invoice[]) {
  const year = new Date().getFullYear();
  const max = existing
    .map((item) => item.invoiceNumber.match(new RegExp(`^ABE-${year}-(\\d+)$`)))
    .filter(Boolean)
    .map((match) => Number(match![1]))
    .reduce((highest, value) => Math.max(highest, value), 0);
  return `ABE-${year}-${String(max + 1).padStart(3, "0")}`;
}
