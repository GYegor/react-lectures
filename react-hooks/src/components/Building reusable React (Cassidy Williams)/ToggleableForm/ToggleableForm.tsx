import React, { useState, useRef, forwardRef, useEffect, createElement, Ref, RefObject } from 'react';
import styles from'./toggleableForm.module.scss';

// Overall, you want to be able to switch between forms.
// +1) Turn the Login/Signup forms into controlled components
// +2) Make just one form show up at a time
// +3) Make the buttons toggle which component is rendered
// +4) Forward the ref from the ToggleableForm to the components
// +5) Make a form's first input toggled when it is active using a side effect

export const ToggleableFormContainer: React.FC = () => {
  let data = [
    { name: 'Log in', component: LoginForm },
    { name: 'Sign up', component: SignupForm }
  ];
  return (
    <section className={styles.section}>
      <h2>Log in / Sign up</h2>
      <ToggleableForm options={data} />
    </section>
  );
};

interface ToggleableFormProps {
  options: { name: string, component: React.ForwardRefExoticComponent<Pick<any, any> & React.RefAttributes<HTMLInputElement>>}[];
}

interface ButtonToggleProps {
  toggleRef: any;
  toggleForm: any;
}

interface FormToggleProps {
  currentIndex: any;
}


const ToggleableForm: React.FC<ToggleableFormProps> = ({ options }) => {
  const [currentForm, setCurrentForm] = useState(0);
  const focusRef = useRef<HTMLInputElement>(null);
  
  return (
    <>
      {options.map((el, index) => {
        return <ButtonToggle key={`button${index}`} toggleRef={undefined} toggleForm={() => setCurrentForm(index)}>{el.name}</ButtonToggle>
      })}
      <FormToggle currentIndex={currentForm}>
        {options.map((el, index) => {
          return <div key={`form${index}`}>
            {createElement(el.component, { ref: focusRef })}
          </div>
        })}
      </FormToggle>
    </>
  );
}

const ButtonToggle: React.FC<ButtonToggleProps> = ({ children, toggleForm }) => {
  return <button onClick={() => {
    toggleForm();
  }}>{children}</button>
};

const FormToggle: React.FC<FormToggleProps> = ({ children, currentIndex }) => {
  if (Array.isArray(children)) {
    return <div>{children[currentIndex]}</div>
  }
  return null;
};

const LoginForm = forwardRef<HTMLInputElement>((_props, ref) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    (ref as RefObject<HTMLInputElement>).current?.focus();
  }, []);

  return (
    <>
      <input ref={ref} type="text" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
      <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
      <button>Submit</button>
    </>
  );
})

const SignupForm = forwardRef<HTMLInputElement>((props, ref: Ref<HTMLInputElement>) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    (ref as RefObject<HTMLInputElement>).current?.focus();
  }, [])
  
  return (
    <>
      <input ref={ref} type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="text" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
      <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
      <button>Submit</button>
    </>
  );
}) 
