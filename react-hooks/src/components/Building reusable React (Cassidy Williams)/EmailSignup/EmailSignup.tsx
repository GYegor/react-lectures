import React, { useState, useRef, forwardRef } from 'react';
import styles from './emailSignup.module.scss';

interface Props {
  children: React.ReactNode;
}

export const EmailSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  let focusRef = useRef<HTMLButtonElement>(null);

  return (
    <section className={styles.section}>
      <h2>Email Signup</h2>
      <input className={styles.input} type="text" value={name} placeholder="Name" onChange={(e) => {
        setName(e.target.value);
        if (name.length >= 10) {
          focusRef.current && focusRef.current.focus();
        }
      }} />
      <input className={styles.input} type="text" value={email} placeholder="Email" onChange={(e) => {
        setEmail(e.target.value);
      }} />
      <FancyButton ref={focusRef} children={"Submit"} />
    </section>
  )
}

const FancyButton = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  return <button className={styles.button} ref={ref}>{props.children}</button>
});

