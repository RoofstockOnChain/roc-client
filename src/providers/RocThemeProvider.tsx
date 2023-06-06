import { FC, ReactNode } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    slate: {
      p800: string;
    };
  }
  interface PaletteOptions {
    slate: {
      p800: string;
    };
  }
}

interface RocThemeProviderProps {
  children: ReactNode;
}

export const RocThemeProvider: FC<RocThemeProviderProps> = ({ children }) => {
  const rocTheme = createTheme({
    palette: {
      slate: {
        p800: '#232A35',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'initial',
          },
          containedPrimary: {
            backgroundColor: '#fff',
            color: '#232A35',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          h1: {
            fontFamily: '"Roboto Mono", monospace',
            fontSize: '4.5rem',
            fontWeight: 700,
            letterSpacing: '-0.053em',
            lineHeight: '100%',
          },
          subtitle1: {
            fontSize: `1.875rem`,
            fontWeight: 600,
            letterSpacing: 'normal',
            lineHeight: 1.2,
          },
        },
      },
    },
  });

  return <ThemeProvider theme={rocTheme}>{children}</ThemeProvider>;
};
