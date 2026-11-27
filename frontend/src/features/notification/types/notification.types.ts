export type NotificationSeverity = 'success' | 'error' | 'warning' | 'info';

export interface NotificationState {
    id: number;
    open: boolean;
    message: string;
    severity: NotificationSeverity;
    duration: number;
}
