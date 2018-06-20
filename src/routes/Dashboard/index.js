import React, {Component} from 'react';
import * as styles from './css';
import DatePicker from 'react-datepicker';
import TextField from '../../components/TextField';
import Label from '../../components/Label';
import actions from '../../redux/actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import models from '../../utils/models';
import concat from 'ramda/src/concat';
import pluck from 'ramda/src/pluck';
import uniq from 'ramda/src/uniq';
import values from 'ramda/src/values';
import 'react-datepicker/dist/react-datepicker.css';

const predefinedData = uniq (concat (...values (pluck ('data', models))));

class DashBoard extends Component {
  constructor (props) {
    super (props);
    this.state = {
      startDate: null,
      endDate: null,
    };
  }

  handleStartChange = date => this.setState ({startDate: date});
  handleEndChange = date => this.setState ({endDate: date});
  setFormData = obj => this.setState (obj);

  render () {
    const {
      container,
      filterCont,
      datePickerClass,
      dateCont,
      modelCont,
      input,
    } = styles;
    const {data} = this.state;
    const listDependsOnFirstSelect = Object.keys (models).filter (key =>
      models[key].data.includes (data)
    );

    return (
      <div className={container}>
        <div className={dateCont}>
          <Label>Dates: </Label>
          <div className={filterCont}>
            <label htmlFor="">
              From:
            </label>
            <DatePicker
              placeholderText="YYYY-MM-DD"
              className={datePickerClass}
              selected={this.state.startDate}
              onChange={this.handleStartChange}
            />
          </div>

          <div className={filterCont}>
            <label htmlFor="">
              To:
            </label>

            <DatePicker
              placeholderText="YYYY-MM-DD"
              className={datePickerClass}
              selected={this.state.endDate}
              onChange={this.handleEndChange}
            />
          </div>
        </div>
        <div>
          <label>Model: </label>

          <div className={modelCont}>
            <Label>Keywords: </Label>
            <div className={input}>
              <TextField
                type={'select'}
                setFormData={this.setFormData}
                field={'data'}
                label={'data'}
                list={predefinedData}
              />
            </div>
            <div className={input}>
              <TextField
                disabled={!this.state.data}
                type={'select'}
                setFormData={this.setFormData}
                field={'factor'}
                label={'factor'}
                list={predefinedData}
              />
            </div>
          </div>

        </div>
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators ({}, dispatch);
}
export default connect (null, mapDispatchToProps) (DashBoard);
