import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './styles/index.scss';
import { Router } from './router/mainRouter.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Router />
    </StrictMode>,
);
