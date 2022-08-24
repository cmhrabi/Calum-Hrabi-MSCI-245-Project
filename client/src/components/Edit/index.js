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
const serverURL ="";

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
    margin: "10",
    minHeight: "60vh"
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
    minWidth: "50vh",
    margin: 5
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

  button: {
    margin: 15
  }

});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

class ReviewTitle extends Component {
  constructor(props){
    super(props);
    this.state ={
        selectReview: "",
        // reviewTitleList: this.props.selectedMovie.reviewTitle.split(','),
        // reviewIDList: this.props.selectedMovie.reviewID.split(','),
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({selectReview: event.target.value})
    this.props.handleParent(event.target.value)
    console.log(event.target.value)
  }

  render() {
    const { classes } = this.props;

    return (
<div>
        
  <Select
    className={classes.selectInput}
    value={this.state.selectReview}
    label="Reviews"
    onChange={this.handleChange}
    error={this.props.error}
  >
    <MenuItem value={-1}>None</MenuItem>
    {this.props.selectedMovie.reviewTitle.split(',').map((review, index) => (
      <MenuItem value={this.props.selectedMovie.reviewID.split(',')[index]}>{review}</MenuItem>
    ))}
    </Select>
    <InputLabel>Reviews</InputLabel>
    </div>    );
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
          defaultValue={this.props.default}
          helperText="Must be less than 200 Characters." 
          onChange={this.handleChange}
          error={this.props.error}
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
      <FormLabel id="demo-customized-radios" className={classes.ratingError}>{this.props.error}</FormLabel>
        <RadioGroup
        row
        name="position"
        onChange={this.handleChange}
        className={classes.input}
        color={this.props.error}
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
      <FormLabel/>
    </MuiThemeProvider>    
      );
  }
}

