import { useNotificationStore } from '@/features/notification/stores/notificationStore.ts';

export const notify = {
    success: (message: string) => useNotificationStore.getState().show(message, 'success'),
    error: (message: string) => useNotificationStore.getState().show(message, 'error'),
    warning: (message: string) => useNotificationStore.getState().show(message, 'warning'),
    info: (message: string) => useNotificationStore.getState().show(message, 'info'),
};
