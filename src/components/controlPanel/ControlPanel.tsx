import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import Delete from '../icons/Delete.tsx';
import Edit from '../icons/Edit.tsx';
import Menu from '../icons/Menu.tsx';
import { Button } from '../ui/button/Button.tsx';
import { Typography } from '../ui/typography/Typography.tsx';
import styles from './controlPanel.module.scss';

type ControlPanel = {
    id: string;
    onDelete?: (id: string) => void;
    getToEdit: string;
};

export const ControlPanel = ({ id, onDelete, getToEdit }: ControlPanel) => {
    const [openMenu, setOpenMenu] = useState(false);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const onItemDelete = () => {
        onDelete?.(id);
        setOpenMenu(false);
    };

    useEffect(() => {
        if (!openMenu) {
            return;
        }

        const onPointerDown = (e: PointerEvent) => {
            const el = wrapperRef.current;
            if (!el) {
                return;
            }

            if (!el.contains(e.target as Node)) {
                setOpenMenu(false);
            }
        };

        document.addEventListener('pointerdown', onPointerDown);

        return () => document.removeEventListener('pointerdown', onPointerDown);
    }, [openMenu]);

    return (
        <div ref={wrapperRef} className={styles.wrapper}>
            <Button variant="transparent" onClick={() => setOpenMenu((prev) => !prev)}>
                <Menu className={styles.icon} />
            </Button>
            <div className={openMenu ? `${styles.icons} ${styles.open}` : styles.icons}>
                <NavLink className={styles.item} to={getToEdit}>
                    <Edit className={styles.icon} />
                    <Typography variant="body1">Edit</Typography>
                </NavLink>
                <Button className={styles.item} variant="transparent" onClick={onItemDelete}>
                    <Delete className={styles.icon} />
                    <Typography variant="body1">Delete</Typography>
                </Button>
            </div>
        </div>
    );
};
