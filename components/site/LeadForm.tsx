"use client";

import { cloneElement, FormEvent, Suspense, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { concerns } from "@/lib/site";

type Status = "idle" | "loading" | "success" | "error";

const required = ["name", "email", "phone", "postcode", "city", "waterSource"];

/** Reserves the real dimensions of the form so nothing jumps when it resolves. */
function FormSkeleton() {
  return (
    <div className="lead-form form-skeleton" aria-hidden="true">
      <div className="form-grid">
        {Array.from({ length: 8 }, (_, i) => <div className="field" key={i}><span className="skeleton-label" /><span className="skeleton-control" /></div>)}
      </div>
      <div className="field"><span className="skeleton-label" /><span className="skeleton-control skeleton-area" /></div>
      <span className="skeleton-button" />
    </div>
  );
}

export function LeadForm() {
  return (
    <Suspense fallback={<FormSkeleton />}>
      <ConsultationForm />
    </Suspense>
  );
}

function ConsultationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  // The homepage picker sends the visitor's answer through as ?concern=…, so the
  // conversation starts where they left it rather than from an empty box.
  const concernId = useSearchParams().get("concern");
  const carried = concerns.find(item => item.id === concernId) ?? null;
  const [message, setMessage] = useState(() => (carried ? `At home I am noticing ${carried.label.toLowerCase()}.` : ""));

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const next: Record<string, string> = {};
    for (const key of required) {
      if (!String(data.get(key) ?? "").trim()) next[key] = "Please complete this field.";
    }
    const email = String(data.get("email") ?? "");
    if (email && !/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address.";
    setErrors(next);
    if (Object.keys(next).length) {
      setStatus("error");
      // Send focus to the first thing that needs attention, not the button.
      const first = required.find(key => next[key]) ?? Object.keys(next)[0];
      form.querySelector<HTMLElement>(`#${first}`)?.focus();
      return;
    }
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 650);
  };

  return (
    <form className="lead-form" ref={formRef} onSubmit={submit} noValidate aria-describedby="form-note">
      {carried && (
        <p className="form-carried">
          Carried over from the homepage: <strong>{carried.label}</strong>. Change the message below if that is not quite right.
        </p>
      )}
      <div className="form-grid">
        <Field name="name" label="Full name" error={errors.name}>
          <input id="name" name="name" autoComplete="name" required />
        </Field>
        <Field name="email" label="Email" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" required />
        </Field>
        <Field name="phone" label="Phone" error={errors.phone}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" required />
        </Field>
        <Field name="postcode" label="Postcode" error={errors.postcode}>
          <input id="postcode" name="postcode" inputMode="numeric" autoComplete="postal-code" required />
        </Field>
        <Field name="city" label="Nearest service city" error={errors.city}>
          <select id="city" name="city" required defaultValue="">
            <option value="" disabled>Select a city</option>
            <option>Perth</option><option>Sydney</option><option>Adelaide</option><option>Other</option>
          </select>
        </Field>
        <Field name="waterSource" label="Water source" error={errors.waterSource}>
          <select id="waterSource" name="waterSource" required defaultValue="">
            <option value="" disabled>Select a source</option>
            <option>Mains water</option><option>Rainwater</option><option>Bore water</option><option>Not sure</option>
          </select>
        </Field>
        <Field name="propertyType" label="Property type">
          <select id="propertyType" name="propertyType" defaultValue="Residential house">
            <option>Residential house</option><option>Townhouse or unit</option><option>Commercial property</option><option>Other</option>
          </select>
        </Field>
        <Field name="interest" label="I am interested in">
          <select id="interest" name="interest" defaultValue="Help choosing a system">
            <option>Help choosing a system</option><option>Whole-house system</option><option>Replacement cartridges</option><option>Service or maintenance</option>
          </select>
        </Field>
      </div>
      <Field name="message" label="What would you like help with?">
        <textarea id="message" name="message" rows={5} value={message} onChange={event => setMessage(event.target.value)} />
      </Field>
      <p id="form-note" className="form-note">
        This review build demonstrates the complete form experience but does not send your details. Connect an approved destination and privacy process before launch.
      </p>
      <div className="form-actions">
        <button className="button button-primary" disabled={status === "loading"} type="submit">
          {status === "loading" ? "Checking details…" : "Request a consultation"}
        </button>
        <span>Required fields are marked in their labels.</span>
      </div>
      {status === "success" && (
        <div className="form-status success" role="status">
          <strong>Your request is ready.</strong>
          <p>In the production site, this is where we will confirm submission and response time. No data was sent from this review build.</p>
        </div>
      )}
      {status === "error" && (
        <div className="form-status error" role="alert">
          <strong>Check the highlighted fields.</strong>
          <p>Your entries are still here so you can correct them.</p>
        </div>
      )}
    </form>
  );
}

function Field({
  name,
  label,
  error,
  children,
}: {
  name: string;
  label: string;
  error?: string;
  children: React.ReactElement<Record<string, unknown>>;
}) {
  return (
    <div className="field">
      <label htmlFor={name}>
        {label}
        {required.includes(name) && <span aria-hidden="true"> *</span>}
      </label>
      {cloneElement(children, {
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? `${name}-error` : undefined,
      })}
      {error && <p className="field-error" id={`${name}-error`}>{error}</p>}
    </div>
  );
}
