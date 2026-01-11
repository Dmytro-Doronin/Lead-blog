import type { Notification } from '../../context/notificationContext/NotificationsType.ts';

import styles from './notificationCenter.module.scss';

type Props = {
    notifications: Notification[];
    onClose: (id: string) => void;
};

export const NotificationCenter = ({ notifications }: Props) => {
    return (
        <div className={styles.notificationWrapper}>
            {notifications.map((n) => (
                <div key={n.id} className={`${styles.toastBox} ${styles[n.variant]}`}>
                    {n.message}
                </div>
            ))}
        </div>
    );
};
