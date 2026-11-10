import { useState, type FormEvent, type ReactNode } from 'react';
import { Button } from '../components/Button/Button';
import { CheckboxField } from '../components/CheckboxField/CheckboxField';
import { InputField } from '../components/InputField/InputField';
import { SelectField, TextareaField } from '../components/Inputs/InputControls';
import styles from './FormsPage.module.css';

interface FormCardProps {
  title: string;
  children?: ReactNode;
  className?: string;
}

function FormCard({ title, children, className = '' }: FormCardProps) {
  return (
    <section className={`${styles.card} ${className}`}>
      <h2 className={styles.cardTitle}>{title}</h2>
      {children}
    </section>
  );
}

function DemoForm({ children, className = '' }: { children: ReactNode; className?: string }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form
      className={`${styles.form} ${className}`}
      onSubmit={handleSubmit}
      onChange={() => setSubmitted(false)}
    >
      {children}
      {submitted && <p className={styles.successMessage} role="status">Submitted successfully.</p>}
    </form>
  );
}

const locations = [
  { label: 'New York', value: 'new-york' },
  { label: 'London', value: 'london' },
  { label: 'Tokyo', value: 'tokyo' },
];

export function FormsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.grid}>
        <FormCard title="Form Shipping">
          <DemoForm>
            <div className={styles.formIntro}>
              <strong>Shipping information</strong>
              <span>We ship within 2 working days.</span>
            </div>
            <InputField label="Full Name" placeholder="Value" autoComplete="name" required />
            <SelectField label="Location" options={locations} required />
            <TextareaField label="Delivery note" placeholder="Value" rows={2} />
            <CheckboxField label="I accept the terms" description="Read our T&Cs" required />
            <Button type="submit" size="small">Save shipping information</Button>
          </DemoForm>
        </FormCard>

        <FormCard title="Form Contact">
          <DemoForm>
            <InputField label="Name" placeholder="Value" autoComplete="given-name" required />
            <InputField label="Surname" placeholder="Value" autoComplete="family-name" required />
            <InputField label="Email" type="email" placeholder="Value" autoComplete="email" required />
            <TextareaField label="Message" placeholder="Value" rows={2} required />
            <Button type="submit" size="small">Submit</Button>
          </DemoForm>
        </FormCard>

        <FormCard title="Form Newsletter">
          <DemoForm className={styles.inlineForm}>
            <InputField
              label="Email address"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
            <Button type="submit" size="small" fullWidth={false}>Submit</Button>
          </DemoForm>
        </FormCard>

        <FormCard title="Form (Slot)" className={styles.slotCard}>
          <div className={styles.slot} aria-hidden="true" />
        </FormCard>

        <FormCard title="Form Log In">
          <DemoForm>
            <InputField label="Email" type="email" placeholder="Value" autoComplete="email" required />
            <InputField label="Password" type="password" placeholder="Value" autoComplete="current-password" required />
            <Button type="submit" size="small">Sign In</Button>
            <a className={styles.textLink} href="#forgot-password">Forgot password?</a>
          </DemoForm>
        </FormCard>

        <FormCard title="Form Register">
          <DemoForm>
            <InputField label="Email" type="email" placeholder="Value" autoComplete="email" required />
            <InputField label="Password" type="password" placeholder="Value" autoComplete="new-password" required />
            <CheckboxField label="Label" description="Description" required />
            <Button type="submit" size="small">Register</Button>
          </DemoForm>
        </FormCard>

        <FormCard title="Form Forgot Password">
          <DemoForm>
            <InputField label="Email" type="email" placeholder="Value" autoComplete="email" required />
            <div className={styles.actions}>
              <Button type="reset" variant="subtle" size="small" fullWidth={false}>Cancel</Button>
              <Button type="submit" size="small" fullWidth={false}>Reset Password</Button>
            </div>
          </DemoForm>
        </FormCard>
      </div>
    </main>
  );
}
