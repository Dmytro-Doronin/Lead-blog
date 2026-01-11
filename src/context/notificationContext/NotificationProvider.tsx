import { type ReactNode, useState } from 'react';

import type { Notification } from './NotificationsType.ts';

import { NotificationCenter } from '../../components/notificationCenter/NotificationCenter.tsx';
import { NotificationContext } from './NotificationsContext';

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const remove = (id: string) => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    };

    const notify = (notification: Omit<Notification, 'id'>) => {
        const id = crypto.randomUUID();
        const duration = notification.duration ?? 4000;

        setNotifications((prev) => [...prev, { ...notification, id, duration }]);

        window.setTimeout(() => {
            remove(id);
        }, duration);
    };

    const success = (message: string, duration = 4000) =>
        notify({ message, variant: 'success', duration });

    const error = (message: string, duration = 4000) =>
        notify({ message, variant: 'error', duration });

    return (
        <NotificationContext.Provider value={{ notify, success, error }}>
            {children}
            <NotificationCenter notifications={notifications} onClose={remove} />
        </NotificationContext.Provider>
    );
};
