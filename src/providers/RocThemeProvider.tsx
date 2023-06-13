import { FC, ReactNode } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      slate: string;
      orange: string;
    };
  }
  interface PaletteOptions {
    custom: {
      slate: string;
      orange: string;
    };
  }
}

interface RocThemeProviderProps {
  children: ReactNode;
}

export const RocThemeProvider: FC<RocThemeProviderProps> = ({ children }) => {
  const rocTheme = createTheme({
    typography: {
      subtitle1: {
        fontFamily: 'Roboto',
        fontSize: '1.25rem',
        fontWeight: 600,
        letterSpacing: '0.031em',
        lineHeight: 1.2,
      },
    },
    palette: {
      mode: 'dark',
      custom: {
        slate: '#232A35',
        orange: '#FD9D4F',
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
      MuiCardContent: {
        styleOverrides: {
          root: {
            backgroundColor: 'rgb(21, 25, 32)',
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            textDecoration: 'initial',
          },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            color: '#fff',
          },
        },
      },
      MuiListSubheader: {
        styleOverrides: {
          root: {
            backgroundColor: 'transparent',
            color: '#fff',
            fontSize: '1.875rem',
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            paddingLeft: '0 !important',
            paddingRight: '0 !important',
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
          h3: {
            fontFamily: '"Roboto Mono", monospace',
          },
          h6: {
            fontFamily: '"Roboto Mono", monospace',
          },
        },
      },
    },
  });

  return <ThemeProvider theme={rocTheme}>{children}</ThemeProvider>;
};
