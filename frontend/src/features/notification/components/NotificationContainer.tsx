import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Slide, { type SlideProps } from '@mui/material/Slide';
import { alpha, keyframes } from '@mui/material/styles';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { useNotificationStore } from '@/features/notification/stores/notificationStore.ts';

const severityConfig = {
    success: { color: '#16A34A', Icon: CheckCircleRoundedIcon },
    error: { color: '#DC2626', Icon: ErrorRoundedIcon },
    warning: { color: '#D97706', Icon: WarningAmberRoundedIcon },
    info: { color: '#2563EB', Icon: InfoRoundedIcon },
} as const;

const shrink = keyframes`
    from { transform: scaleX(1); }
    to   { transform: scaleX(0); }
`;

function SlideLeft(props: SlideProps) {
    return <Slide {...props} direction="left" />;
}

export default function NotificationContainer() {
    const { open, message, severity, duration, id, hide } = useNotificationStore();
    const { color, Icon } = severityConfig[severity];
    const hasTimer = typeof duration === 'number' && duration > 0;

    return (
        <Snackbar
            key={id}
            open={open}
            // Animation của progress bar đóng vai trò timer (xem onAnimationEnd bên dưới)
            autoHideDuration={null}
            onClose={(_, reason) => {
                if (reason !== 'clickaway') hide();
            }}
            slots={{ transition: SlideLeft }}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            sx={{
                mt: 1,
                mr: 1,
                maxWidth: 'calc(100vw - 32px)',
            }}
        >
            <Alert
                severity={severity}
                variant="standard"
                onClose={hide}
                icon={
                    <Box
                        sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            display: 'grid',
                            placeItems: 'center',
                            color,
                            bgcolor: alpha(color, 0.12),
                        }}
                    >
                        <Icon sx={{ fontSize: 20 }} />
                    </Box>
                }
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    width: '100%',
                    minWidth: 300,
                    maxWidth: 420,
                    alignItems: 'center',
                    py: 1.25,
                    pl: 2.5,
                    pr: 1.5,
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    backgroundImage: 'none',
                    color: 'text.primary',
                    boxShadow: '0 10px 28px -8px rgba(15, 23, 42, 0.18), 0 2px 6px rgba(15, 23, 42, 0.06)',

                    // Vạch màu bên trái
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: 4,
                        bgcolor: color,
                    },

                    '&:hover .notification-progress': {
                        animationPlayState: 'paused',
                    },

                    '& .MuiAlert-icon': {
                        p: 0,
                        mr: 1.5,
                        opacity: 1,
                        alignItems: 'center',
                    },

                    '& .MuiAlert-message': {
                        p: 0,
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        lineHeight: 1.5,
                        color: 'text.primary',
                    },

                    '& .MuiAlert-action': {
                        p: 0,
                        m: 0,
                        ml: 1,
                        alignSelf: 'center',
                        color: 'text.disabled',
                        '& .MuiIconButton-root:hover': {
                            color: 'text.primary',
                            bgcolor: 'action.hover',
                        },
                    },
                }}
            >
                {message}

                {hasTimer && (
                    <Box
                        key={id}
                        className="notification-progress"
                        onAnimationEnd={hide}
                        sx={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            height: 3,
                            bgcolor: color,
                            opacity: 0.85,
                            transformOrigin: 'left center',
                            animation: `${shrink} ${duration}ms linear forwards`,
                        }}
                    />
                )}
            </Alert>
        </Snackbar>
    );
}
