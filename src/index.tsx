/* @refresh reload */
import './index.css';
import { render } from 'solid-js/web';
import 'solid-devtools';

import { loadMembers, saveMembers } from './storage';

function seedInitialData() {
  const members = loadMembers()
  if (members.length === 0) {
    const initialMembers = [
      { id: 'demo_1', name: 'Anna Schmidt', contract: 1.0, isActive: true },
      { id: 'demo_2', name: 'Ben Müller', contract: 1.0, isActive: true },
      { id: 'demo_3', name: 'Clara Weber', contract: 0.5, isActive: true },
    ]
    saveMembers(initialMembers)
  }
}

seedInitialData()

import App from './App';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => <App />, root!);
