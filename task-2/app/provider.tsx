"use client"
import { ReactNode } from 'react';
import theme from './theme';
import { ThemeProvider } from '@mui/material';


export const Providers = ({ children }: ContextProps) => {
  return (

    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider >
  )
}


interface ContextProps {
  children: ReactNode
}