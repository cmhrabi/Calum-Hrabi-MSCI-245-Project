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

//Dev mode
const serverURL = ""; //enable for dev mode

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
  }

});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

class Home extends Component {
  
  constructor(props) {
    super(props);
    }

  componentDidMount() {
    //this.loadUserSettings();
  }


  loadUserSettings() {
    this.callApiLoadUserSettings()
      .then(res => {
        //console.log("loadUserSettings returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("loadUserSettings parsed: ", parsed[0].mode)
        this.setState({ mode: parsed[0].mode });
      });
  }

  callApiLoadUserSettings = async () => {
    const url = serverURL + "/api/loadUserSettings";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        userID: this.state.userID
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  }

 

  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
          <Review classes={classes}/>
      </MuiThemeProvider>
    );
  }
}

class ReviewTitle extends Component {
  constructor(props){
    super(props);
    this.state ={
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.props.handleParent(event.target.value)
    console.log(event.target.value)
  }

  render() {
    const { classes } = this.props;

    return (
      <TextField id="outlined-basic" label="Review Name" variant="outlined" onChange={this.handleChange} className={classes.input}/>
    );
  }
}

class ReviewBody extends Component {
  constructor(props){
    super(props);
    this.state ={
      enteredReview: ""
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.props.handleParent(event.target.value)
    console.log(event.target.value)
  }

  render() {
    const { classes } = this.props;

    return (
        <TextField
          id="filled-multiline-static"
          label="Review Body"
          multiline
          rows={5}
          variant="filled"
          inputProps={{
            maxlength: 200
          }}
          helperText="Must be less than 200 Characters." 
          onChange={this.handleChange}
        />    
      );
  }
}

class ReviewRating extends Component {
  constructor(props){
    super(props);
    this.state ={
      rating: props.rating,
      selectRating: 0

    }

  this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.props.handleParent(event.target.value)
    this.setState({selectRating: event.target.value})
    console.log(event.target.value)
  }

  render() {
    const { classes } = this.props;

    return (
    <MuiThemeProvider theme={theme}>
        <RadioGroup
        row
        name="position"
        onChange={this.handleChange}
        className={classes.input}
      >
        <FormControlLabel
          value="1"
          control={<Radio />}
          label="1"
          labelPlacement="top"
        />
        <FormControlLabel
          value="2"
          control={<Radio />}
          label="2"
          labelPlacement="top"
        />
        <FormControlLabel
          value="3"
          control={<Radio />}
          label="3"
          labelPlacement="top"
        />
        <FormControlLabel
          value="4"
          control={<Radio />}
          label="4"
          labelPlacement="top"
        />
        <FormControlLabel
          value="5"
          control={<Radio />}
          label="5"
          labelPlacement="top"
        />
      </RadioGroup>
    </MuiThemeProvider>    
      );
  }
}

class MovieSelection extends Component{
  constructor(props){
    super(props);
    this.state ={
      movies: props.movies,
      selectMovie: ""
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({selectMovie: event.target.value})
    this.props.handleParent(event.target.value)
    console.log(event.target.value)
  }

  render() {
    const { classes } = this.props;

    return(
    <div>
      <InputLabel id="demo-simple-select-label">Movies</InputLabel>
  <Select
    className={classes.selectInput}
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={this.state.selectMovie}
    label="Movies"
    onChange={this.handleChange}
  >
    <MenuItem value={-1}>None</MenuItem>
    {this.state.movies.map((movie, index) => (
      <MenuItem value={index}>{movie.name}</MenuItem>
    ))}
    </Select>
    </div>
    );
  }
}

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
                Welcome to Calum's Movie Review App
                <br/>
                Review a Movie!
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

class Review extends Component{
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      mode: 0,
      movies: [
         {
           "name": "The Big Short",
           "logo": "https://m.media-amazon.com/images/M/MV5BNDc4MThhN2EtZjMzNC00ZDJmLThiZTgtNThlY2UxZWMzNjdkXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_FMjpg_UX1000_.jpg",
           "reviews": {

           }
          },
       
         {
           "name": "The Batman",
           "logo": "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg",
           "reviews": {

          }
          },
       
         {
           "name": "Parasite",
           "logo": "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
           "reviews": {

          }
         },

         {
          "name": "The City of God",
          "logo": "https://m.media-amazon.com/images/M/MV5BOTMwYjc5ZmItYTFjZC00ZGQ3LTlkNTMtMjZiNTZlMWQzNzI5XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
          "reviews": {

          }
        },

        {
          "name": "Dune",
          "logo": "https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg",
          "reviews": {

          }
        }
       ],
      errorList: [
        "Please enter your Movie title",
        "Please enter your review title",
        "Please enter your review",
        "Please select the rating" 
      ],

