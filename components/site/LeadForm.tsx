"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Status = "idle" | "loading" | "success" | "error";

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const reduce = useReducedMotion();

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const next: Record<string, string> = {};
    for (const key of ["name", "email", "phone", "postcode", "city", "waterSource"]) {
      if (!String(data.get(key) ?? "").trim()) next[key] = "Please complete this field.";
    }
    const email = String(data.get("email") ?? "");
    if (email && !/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address.";
    setErrors(next);
    if (Object.keys(next).length) { setStatus("error"); return; }
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 650);
  };

  return (
    <form className="lead-form" onSubmit={submit} noValidate aria-describedby="form-note">
      <div className="form-grid">
        <Field name="name" label="Full name" error={errors.name}><input id="name" name="name" autoComplete="name" required aria-invalid={Boolean(errors.name)} /></Field>
        <Field name="email" label="Email" error={errors.email}><input id="email" name="email" type="email" autoComplete="email" required aria-invalid={Boolean(errors.email)} /></Field>
        <Field name="phone" label="Phone" error={errors.phone}><input id="phone" name="phone" type="tel" autoComplete="tel" required aria-invalid={Boolean(errors.phone)} /></Field>
        <Field name="postcode" label="Postcode" error={errors.postcode}><input id="postcode" name="postcode" inputMode="numeric" autoComplete="postal-code" required aria-invalid={Boolean(errors.postcode)} /></Field>
        <Field name="city" label="Nearest service city" error={errors.city}><select id="city" name="city" required defaultValue=""><option value="" disabled>Select a city</option><option>Perth</option><option>Sydney</option><option>Adelaide</option><option>Other</option></select></Field>
        <Field name="waterSource" label="Water source" error={errors.waterSource}><select id="waterSource" name="waterSource" required defaultValue=""><option value="" disabled>Select a source</option><option>Mains water</option><option>Rainwater</option><option>Bore water</option><option>Not sure</option></select></Field>
        <Field name="propertyType" label="Property type"><select id="propertyType" name="propertyType" defaultValue="Residential house"><option>Residential house</option><option>Townhouse or unit</option><option>Commercial property</option><option>Other</option></select></Field>
        <Field name="interest" label="I am interested in"><select id="interest" name="interest" defaultValue="Help choosing a system"><option>Help choosing a system</option><option>Whole-house system</option><option>Replacement cartridges</option><option>Service or maintenance</option></select></Field>
      </div>
      <Field name="message" label="What would you like help with?"><textarea id="message" name="message" rows={5} /></Field>
      <p id="form-note" className="form-note">This review build demonstrates the complete form experience but does not send your details. Connect an approved destination and privacy process before launch.</p>
      <div className="form-actions">
        <button className="button button-primary" disabled={status === "loading"} type="submit">{status === "loading" ? "Checking details…" : "Request a consultation"}</button>
        <span>Required fields are marked in their labels.</span>
      </div>
      <AnimatePresence mode="wait">
        {status === "success" && <motion.div className="form-status success" role="status" initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><strong>Your request is ready.</strong><p>In the production site, this is where we will confirm submission and response time. No data was sent from this review build.</p></motion.div>}
        {status === "error" && <motion.div className="form-status error" role="alert" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }}><strong>Check the highlighted fields.</strong><p>Your entries are still here so you can correct them.</p></motion.div>}
      </AnimatePresence>
    </form>
  );
}

function Field({ name, label, error, children }: { name: string; label: string; error?: string; children: React.ReactNode }) {
  return <div className="field"><label htmlFor={name}>{label}{["name", "email", "phone", "postcode", "city", "waterSource"].includes(name) && <span aria-hidden="true"> *</span>}</label>{children}{error && <p className="field-error" id={`${name}-error`}>{error}</p>}</div>;
}

