import React, {Component} from 'react';
import * as styles from './css';
import DatePicker from 'react-datepicker';
import TextField from '../../components/TextField';
import Label from '../../components/Label';
import actions from '../../redux/actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';

class DashBoard extends Component {
  constructor (props) {
    super (props);
    this.state = {
      startDate: null,
      endDate: null,
    };
  }

  componentWillUnmount () {
    this.props.clearFormData ();
  }

  handleStartChange = date => this.setState ({startDate: date});
  handleEndChange = date => this.setState ({endDate: date});

  render () {
    const {setFormData} = this.props;
    const {container, filters, filterBox, datePickerClass} = styles;
    const {startDate, endDate} = this.state;
    return (
      <div className={container}>
        <div className={filters}>
          <label htmlFor="">Dates:</label>
          <div className={filterBox}>
            <div htmlFor="">
              From:
            </div>
            <DatePicker
              placeholderText="YYYY-MM-DD"
              className={datePickerClass}
              selected={this.state.startDate}
              onChange={this.handleStartChange}
            />
            <div htmlFor="">
              To:
            </div>
            <DatePicker
              placeholderText="YYYY-MM-DD"
              className={datePickerClass}
              selected={this.state.endDate}
              onChange={this.handleEndChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators (
    {
      clearFormData: actions.clearFormData,
      setFormData: actions.setFormData,
      login: actions.login,
    },
    dispatch
  );
}
export default connect (null, mapDispatchToProps) (DashBoard);
