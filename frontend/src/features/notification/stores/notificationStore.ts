import type { NotificationSeverity, NotificationState } from '@/features/notification/types/notification.types.ts';
import { create } from 'zustand';

interface NotificationActions {
    show: (message: string, severity?: NotificationSeverity, duration?: number) => void;
    hide: () => void;
}

export const useNotificationStore = create<NotificationState & NotificationActions>((set) => ({
    open: false,
    message: '',
    severity: 'info',
    duration: 3000,
    id: 0,
    show: (message, severity = 'info', duration = 3000) => set((state) => ({ open: true, message, severity, duration, id: state.id + 1 })),
    hide: () => set({ open: false }),
}));
