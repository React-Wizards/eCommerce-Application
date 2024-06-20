import { createRoot } from 'react-dom/client';
import App from '../App';

jest.mock('@/shared/constants/env.ts', () => ({
  env: {
    CLIENT_SECRET: '',
    PROJECT_KEY: '',
    CLIENT_ID: '',
    AUTH_URL: '',
    API_URL: ''
  }
}));

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(<App />);
  root.unmount();
});
