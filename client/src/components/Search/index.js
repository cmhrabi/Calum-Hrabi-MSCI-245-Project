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
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select, { SelectChangeEvent } from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel  from '@material-ui/core/FormControlLabel';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@mui/material/Alert'
import { maxWidth } from '@mui/system';
import FormLabel from '@material-ui/core/FormLabel';
import NavBar from '../NavBar';

//Dev mode
//const serverURL = ""; //enable for dev mode
const serverURL ="http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3097";

//Deployment mode instructions
//const serverURL = "http://ov-research-4.uwaterloo.ca:PORT"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const fetch = require("node-fetch");

const opacityValue = 1;


const theme = createTheme({
  palette: {
    type: 'light',
    background: {
      default: "black"
    },
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#000000",
    },
    warning:{
      main: "#880808"
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
    opacity: opacityValue,
    justify: 'center',
    alignitems: 'center',
    color: '#42a5f5',
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
    marginTop: "2vh",
    maxWidth: '100%',
  },

  paper: {
    overflow: "hidden",
    color: "white",
    margin: "10"
  },

  message: {
    opacity: opacityValue,
    maxWidth: "50%",
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
  }

});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
}); 

class MainMessage extends Component{
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
      <Container
        justify="center"
        alignitems="center"
        className={classes.mainMessageContainer}
        maxWidth='sm'
      >
        <Container item>

          <Typography
            variant={"h3"}
            className={classes.mainMessage}
            align="center"
          >
            {this.state.mode === 0 ? (
              <React.Fragment>
                Search for a Movie!
              </React.Fragment>
            ) : (
              <React.Fragment>
                Welcome back!
              </React.Fragment>
            )}
          </Typography>
        </Container>
      </Container>
      </MuiThemeProvider>
    );
  }
}

class Search extends Component{
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      mode: 0,
      movies: [],

      enteredMovie: "",
      enteredDirector: "",
      enteredActor: "",
      er: false,

      ratingList: [1, 2, 3, 4, 5]
    }

    this.enterMovie = this.enterMovie.bind(this)
    this.enterDirector= this.enterDirector.bind(this)
    this.enterActor = this.enterActor.bind(this)
    this.submit = this.submit.bind(this)
  };

  enterMovie(event) {
    this.setState({enteredMovie: event.target.value})
    console.log(event.target.value)
  }

  enterDirector(event) {
    this.setState({enteredDirector: event.target.value})
    console.log(event.target.value)
  }

  enterActor(event) {
    this.setState({enteredActor: event.target.value})
    console.log(event.target.value)
  }

  submit() {
    console.log("it is here")
    if(this.state.enteredMovie === "" && this.state.enteredDirector === "" && this.state.enteredActor === ""){
      this.setState({er: true})
    }else{
      this.searchMovies()
    }
    
  }
  
  setMovies = (moviesList) => {
    this.setState({movies: moviesList});
  }

  callApiGetMovies = async () => {
    const url = serverURL + "/api/getMovies";
    console.log(url);
    const response = await fetch(url, {
    method: "GET",
    headers: {
    "Content-Type": "application/json",
    }
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Movies: ", body);
    return body;
    };

    loadMovies = () => {
        this.callApiGetMovies().then((res) => {
        var parsed = JSON.parse(res.express);
        console.log(parsed)
        this.setState({movies: parsed});
        })   
    };

    callApiSearchMovies = async () => {
        const url = serverURL + "/api/searchMovies";
        console.log(url);
        const response = await fetch(url, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieName: this.state.enteredMovie,
          directorName: this.state.enteredDirector,
          actorName: this.state.enteredActor
        })
        });
        
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("Movie: ", body);
        return body;
      }

    searchMovies = () => {
        this.callApiSearchMovies().then((res) => {
        var parsed = JSON.parse(res.express);
        console.log(parsed)
        this.setState({movies: parsed});
        })   
    };

    componentDidMount() {
      this.loadMovies()
    };

  render() {
    const { classes } = this.props;
    
    const reviewForm = (
      <Container 
      justify="center"
      alignitems="center"
      className={classes.mainMessageContainer}
      maxWidth='sm'>
        <Container item
        align="center"
        justify="center">
        <TextField id="outlined-basic" label="Movie Title" variant="outlined" onChange={this.enterMovie} className={classes.input}/>            
        <TextField id="outlined-basic" label="Director" variant="outlined" onChange={this.enterDirector} className={classes.input}/>
        <TextField id="outlined-basic" label="Actor" variant="outlined" onChange={this.enterActor} className={classes.input}/>
          <br/>
          <Button variant="contained" onClick={this.submit}>Search</Button>
        </Container>
      </Container>
    )

    const movieGrid = (
      <Grid
        container
        spacing={10}
        justify="center"
        alignitems="center"
        style={{ minHeight: '30vh' }}
        className={classes.mainMessageContainer}
        maxWidth='sm'
        wrap="wrap">
          {this.state.movies.map(movies => (
            <Grid item
            classname={classes.movieGrid}
            align="center"
            style={{ flexShrink: 1 }}
            >
              <Typography 
              align="center"
              className={classes.gridMessage}
              variant="h5"
              >
                {movies.name}
              <Typography>
                Director: {movies.director_name} 
                <br/>
                {movies.reviewScore ? 
                <div>Average score: {movies.reviewScore}/5 </div>: 
                <div>Average score: no reviews entered </div>
                }
              </Typography>
              </Typography>
                {movies.reviewContent ? 
                movies.reviewContent.split(",").map(review => (
                  <Typography 
                    align="center"
                    className={classes.gridMessage}
                    variant="h5"
                    >
                      {review}
                </Typography>
                )): 
                <div></div>
                }
              {/* <Typography>
                Director: {movies.director_name} 
                <br/>
                {movies.reviewScore ? 
                <div>Avegarge score: {movies.reviewScore}/5 </div>: 
                <div>Avegarge score: no reviews entered </div>
                }
              </Typography> */}
            </Grid>
          ))}
      </Grid>
    )

    return (
    <MuiThemeProvider theme={theme}>
      
      <div className={classes.root}>
        <CssBaseline />
          <Paper
            className={classes.paper}
          >
          <MainMessage mode={this.state.mode} classes={classes}/>
            {reviewForm}
            {movieGrid}
        </Paper>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(Search);