      errorIndex: -1,
      sbOpen: false,
      selectedMovie: -1,
      enteredTitle: "",
      enteredReview: "",
      selectedRating: -1,
      sbEROpen: false,

      ratingList: [1, 2, 3, 4, 5]
    }

    this.selectMovie = this.selectMovie.bind(this)
    this.enterReview= this.enterReview.bind(this)
    this.enterTitle = this.enterTitle.bind(this)
    this.selectRating = this.selectRating.bind(this)
    this.submit = this.submit.bind(this)
    this.sbERHandleClose = this.sbERHandleClose.bind(this)
    this.sbHandleClose = this.sbHandleClose.bind(this)
  };

  selectMovie(value) {
    this.setState({selectedMovie: value})
    console.log(value)
  }

  enterReview(value) {
    this.setState({enteredReview: value})
    console.log(value)
  }

  enterTitle(value) {
    this.setState({enteredTitle: value})
    console.log(value)
  }

  selectRating(value) {
    this.setState({selectedRating: value})
    console.log(value)
  }

  submit() {
    const title = this.state.enteredTitle;
    const body = this.state.enteredReview;
    const rating = this.state.selectedRating;

    if(this.state.selectedMovie == -1){
      this.setState({errorIndex: 0})
      this.setState({sbEROpen: true})
    }
    else if(title === ""){
      this.setState({errorIndex: 1})
      this.setState({sbEROpen: true})
      
    }
    else if(body === ""){
      this.setState({errorIndex: 2})
      this.setState({sbEROpen: true})
      
    }
    else if(rating === -1){
      this.setState({errorIndex: 3})
      this.setState({sbEROpen: true})
    }
    

    else{

    this.setState(prevState => ({

      movies: prevState.movies.map((movies, index) => (
      
        index === this.state.selectedMovie ? { ...movies, reviews: {...movies.reviews, [title]: {"body": body, "rating": rating}}  }: movies
      ))

    }))
    console.log(this.state.enteredReview)
      console.log(rating)

    this.setState({sbOpen: true})
  }

  }

  sbHandleClose(event, reason) {
    this.setState({sbOpen: false});
  };

  sbERHandleClose(event, reason) {
    this.setState({sbEROpen: false});
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
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}
          alignitems="center" justify="center">
              <MovieSelection movies={this.state.movies} handleParent={this.selectMovie} classes={classes}/>
              <ReviewTitle handleParent={this.enterTitle} classes={classes}/>
              <ReviewBody handleParent={this.enterReview} classes={classes}/>
              <ReviewRating rating={this.state.ratingList} handleParent={this.selectRating} classes={classes}/>
              <Button variant="contained" onClick={this.submit}>Submit Review</Button>
          </FormControl>
          <Snackbar open={this.state.sbOpen}  autoHideDuration={60}>
            <Alert severity="success" onClose={this.sbHandleClose} sx={{ width: '100%' }}>
              Review Submitted Succesfully
            </Alert>
          </Snackbar>
          <Snackbar open={this.state.sbEROpen} autoHideDuration={60}>
            <Alert severity="error" onClose={this.sbERHandleClose} sx={{ width: '100%' }}>
              {this.state.errorList[this.state.errorIndex]}
            </Alert>
          </Snackbar>
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
              </Typography>
              <img className={classes.movieImg} src={movies.logo}  align="center" width="200" height="300"/>
              {Object.keys(movies.reviews).map(review => (
              <React.Fragment>
                <Typography
                    align="center"
                  className={classes.gridMessage}
                    variant='h6'
                    noWrap={false}
                    multiline>
                      {review}
                      {" "}
                      {movies.reviews[review].rating}/5  
                </Typography>
                <Typography
                    align="center"
                  className={classes.maxWidth}
                  multiline>
                      {movies.reviews[review].body}
                </Typography>
              </React.Fragment>
              ))}
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

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
