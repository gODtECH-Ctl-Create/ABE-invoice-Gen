# ABE Invoice & Projects

A lightweight invoice generator and project tracker for freelancers, agencies, consultants, tradespeople, creators, and small local businesses.

## Product scope

- **Invoices:** create, edit, save, preview, print/save as PDF, email through the user's mail client, and track invoice status and payment history.
- **Projects:** track clients, status, progress, budget, deadlines, notes, and linked invoice work.
- **Company branding:** company name, logo, address, contact details, bank details, accent colors, and watermark text.
- **Default theme:** inspired by the ABE TechLab invoice design, while staying fully customizable for any business.

## Local-first by design

This first release does **not** require Supabase, a database, or a user account.

Your company profile, logo, projects, and invoices are stored locally in the browser on the device where you use the app. The core workspace is designed for single-device use and does not upload your business data to a remote database.

To move to another device:

1. Open **Company setup**.
2. Choose **Export all data**.
3. Keep the `.json` backup file somewhere safe.
4. Open the app on the new device and choose **Import backup**.

The export contains the workspace data needed to restore the company profile, projects, invoices, and branding settings.

## Important data note

Browser storage is local to the current browser profile and device. Clearing site data, using a different browser profile, or resetting the device can remove the local workspace. **Export a backup before changing devices or clearing browser data.**

A future version can add optional cloud synchronization with Supabase without changing the core invoice and project model.

## Development

This project uses Next.js, React, TypeScript, and browser storage only. No backend service is required for the first release.
