import { createMuiTheme } from '@material-ui/core/styles';

const defaultTheme = createMuiTheme({
  typography: { useNextVariants: true },
})

// Theme for the tool
const materialTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#0e7cb4'
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
      fontSize: 42.725,
    },
    h2: {
      fontFamily: "sharpgrotesk-medium20, lato, helvetica neue, Arial, sans-serif, -apple-system",
      fontSize: 31.25,
    },
    h3: {
      fontFamily: "sharpgrotesk-medium20, lato, helvetica neue, Arial, sans-serif, -apple-system",
      fontSize: 25,
    },
    h4: {
      fontFamily: "sharpgrotesk-medium20, lato, helvetica neue, Arial, sans-serif, -apple-system",
      fontSize: 20,
    },
    h5: {
      fontFamily: "sharpgrotesk-medium20, lato, helvetica neue, Arial, sans-serif, -apple-system",
      fontSize: '1.094em',
    },
    h6: {
      fontFamily: "sharpgrotesk-medium20, lato, helvetica neue, Arial, sans-serif, -apple-system",
      fontSize: '1em',
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
    button: {
      fontFamily: "sharpgrotesk-medium15, lato, helvetica neue, Arial, sans-serif, -apple-system",
      textTransform: 'uppercase',
      letterSpacing: '.04em',
      fontSize: '0.875em',
      fontWeight: 'normal',
      color: '#fff'
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
    MuiTab: {
      labelContainer: {
        [defaultTheme.breakpoints.up('sm')]: {
          padding: "12px 24px 0"
        }
        
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