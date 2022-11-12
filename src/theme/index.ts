import { ThemeOptions, createTheme } from '@mui/material';
import rickAndMorty from './rickAndMorty';
import shadowsTheme, { ShadowsEnum } from './shadows';

export enum BorderRadius {
  Card = '14px',
  Filter = '12px',
}

export enum LetterSpacing {
  xs = '1.5px',
}

const customBaseOptions: ThemeOptions = {
  direction: 'ltr',
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: 'h6',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: BorderRadius.Card,
          overflow: 'hidden',
          boxShadow: ShadowsEnum.Main,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          overflow: 'hidden',
          boxShadow: ShadowsEnum.Main,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          overflow: 'hidden',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        fallback: {
          height: '75%',
          width: '75%',
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: '35px',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          paddingInline: '8px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: BorderRadius.Filter,
          backgroundColor: '#FFFFFF',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            border: '2px solid #0093B3',
          },
          '&& .MuiAutocomplete-endAdornment > button > svg': {
            fill: '#0093B3',
          },
        },
      },
    },
  },
  typography: {
    button: {
      fontWeight: 600,
      letterSpacing: LetterSpacing.xs,
    },
    fontFamily: [
      'Orbitron',
      '"Segoe UI"',
      '"Helvetica"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
    ].join(','),
    h1: {
      fontWeight: 600,
      fontSize: '3.5rem',
      letterSpacing: LetterSpacing.xs,
    },
    h2: {
      fontWeight: 600,
      fontSize: '3rem',
      letterSpacing: LetterSpacing.xs,
    },
    h3: {
      fontWeight: 600,
      fontSize: '2.25rem',
      letterSpacing: LetterSpacing.xs,
    },
    h4: {
      fontWeight: 600,
      fontSize: '2rem',
      letterSpacing: LetterSpacing.xs,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
      letterSpacing: LetterSpacing.xs,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
      letterSpacing: LetterSpacing.xs,
    },
    subtitle2: {
      // Utilizar en Typography que sean títulos de las Card pequeñas
      fontWeight: 600,
      fontSize: '0.875rem',
      letterSpacing: LetterSpacing.xs,
    },
    body1: {
      letterSpacing: LetterSpacing.xs,
    },
    body2: {
      // Utilizar en Typography que estén en el cuerpo de las Cards pequeñas
      fontWeight: 400,
      fontSize: '0.875rem',
      letterSpacing: LetterSpacing.xs,
    },
    overline: {
      fontWeight: 600,
      letterSpacing: LetterSpacing.xs,
    },
  },
};

const rickAndMortyTheme = createTheme({
  ...customBaseOptions,
  ...rickAndMorty,
  shadows: shadowsTheme,
});

export default rickAndMortyTheme;
