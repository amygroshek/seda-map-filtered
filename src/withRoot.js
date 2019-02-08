import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import blue from '@material-ui/core/colors/blue';
import lightGreen from '@material-ui/core/colors/lightGreen';

// Theme for the tool
const theme = createMuiTheme({
  overrides: {
    MuiInputBase: {
      root: {
        'label + &': {
          marginTop: '20px!important',
        },
        '&:before': {
          borderBottomColor: 'rgba(0,0,0,0)!important'
        }
      },
      input: {},
      multiline: {
        padding: 0,
        marginBottom: 16
      }
    },
    MuiInput: {
      // Name of the rule
      input: {
        borderRadius: 0,
        lineHeight: 1,
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        fontSize: 16,
        padding: '8px 8px',
        '&:focus': {
          borderColor: '#1383C6',
          boxShadow: '0 0 0 0.2rem #1383C633',
        },
      },
    },
    MuiCard: {
      root: { 
        boxShadow: '0 0 0 1px #e0e0e0, 0 2px 2px rgba(0,0,0,0.1)', 
      },
    },
    MuiSelect: {
      select: {
        borderRadius: 0,
      },
      icon: {
        right: 8
      }
    },
  },
  palette: {
    primary: blue,
    secondary: lightGreen,
  },
  typography: {
    useNextVariants: true,
  },
  shape: {
    borderRadius: 0,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1920
    }
  }
});

function withRoot(Component) {
  function WithRoot(props) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={ theme }>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component { ...props } />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;