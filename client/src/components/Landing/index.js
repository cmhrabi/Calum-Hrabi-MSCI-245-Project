import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { CLIENT_REMEMBER_OPTIONS } from 'mysql/lib/protocol/constants/client';
import { blue } from '@material-ui/core/colors';
import Container from '@material-ui/core/Container';
import NavBar from '../NavBar'
import * as ROUTES from '../../constants/routes';
import BackgroundSlider from 'react-background-slider'

const opacityValue = 1;

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

  const styles = theme => ({
    root: {
      body: {
        backgroundColor: "#ffffff",
        opacity: opacityValue,
        overflow: "hidden",
      },
    },
  
    mainMessage: {
      opacity: 2,
      justify: 'center',
      alignitems: 'center',
      color: '#42a5f5',
      paddingTop: '5vh',
      paddingBottom: '2vh'
    },
  
    gridMessage: {
      opacity: opacityValue,
      color: '#42a5f5',
      border: '1px solid black',
      borderRadius: 5,
      padding: 5,
      boxShadow: '2px 2px 5px',
      margin: 5,
    },
  
    inputFeilds: {
      borderRadius: 5,
      maxWidth: '40%',
      border: 1
    },
  
    input:{
      margin:10,
      color: '#42a5f5'
    },
  
    mainMessageContainer: {
      maxWidth: '100%',
    },
  
    paper: {
      overflow: "hidden",
      color: "white",
      margin: "10"
    },
  
    message: {
      opacity: 2,
      justify: 'center',
      alignitems: 'center',
      color: '#0047AB',
      paddingBottom: '5vh'
      //paddingBottom: theme.spacing(2),
    },
  
    movieGrid: {
      margin: 20,
      maxWidth: '75%'
    },
  
    movieImg: {
      border: '1px solid black',
      borderRadius: 5,
      boxShadow: '2px 2px 5px',
      align: "center"
    },
  
    selectInput: {
      minWidth: "50vh"
    },
  
    maxWidth: {
      maxWidth: "200px",
      opacity: opacityValue,
      color: '#42a5f5',
      border: '1px solid black',
      borderRadius: 5,
      padding: 5,
      boxShadow: '2px 2px 5px',
      margin: 5,
    },
  
    reviewMargin: {
      margin: 10
    },
  
    ratingError: {
      color: 'red'
    },

    opacityHalf: {
      borderRadius: 10,
      maxWidth: '60%',
      align: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      marginTop: '20vh'
    }
  
  });

class Landing extends Component{
    constructor(props){
      super(props);
      this.state = {
        mode: props.mode
      }
    }
  
    render(){
      const { classes } = this.props;
  
      return(
        <MuiThemeProvider theme={theme}>
        
        
        <BackgroundSlider
          images={["https://coolthemestores.com/wp-content/uploads/2021/05/star-wars-chrome-wallpaper.jpg", "https://i.pinimg.com/originals/f5/0c/be/f50cbe6e6620e34d4425482524f269b1.jpg", 
          "https://images8.alphacoders.com/112/1121038.jpg", "https://wallpaperaccess.com/full/1343405.jpg", "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/093387e1-a050-402f-ad20-7f08e1f0432b/d902u5x-e635c9bd-a19b-4ba8-84e8-284177ce4dfe.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzA5MzM4N2UxLWEwNTAtNDAyZi1hZDIwLTdmMDhlMWYwNDMyYlwvZDkwMnU1eC1lNjM1YzliZC1hMTliLTRiYTgtODRlOC0yODQxNzdjZTRkZmUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.kn0Zy2VKduSUH_8O4UcjPDGmhE-fKmbj8XymGMoJeYk"]}
          duration={3.5} transition={1}/>
        {/* <Paper style={{ minHeight: '90vh', borderRadius: 20, opacity: 0 }}> */}
        <Container
          justify="center"
          align="center"
          className={classes.mainMessageContainer}
          maxWidth='sm'
          style={{ minHeight: '70vh',}}
        >
          <Container item>
          <div className={classes.opacityHalf}>
            <Typography
              variant={"h3"}
              className={classes.mainMessage}
              align="center"
            >
                  Welcome to Calum's Movie App
            </Typography>
            <Typography variant={"h5"} className={classes.message}
              align="center">
              My app has three pages:
              <br/>
              Search: Allows users to search for movies and their reviews based on Movie Title, Director, and Actor
              <br/>
              Review: Allows users to submit custom reviews for movies
              <br/>
              Edit/Delete: Allows users to edit and delete their movie reviews
            </Typography>
          </div>
          </Container>
        </Container>
        {/* </Paper> */}
        </MuiThemeProvider>
      );
    }
  }

export default withStyles(styles)(Landing)