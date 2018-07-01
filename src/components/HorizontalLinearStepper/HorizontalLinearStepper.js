//React imports
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles, DialogContentText} from '@material-ui/core';
import {connect} from 'react-redux';
import {compose} from 'redux';


// Mat-UI Imports
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography/Typography';
import AppBar from '@material-ui/core/AppBar/AppBar';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Icon from '@material-ui/core/Icon/Icon';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider/Divider';
import {Link} from 'react-router-dom';

const styles = theme => ({
    root: {
        width: '90%',
    },
    button: {
        marginRight: theme.spacing.unit,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
});

function getSteps() {
    return [
        'How are you feeling?', 'Check understanding', 'Are you feeling supported?', 'Additional comments.'
    ]
}

function getStepContent(step) {
    switch (step) {
        case 0: 
            return 'Please tell us how you are feeling today';
        case 1: 
            return 'How well do you feel you are understanding the content taught today?'
        case 2: 
            return 'How well do you feel you were supported today?'
        case 3: 
            return 'Any additional comments you would like to leave?'

    }
}

class HorizontalLinearStepper extends React.Component {
    state = {
        activeStep: 0,
        skipped: new Set(),
    };

handleNext= () => {
    const { activeStep } = this.state;
    this.setState({
        activeStep: activeStep + 1,
    })
}

handleBack = () => {
    const {activeStep} = this.state;
    this.setState({
        activeStep: activeStep - 1,
    })
}

handleReset = () => {
    this.setState({
        activeStep: 0,
    })
}

render() {
    const {classes} = this.props;
    const steps = getSteps();
    const {activeStep} = this.state;

    return (
      <div className={classes.root}>
      <Stepper activeStep={activeStep}>
      {steps.map((label, index) => {
          const props = {};
          const labelProps = {};
          return (
              <Step key={label} {...props}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>              
          );
      })}
      </Stepper>
      <div>
            {activeStep === steps.length ? (
                <div>
                    <Typography className={classes.instructions}>
                All steps completed - you&quot;re finished
              </Typography>
              <Button onClick={this.handleReset} className={classes.button}>
                Reset
              </Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                {this.isStepOptional(activeStep) && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleSkip}
                    className={classes.button}
                  >
                    Skip
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

  export default withStyles(styles)(HorizontalLinearStepper);
