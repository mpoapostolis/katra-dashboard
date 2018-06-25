import React, { Component } from 'react';
import * as styles from './css';
import DatePicker from 'react-datepicker';
import TextField from '../../components/TextField';
import Label from '../../components/Label';
import actions from '../../redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import models from '../../utils/models';
import concat from 'ramda/src/concat';
import pluck from 'ramda/src/pluck';
import uniq from 'ramda/src/uniq';
import flatten from 'ramda/src/flatten';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import 'react-datepicker/dist/react-datepicker.css';

const fact_1_data = uniq(flatten(pluck('data', models)));
class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      stopWords: [],
      stopWordValue: '',
      fStartDate: '',
      fEndDate: ''
    };
  }

  handleStartChange = (date) => this.setState({ startDate: date, fStartDate: date.format("YYYY") });
  handleEndChange = (date) => this.setState({ endDate: date, fEndDate: date.format("YYYY") });
  setFormData = (obj) => this.setState(obj);
  handleDelete = (label) => {
    const tmpList = this.state.stopWords;
    const index = tmpList.indexOf(label);
    tmpList.splice(index, 1);
    this.setState({ stopWords: tmpList });
  };
  handleEnter = (evt) => {
    const { stopWords } = this.state;
    const { value } = evt.currentTarget;
    if (value)
      this.setState({ stopWords: [...stopWords, evt.currentTarget.value.toUpperCase()] });
  };

  startTextMining = () => {

  }

  render() {
    const {
      container,
      fieldset,
      filters,
      label0,
      label1,
      label2,
      textField1,
      textField2,
      textField3,
      chip,
      chipCont,
      input,
      submit,
      dateCont,
      modelNameClass,
    } = styles;
    const {
      fact_1,
      fact_2,
      stopWords,
      startDate,
      endDate,
      fStartDate,
      fEndDate,
      stopWordValue,
    } = this.state;
    const modelHasData = (arr) => arr.includes(fact_1);

    const filteredModels = models.filter((obj) => modelHasData(obj.data));
    const fact_2_data = uniq(flatten(pluck('factors', filteredModels)));

    const [model] = models.filter(
      (obj) => obj.data.includes(fact_1) && obj.factors.includes(fact_2)
    );
    let stopWordsString = ''
    stopWords.forEach(element => {
      stopWordsString += `+${element}`
    });
    const modelName = model ? model.modelName : ' ';
    const url = `/reports?${modelName}&${stopWordsString.slice(1)}_${fStartDate}-${fEndDate}`
    return (
      <div className={container}>
        <div className={fieldset}>
          <div className={modelNameClass}>Model: {modelName}</div>
          <div className={label0}>Dates:</div>
          <div className={label1}>Select Keywords:</div>
          <div className={label2}>Stop words:</div>
          <div className={filters}>
            <div className={dateCont}>
              From:
              <DatePicker
                yearDropdownItemNumber={15}
                scrollableYearDropdown
                showYearDropdown
                placeholderText="YYYY-MM-DD"
                selected={startDate}
                className={input}
                onChange={this.handleStartChange}
              />
            </div>

            <div className={dateCont}>
              To:
              <DatePicker
                yearDropdownItemNumber={15}
                scrollableYearDropdown
                showYearDropdown
                placeholderText="YYYY-MM-DD"
                selected={endDate}
                className={input}
                onChange={this.handleEndChange}
              />
            </div>
          </div>
          <div className={textField1}>
            <TextField
              type={'select'}
              setFormData={this.setFormData}
              field={'fact_1'}
              label={'Data'}
              list={fact_1_data}
            />
          </div>
          <div className={textField2}>
            <TextField
              type={'select'}
              setFormData={this.setFormData}
              field={'fact_2'}
              label={'Factors'}
              list={fact_2_data}
            />
          </div>

          <div className={chipCont}>
            {stopWords.map((label, key) => (
              <div key={key} className={chip}>
                <Chip onDelete={() => this.handleDelete(label)} label={label} />
              </div>
            ))}
          </div>

          <div className={textField3}>
            <TextField
              pressEnter={this.handleEnter}
              value={stopWordValue}
              setFormData={() => void 0}
              field={'stopWords'}
              label={'stop words'}
            />
          </div>

          <div className={submit}>
            <Button variant="contained" onClick={() => this.props.history.push(url)} component="span">
              START TEXT MINING
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}
export default connect(null, mapDispatchToProps)(DashBoard);
