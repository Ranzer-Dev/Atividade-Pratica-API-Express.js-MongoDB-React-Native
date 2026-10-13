import { MD3DarkTheme } from 'react-native-paper';

export const theme = {
    ...MD3DarkTheme,

    colors: {
        ...MD3DarkTheme.colors,

        primary: '#7C3AED',
        onPrimary: '#FFFFFF',

        secondary: '#A78BFA',
        onSecondary: '#FFFFFF',

        background: '#0B0B0F',
        onBackground: '#FFFFFF',

        surface: '#15141B',
        onSurface: '#FFFFFF',

        surfaceVariant: '#211E2A',
        onSurfaceVariant: '#9693A1',

        outline: '#34313E',
        outlineVariant: '#292732',

        error: '#E8798A',
        onError: '#FFFFFF',
    },
};