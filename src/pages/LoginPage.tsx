import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FormEvent } from 'react';
import { Button } from '../components/Button/Button';
import { InputField } from '../components/InputField/InputField';
import { CheckboxField } from '../components/CheckboxField/CheckboxField';
import { TextLink } from '../components/TextLink/TextLink';
import googleIcon from '../assets/icons/google.svg';
import keyIcon from '../assets/icons/Key.svg';
import logo from '../assets/icons/f5-logo.svg';
import styles from './LoginPage.module.css';

export function LoginPage() {
  // State = the page's memory of what the person has typed so far
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate(); // lets us jump to another page in code

  function handleSubmit(event: FormEvent) {
    event.preventDefault(); // stop the browser from reloading the page
    // TODO: check the email/password with your sign-in API first, then navigate
    navigate('/home');
  }

  return (
    <main className={styles.page}>
      <section className={styles.brand}>
        <p><img src={logo} alt="F5 Distributed Cloud" width={44} height={44} /></p>
        <h2 className={styles.hero}>Welcome back!</h2>
        <p>Sign in continue to F5 Distributed Cloud</p>
      </section>

      <section className={styles.formPanel}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <header className={styles.heading}>
            <h1 className={styles.title}>Sign in</h1>
            <p className={styles.muted}>Enter your details to access your account.</p>
          </header>

          <div className={styles.fields}>
            <InputField label="Email" type="email" name="email" placeholder="name@company.com"
              autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <InputField label="Password" type="password" name="password" placeholder="Enter your password"
              autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div className={styles.options}>
            <CheckboxField label="Remember me" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
            <TextLink href="#">Forgot password?</TextLink>
          </div>

          <Button type="submit">Sign in</Button>

          <div className={styles.divider}>or</div>

          <div className={styles.alternatives}>
            <Button type="button" variant="secondary" icon={googleIcon}>Continue with Google</Button>
            <Button type="button" variant="secondary" icon={keyIcon}>Sign in with SSO</Button>
          </div>

          <p className={styles.signup}>
            Don’t have an account? <TextLink href="#">Create account</TextLink>
          </p>
        </form>
      </section>
    </main>
  );
}
