import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Rounded corners
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#e0e0e0', // Light border color
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#e0e0e0', // Keeps the border color on hover
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#e0e0e0', // Keeps the border color on focus
          },
        },
        notchedOutline: {
          // This targets the legend within the outlined input
          legend: {
            width: 0, // Collapse the legend width to minimize the cutout effect
            padding: 0, // Remove padding around the legend
          },
        },
        input: {
          height: '3rem',
          paddingBottom: '0px',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          fontWeight: 'bold', // Make input text bold
          fontSize: '1rem',

        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent', // Ensures no background color
          boxShadow: 'none', // Remove any shadow that could cover the outline
          color: 'gray', // Subtle label color,
          fontSize: '1rem',
          '&.Mui-focused': {
            backgroundColor: 'transparent',
            boxShadow: 'none', // Ensures no shadow on focus
          },
          '&.MuiInputLabel-shrink': {
            backgroundColor: 'transparent',
            boxShadow: 'none', // Ensures no shadow when label shrinks
          },
        },
        shrink: {
          top: '1rem',
          color: 'gray',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          height: '3rem', // Matches the input height
          paddingBottom: '0px',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          fontWeight: 'bold', // Make select text bold
          fontSize: '1rem',
          display: 'flex', // Ensures the select content aligns similarly to text input
          alignItems: 'center',
        },
        outlined: {
          borderRadius: '8px',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#e0e0e0', // Keeps the border color on hover for select
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#e0e0e0', // Keeps the border color on focus for select
          },
        },
        icon: {
          top: 'calc(50% - 12px)', // Aligns the dropdown icon vertically in the center
          right: '1rem', // Adjusts the right padding for the dropdown icon
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontWeight: 'bold', // Make menu item text bold
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#007bff', // Blue background color
          color: '#ffffff', // White text color
          borderRadius: '8px', // Rounded corners
          padding: '8px 16px', // Padding for a comfortable button size
          textTransform: 'none', // Disable uppercase transformation
          fontWeight: 'bold', // Make the text bold
          boxShadow: 'none', // Remove any shadow for a flat look
          '&:hover': {
            backgroundColor: '#0056b3', // Slightly darker blue on hover
            boxShadow: 'none', // Keep hover without shadow
          },
          '&:active': {
            backgroundColor: '#004080', // Darker shade on click
            boxShadow: 'none', // Keep active state flat
          },
        },
        
      },
    },
  },
});

export default theme;