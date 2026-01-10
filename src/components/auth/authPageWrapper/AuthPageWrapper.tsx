import type { ReactNode } from 'react';

import styles from './authPAgeWrapper.module.scss';

export const AuthPageWrapper = ({ children }: { children: ReactNode }) => {
    return <div className={styles.wrapper}>{children}</div>;
};
