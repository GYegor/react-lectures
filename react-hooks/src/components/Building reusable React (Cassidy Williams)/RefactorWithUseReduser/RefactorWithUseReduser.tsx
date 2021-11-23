import React, { Reducer, useReducer } from 'react';
import styles from './refactorWithUseReduser.module.scss';

// 1. Replace the useStates with a useReducer
// 2. Move our useReducer into a custom hook

let backgrounds = [
  'Noble',
  'Urchin',
  'Folk Hero',
  'Acolyte',
  'Criminal',
  'Hermit',
  'Guild Artisan',
  'Sage',
];

interface State {
  darkMode: boolean;
  name: string,
  backGround: string,
  error: string | null,
}

type Action = 
    { type: 'SET_DARK_MODE' }
  | { type: 'SET_NAME', by: string }
  | { type: 'SET_BACKGROUND', by: string }
  | { type: 'SET_ERROR', by: string }
  | { type: 'NONEXISTENT_BACKGROUND' }
  | { type: 'NAME_TOO_LONG' }
  | { type: 'DISMISS_ERROR' }
  | { type: 'RANDOMIZE_VALS' }

function randomBackground(): string {
  return backgrounds[Math.floor(Math.random() * backgrounds.length)]
}

function randomName(): string {
  let array = ['Коля', 'Вася', 'Петя', 'Жора',];
  let string = array[Math.floor(Math.random() * array.length)];
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function useCardReduser(initialState: State): [State, React.Dispatch<Action>] {
  const [state, dispatch] = useReducer<Reducer<State, Action>>((state: State, action: Action) => {
    switch (action.type) {
      case 'SET_DARK_MODE':
        return { ...state, darkMode: !state.darkMode };
      case 'SET_NAME':
        return { ...state, name: action.by, error: null };
      case 'SET_BACKGROUND':
        return { ...state, backGround: action.by, error: null };
      case 'SET_ERROR':
        return { ...state, error: action.by };
      case 'NONEXISTENT_BACKGROUND': 
        return { ...state, error: 'This background does NOT exist.' };
      case 'NAME_TOO_LONG': 
        return { ...state, error: 'Name is WAY too long, bucko' };
      case 'DISMISS_ERROR': 
        return { ...state, error: '' };
      case 'RANDOMIZE_VALS': 
        return { ...state, name: randomName(), background: randomBackground() };
      default:
        return state;
    }
  }, initialState);
  return [state, dispatch];
}

export default function RefactorWithUseReduser() { 
  const initialState: State = {
    darkMode: false,
    name: '',
    backGround: '',
    error: ''
  };
  
  const [{ name, backGround, darkMode, error }, dispatch] = useCardReduser(initialState);

  function handleBackgroundSelect(event: { target: { value: any; }; }) {
    let value = event.target.value;
    dispatch({type: 'SET_BACKGROUND', by: value});
    if (!backgrounds.includes(value)) {
      dispatch({ type: 'NONEXISTENT_BACKGROUND' });
    }
  }

  return (
    <section className={styles.section}>
      <div className={`${styles.App} ${darkMode ? styles.darkmode : ''}`}>
        <button
          onClick={() => {
            dispatch({ type: 'SET_DARK_MODE' });
          }}
        >
          Dark Mode {darkMode ? 'ON' : 'OFF'}
        </button>{' '}
        <br />
        <input
          type='text'
          placeholder='Type your name'
          value={name}
          onChange={(event) => {
            dispatch({ type: 'SET_NAME', by: event.target.value})
            if (event.target.value.length > 15) {
              dispatch({ type: 'NAME_TOO_LONG' });
            }
          }}
        />
        <select value={backGround} onChange={handleBackgroundSelect}>
          {backgrounds.map((b) => {
            return <option key={`bg-${b}`}>{b}</option>
          })}
        </select>
        {error && (
          <div className={styles.error}>
            {error}
            <button
              onClick={() => {
                dispatch({ type: 'DISMISS_ERROR' });
              }}
            >
              Dismiss
            </button>
          </div>
        )}
        <div className={styles.sheet}>
          <h3>Name: {name}</h3>
          <h3>Background: {backGround}</h3>
        </div>
        <button
          onClick={() => {
            dispatch({ type: 'RANDOMIZE_VALS' });
          }}
        >
          Do it all for me instead
        </button>
      </div>
    </section>
  )
}
