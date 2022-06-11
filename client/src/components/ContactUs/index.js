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
      default: "#000000"
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
      backgroundColor: "#000000",
      opacity: opacityValue,
      overflow: "hidden",
    },
  },

  mainMessage: {
    opacity: opacityValue,
    justify: 'center',
    alignItems: 'center',
    color: '#42a5f5'
  },

  inputFeilds: {
    borderRadius: 5,
    maxWidth: '40%',
    border: 1
  },

  input:{
    margin:10,
  },

  mainMessageContainer: {
    marginTop: "10vh",
    maxWidth: '100%'
  },

  paper: {
    overflow: "hidden",
    color: "white",
    margin: "10"
  },

  message: {
    opacity: opacityValue,
    maxWidth: "50%",
    paddingBottom: theme.spacing(2),
  },

});


class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      mode: 0
    }
  };

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



    const mainMessage = (
      <Container
        justify="center"
        alignItems="center"
        style={{ minHeight: '10vh' }}
        className={classes.mainMessageContainer}
        maxWidth='sm'
      >
        <Container item>

          <Typography
            className={classes.mainMessage}
            align="center"
          >
            App by: Calumski
          </Typography>
        </Container>
        {/* <Grid item>

        <Typography
            variant={"h3"}
            className={classes.mainMessage}
            align="flex-start"
            >
            {this.state.mode === 0 ? (
              <React.Fragment>
                Welcome to Calum's IMDB App
              </React.Fragment>
            ) : (
              <React.Fragment>
                Welcome back!
              </React.Fragment>
            )}
        </Typography>

        </Grid> */}
      </Container>
    )

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <Paper
            className={classes.paper}
          >
            {mainMessage}
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

ContactUs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ContactUs);