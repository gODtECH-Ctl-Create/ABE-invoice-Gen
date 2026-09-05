"use client";

import { ChangeEvent, useRef, useState } from "react";
import { exportBackup, importBackup } from "@/lib/store";

export function DataPortability() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  function downloadBackup() {
    const backup = exportBackup();
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `abe-invoice-backup-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    setMessage("Backup exported. Keep this file somewhere safe for recovery or transfer to another device.");
  }

  async function handleImport(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setBusy(true);
    setMessage("");
    try {
      const text = await file.text();
      const result = importBackup(text);
      setMessage(`Imported ${result.invoices} invoice${result.invoices === 1 ? "" : "s"}, ${result.projects} project${result.projects === 1 ? "" : "s"}, and company settings.`);
      window.location.reload();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "That backup could not be imported.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card">
      <div className="eyebrow">Your data, on your device</div>
      <h2 style={{ margin: "8px 0" }}>Private by default</h2>
      <p className="muted" style={{ lineHeight: 1.65 }}>
        Your invoices, projects, company profile, and logo are stored in this browser on this device. Nothing needs to leave your device to use the core app. Use a backup file to move your workspace to another device.
      </p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
        <button className="btn primary" type="button" onClick={downloadBackup}>Export all data</button>
        <button className="btn" type="button" onClick={() => inputRef.current?.click()} disabled={busy}>{busy ? "Importing…" : "Import backup"}</button>
      </div>
      <input ref={inputRef} type="file" accept="application/json,.json" onChange={handleImport} style={{ display: "none" }} />
      {message && <p className="muted" role="status" style={{ margin: "12px 0 0", lineHeight: 1.55 }}>{message}</p>}
    </div>
  );
}
