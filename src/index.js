import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { AuthGate } from "./features/auth/AuthGate.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthGate>
      {({ user, userData, role }) => (
        <App
          currentUser={user}
          currentUserData={userData}
          role={role}
        />
      )}
    </AuthGate>
  </React.StrictMode>
);


serviceWorkerRegistration.register();