// import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { router } from './lib/router';
import { useAuthStore } from './store/authStore';

async function initApp() {
  const initAuth = useAuthStore.getState().initAuth;
  const user = await initAuth();
  router.update({
    context: {
      user,
    },
  });

  ReactDOM.createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    <App />
    // </StrictMode>
  );
}

initApp();
