import { createContext } from 'react';

import type { NotificationContextType } from './NotificationsType.ts';

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);
