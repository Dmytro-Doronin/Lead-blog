export type NotificationVariant = 'success' | 'error';

export type Notification = {
    id: string;
    message: string;
    variant: NotificationVariant;
    duration?: number;
};
export type NotificationContextType = {
    notify: (notification: Omit<Notification, 'id'>) => void;
    success: (message: string, duration?: number) => void;
    error: (message: string, duration?: number) => void;
};