class MovieSelection extends Component{
  constructor(props){
    super(props);
    this.state ={
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
    error={this.props.error}
  >
    <MenuItem value={-1}>None</MenuItem>
    {this.props.movies.map((movie, index) => (
      <MenuItem value={movie}>{movie.name}</MenuItem>
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
              <React.Fragment>
                Edit/Delete Movie Review!
              </React.Fragment>
          </Typography>
        </Container>
      </Container>
      </MuiThemeProvider>
    );
  }
}

class Edit extends Component{
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      mode: 0,
      movies: [],

      sbOpen: false,
      sbDeleteOpen: false,
      sbEROpen: false,
      selectedMovie: {reviewID: "", reviewTitle: ""},
      enteredTitle: "",
      enteredReview: "",
      defaultReview: null,
      selectedRating: -1,
        erMT: false,
        erRT: false,
        erRC: false,
        erRR: "",

      ratingList: [1, 2, 3, 4, 5]
    }

    this.selectMovie = this.selectMovie.bind(this)
    this.enterReview= this.enterReview.bind(this)
    this.enterTitle = this.enterTitle.bind(this)
    this.selectRating = this.selectRating.bind(this)
    this.submitEdit = this.submitEdit.bind(this)
    this.sbHandleClose = this.sbHandleClose.bind(this)
  };

  selectMovie(value) {
    this.setState({selectedMovie: value, defaultReview: null})
    console.log(value)
  }

  setDefaultReview = (review) => {
    this.setState({defaultReview: review[0].reviewContent});
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

  submitEdit() {    
    if(this.state.enteredTitle.length >= 1){
        this.loadReviewContent()
    }else{
        this.setState({sbEROpen: true});
    }
  }

  submitNewReview = () => {
    let er = 0;

    if(this.state.selectedRating == -1){
        this.setState({erRR: "Please select a rating"})
        er = 1
    }
    if(this.state.enteredReview === ""){
        this.setState({erRC: true})
        er = 1
    }

    if(er == 0)
    {
        this.callApiEditReview()
        this.setState({sbOpen: true});
        this.setState({erRC: false})
        this.setState({erRR: ""})
        this.setDefaultReview([{reviewContent: ""}])
    }
  }

  submitDelete = () => {
    console.log(this.state.enteredTitle.length)
    if(this.state.enteredTitle.length >= 1){
        this.callApiDeleteReview()
        this.setState({sbDeleteOpen: true});
    }else{
        this.setState({sbEROpen: true});
    }
  }

  setMovies = (moviesList) => {
    this.setState({movies: moviesList});
  }

  sbHandleClose(event, reason) {
    this.setState({sbOpen: false});
    this.setState({selectedRating: -1})
  };

  sbDeleteHandleClose = (event, reason) => {
    this.setState({sbDeleteOpen: false});
  };

  sbERHandleClose = (event, reason) => {
    this.setState({sbEROpen: false});
  };
  
  setMovies = (moviesList) => {
    this.setState({movies: moviesList});
  }

  callApiGetReviews = async () => {
    const url = serverURL + "/api/getReviews";
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
      this.callApiGetReviews().then((res) => {
        var parsed = JSON.parse(res.express);
        console.log(parsed)
        this.setState({movies: parsed});
      })

      
    };

    callApiDeleteReview = async () => {
        const url = serverURL + "/api/deleteReview";
        console.log(url);
        const response = await fetch(url, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reviewID: this.state.enteredTitle,
        })
        });
        
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("Reviews: ", body);
        return body;
      }

    callApiGetReview = async () => {
        const url = serverURL + "/api/getReview";
        console.log(url);
        const response = await fetch(url, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reviewID: this.state.enteredTitle,
        })
        });
        
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("Reviews: ", body);
        return body;
      }
    
      loadReviewContent = () => {
        this.callApiGetReview().then((res) => {
          var parsed = JSON.parse(res.express);
          console.log(parsed)
          this.setDefaultReview(parsed);
        })
  
        
      };

      callApiEditReview = async () => {
        const url = serverURL + "/api/editReview";
        console.log(url);
        const response = await fetch(url, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reviewID: this.state.enteredTitle,
          reviewContent: this.state.enteredReview,
          reviewRating: this.state.selectedRating
        })
        });
        
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("Reviews: ", body);
        return body;
      }    


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
      maxWidth='sm'
      style={{minHeight: "70vh"}}>
        <Container item
        align="center"
        justify="center">
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}
          alignitems="center" justify="center">
              <MovieSelection movies={this.state.movies} handleParent={this.selectMovie} classes={classes} errors={this.state.erMT}/>
              </FormControl>
              <br/>
              <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}
          alignitems="center" justify="center">
              <ReviewTitle selectedMovie={this.state.selectedMovie.reviewTitle ? this.state.selectedMovie : {reviewTitle: "", reviewID: ""}} handleParent={this.enterTitle} classes={classes} error={this.state.erRT}/>
              </FormControl>
                <br/>
              <Button variant="contained" onClick={this.submitEdit} className={classes.button}>Edit Review</Button>
              <Button variant="contained" onClick={this.submitDelete} className={classes.button}>Delete Review</Button>
              {this.state.defaultReview ?
              <div>
                <br/>
                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <ReviewBody default={this.state.defaultReview} handleParent={this.enterReview} classes={classes} error={this.state.erRC}/>
                    <ReviewRating rating={this.state.ratingList} handleParent={this.selectRating} classes={classes} error={this.state.erRR}/>
                    <Button variant="contained" onClick={this.submitNewReview} className={classes.button}>Submit Edited Review</Button>
                </FormControl>
              </div> 
              : 
              <div></div>
            }
          
          <Snackbar open={this.state.sbOpen}  autoHideDuration={60}>
            <Alert severity="success" onClose={this.sbHandleClose} sx={{ width: '100%' }}>
              Review Submitted Succesfully
              <br/>
              Movie Title: {this.state.selectedMovie.name}
              <br/>
              Review ID: {this.state.enteredTitle}
              <br/>
              ReviewBody: {this.state.enteredReview}
              <br/>
              Rating: {this.state.selectedRating}
            </Alert>
          </Snackbar>
          <Snackbar open={this.state.sbDeleteOpen}  autoHideDuration={60}>
            <Alert severity="success" onClose={this.sbDeleteHandleClose} sx={{ width: '100%' }}>
              Review Deleted Succesfully
              <br/>
              Movie Title: {this.state.selectedMovie.name}
              <br/>
              Review ID: {this.state.enteredTitle}
            </Alert>
          </Snackbar>
          <Snackbar open={this.state.sbEROpen}  autoHideDuration={60}>
            <Alert severity="error" onClose={this.sbERHandleClose} sx={{ width: '100%' }}>
              Please Select a Review
            </Alert>
          </Snackbar>
        </Container>
      </Container>
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
        </Paper>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(Edit);
