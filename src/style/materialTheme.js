import { createMuiTheme } from '@material-ui/core/styles';

const defaultTheme = createMuiTheme({
  typography: { useNextVariants: true },
})

console.log(defaultTheme)

// Theme for the tool
const materialTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#083794'
    },
    secondary: {
      main: '#ff003e',
    },
    text: {
      primary: "#031232",
      secondary: "#5d5d5d",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
    divider: "rgba(0, 0, 0, 0.15)"
  },
  typography: {
    useNextVariants: true,
    color: '#031232',
    fontFamily: "maisonneue-book,lato,helvetica neue,Arial,sans-serif,-apple-system",
    h1: {
      fontFamily: "sharpgrotesk-medium20, lato, helvetica neue, Arial, sans-serif, -apple-system",
      fontSize: 32,
    },
    h2: {
      fontFamily: "sharpgrotesk-medium20, lato, helvetica neue, Arial, sans-serif, -apple-system",
      fontSize: 26,
    },
    h3: {
      fontFamily: "sharpgrotesk-medium20, lato, helvetica neue, Arial, sans-serif, -apple-system",
      fontSize: 21,
    },
    h4: {
      fontFamily: "sharpgrotesk-medium20, lato, helvetica neue, Arial, sans-serif, -apple-system",
      fontSize: 18.5,
    },
    h5: {
      fontFamily: "sharpgrotesk-medium20, lato, helvetica neue, Arial, sans-serif, -apple-system",
      fontSize: 16,
    },
    h6: {
      fontFamily: "sharpgrotesk-medium20, lato, helvetica neue, Arial, sans-serif, -apple-system",
      fontSize: 14,
    },
    body1: {
      fontSize: '1em',
    },
    body2: {
      fontSize: '0.875em',
    },
    caption: {
      fontSize: '0.8em',
    },
    subtitle1: {
      fontSize: 14,
    },
    subtitle2: {
      fontSize: 14,
      fontFamily: "sharpgrotesk-medium15, lato, helvetica neue, Arial, sans-serif, -apple-system",
      textTransform: 'uppercase',
      letterSpacing: '.02em',
      fontWeight: 'normal',
    },
    button: {
      fontFamily: "sharpgrotesk-medium15, lato, helvetica neue, Arial, sans-serif, -apple-system",
      textTransform: 'uppercase',
      letterSpacing: '.04em',
      fontSize: '0.875em',
      fontWeight: 'normal',
      color: '#fff',
      lineHeight: 1,
    }
  },
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
    MuiTabs: {
      flexContainer: {
        height: 64
      },
      
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

export default materialTheme;