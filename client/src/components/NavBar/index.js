import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/core/Menu';
import { MuiThemeProvider, createTheme, useTheme } from "@material-ui/core/styles";
import "./navBar.css"

const theme = createTheme({
    palette: {
      type: 'light',
      background: {
        default: "#42a5f5"
      },
      primary: {
        main: "#42a5f5",
        contrastText: "#ffffff"
      },
      secondary: {
        main: "#ffffff",
      },
      warning:{
        main: "#880808"
      },
      textColor: {
        main: "#ffffff"
      }
    },
  });  

export default function ButtonAppBar() {
    return (
      <MuiThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" alignItems="center" color={theme.background}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#ffffff" }}>
              MSCI 245 D3 App
            </Typography>
            <Button color="inherit" className={`button`}>Search</Button>
            <Button color="inherit">Review</Button>
            <Button color="inherit">My Choice</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </MuiThemeProvider>
    );
  }