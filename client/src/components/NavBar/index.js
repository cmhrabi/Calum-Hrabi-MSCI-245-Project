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
import {BrowserRouter as Router, Link} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { withStyles } from '@material-ui/core/styles';

const theme = createTheme({
    palette: {
      type: 'light',
      background: {
        default: "#42a5f5"
      },
      primary: {
        main: "#42a5f5",
        // contrastText: "#ffffff"
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

  const styles = theme => ({
    button: {
      padding: 10,
      color: '#ffffff'
    },

    buttonDiv: {
      alignItems:  'center'
    },

    title: {
      marginRight: 15,
      color: '#ffffff'
    }
  })

function ButtonAppBar(props) {
    const { classes } = props;

    return (
      <MuiThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" align="center" color={theme.background}>
          <Toolbar sx={{ justifyContent: "flex-end" }} align='center'>
            <Link to={ROUTES.LANDING} style={{ textDecoration: 'none'}}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 0}} className={classes.title}>
                Calum's Movie App
              </Typography>
            </Link>
            <div className={classes.buttonDiv} align='center'>
              <Link to={ROUTES.SEARCH} style={{ textDecoration: 'none'}}>
                  <Button className={classes.button} align='center'>Search</Button>
              </Link>
              <Link to={ROUTES.REVIEW} style={{ textDecoration: 'none'}}>
                  <Button className={classes.button}>Review</Button>
              </Link>
              <Link to={ROUTES.EDIT} style={{ textDecoration: 'none'}}>
                  <Button className={classes.button} align='center'>Edit/Delete</Button>
              </Link>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </MuiThemeProvider>
    );
  }

  export default withStyles(styles)(ButtonAppBar);