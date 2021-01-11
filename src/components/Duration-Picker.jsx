import React from "react";
import PropTypes from "prop-types";

const secondsPerHour = 3600;
const secondsPerMinute = 60;

/**
 * Custom component for duration inputs.
 */
class DurationPickerComponentBase extends React.Component {

  static propTypes = {
    /**
     * Name of the select component
     */
    name: PropTypes.string.isRequired,

    /**
     * Method called when changing
     */
    handleChange: PropTypes.func.isRequired,

    /**
     * Optional css classes
     */
    cssClass: PropTypes.string,

    /**
     * Optional: Initial value in number of seconds that is set for the picker
     */
    initialValue: PropTypes.number,

    /**
     * Optional: If this prop is set true, hours are not displayed
     */
    noHours: PropTypes.bool,

    /**
     * Optional: If this prop is set true, minutes are not displayed
     */
    noMinutes: PropTypes.bool,

    /**
     * Optional: If this prop is set true, seconds are not displayed
     */
    noSeconds: PropTypes.bool,

    /**
     * Optional definition for maximum number of hours
     */
    maxHours: PropTypes.number,

    /**
     * Optional definition for maximum number of minutes
     */
    maxMinutes: PropTypes.number,

    /**
     * Optional definition for maximum number of seconds
     */
    maxSeconds: PropTypes.number,

    /**
     * Optional: If this prop is set true the data will be rendered as text
     */
    viewMode: PropTypes.bool,

    /**
     * Disable input fields
     */
    disabled: PropTypes.bool,

    /**
     * Index of the current element
     */
    index : PropTypes.number
  };

  static defaultProps = {
    cssClass: "form-control",
    initialValue: 0,
    maxHours: 1000,
    maxMinutes: 59,
    maxSeconds: 59,
    noHours: false,
    noMinutes: false,
    noSeconds: false,
    editMode: true
  };

  constructor(props) {
    super(props);

    this.state = {
      seconds: 0,
      minutes: 0,
      hours: 0
    }
  }

  componentDidMount() {
    if (this.props.initialValue !== 0) {
      this.setState({
        seconds: this.calculateInitialSeconds(),
        minutes: this.calculateInitialMinutes(),
        hours: this.calculateInitialHours()
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.initialValue !== this.props.initialValue) {
      this.setState({
        seconds: this.calculateInitialSeconds(),
        minutes: this.calculateInitialMinutes(),
        hours: this.calculateInitialHours()
      });
    }
  }

  calculateInitialHours = () => {
    if (this.props.noHours) {
      return 0;
    }//If hours are active get the number of hours from the initialValue by using modulo
    else {
      return Math.floor(this.props.initialValue / secondsPerHour);
    }
  }

  calculateInitialMinutes = () => {
    if (this.props.noMinutes) {
      return 0;
    } else if (this.props.noHours) {
      return Math.floor(this.props.initialValue / secondsPerMinute);
    } else {
      return Math.floor((this.props.initialValue % secondsPerHour) / secondsPerMinute);
    }
  }

  calculateInitialSeconds = () => {
    if (this.props.noSeconds) {
      return 0;
    }//Nothing to be subtracted -> return all seconds from initialValue
    else if (this.props.noHours && this.props.noMinutes) {
      return this.props.initialValue;
    }//Subtract all minutes first (modulo) -> return the rest
    else if (this.props.noHours) {
      return this.props.initialValue % secondsPerMinute;
    }//Subtract all hours and minutes first (modulo) -> return the rest
    else if (this.props.noMinutes) {
      return this.props.initialValue % secondsPerHour;
    }//Subtract all hours and minutes first (modulo) -> return the rest
    else {
      return (this.props.initialValue % secondsPerHour) % secondsPerMinute;
    }
  }

  updateValue(event, fieldInState) {
    this.setState({
      [fieldInState]: Number(event.target.value)
    }, () => this.parentHandleChange());
  }

  parentHandleChange() {
    //Create a custom change Event to call parent handleChange with calculatedTotalNumberOfSeconds
    let event = new Event("change");
    document.getElementById("duration-container").dispatchEvent(event);

    event.target.value = this.calculateTotalNumberOfSeconds();
    event.target.name = this.props.name;


    if(this.props.hasOwnProperty('index'))
        this.props.handleChange(event, this.props.index);
    else
        this.props.handleChange(event);

  }

  calculateTotalNumberOfSeconds() {
    let totalNumberOfSeconds = 0;

    totalNumberOfSeconds += this.state.seconds;
    totalNumberOfSeconds += this.state.minutes * secondsPerMinute;
    totalNumberOfSeconds += this.state.hours * secondsPerHour;
    return totalNumberOfSeconds;
  }

  renderHours = () => {

    if (this.props.noHours) {
      return "";
    } else {
      return (

          <div style={{width: '60px', float:'left', marginRight:'1rem'}}>
            {this.props.editMode ?
                <>
                  <input style={{width: '40px' , textAlign: 'center'}} name="hoursPicker" value={this.state.hours} id="hoursPicker"
                         type={"number"} 
                         min={0} max={this.props.maxHours} className={this.props.cssClass}
                         onChange={event => this.updateValue(event, "hours")}
                         disabled={this.props.disabled ? "disabled" : ""}
                  /> 
                  <p style={{float: "right"}}>:</p>

                  <p className={"duration-picker-parameter"}>
                    Hours
                  </p>
                </>
                : <span>{this.state.hours + " " + this.props.intl.formatMessage(
                    {id: "labels.hours"})}</span>}
          </div>
      )
    }

  }

  renderMinutes = () => {

    if (this.props.noMinutes) {
      return "";
    } else {
      return (
          <div style={{width: '60px', float:'left', marginRight:'1rem'}}>
            {this.props.editMode ?
                <>
                  <input style={{width: '40px', textAlign: 'center'}} name="minutesPicker" value={this.state.minutes} id="minutesPicker"
                         type={"number"}
                         min={0} max={this.props.maxMinutes} className={this.props.cssClass}
                         onChange={event => this.updateValue(event, "minutes")}
                         disabled={this.props.disabled ? "disabled" : ""}
                  />

                <p style={{float: "right"}}>:</p>
                <p className={"duration-picker-parameter"}>Minutes</p>
                </>
                : <span>{this.state.minutes + " " + this.props.intl.formatMessage(
                    {id: "labels.minutes"})}</span>}
          </div>

      )
    }

  }

  renderSeconds = () => {

    if (this.props.noSeconds) {
      return "";
    } else {
      return (
          <div style={{width: '60px', float:'left', marginRight:'1rem'}}>
            {this.props.editMode ?
                <>
                  <input style={{width: '40px' , textAlign: 'center'}} name="secondsPicker" value={this.state.seconds} id="secondsPicker"
                         type={"number"}
                         min={0} max={this.props.maxSeconds} className={this.props.cssClass}
                         onChange={event => this.updateValue(event, "seconds")}
                         disabled={this.props.disabled ? "disabled" : ""}
                  />

                  <p className={"duration-picker-parameter"}>
                    Seconds</p>
                </>
                : <span>{this.state.seconds + " " + this.props.intl.formatMessage(
                    {id: "labels.seconds"})}</span>}
          </div>
      )
    }

  }

  render() {
    return (
        <>
          <div name={this.props.name} id={"duration-container"}
               >
            {this.renderHours()}
            {this.renderMinutes()}
            {this.renderSeconds()}
          </div>
        </>
    )
  }
}

const DurationPickerComponent = DurationPickerComponentBase;

export default DurationPickerComponent;