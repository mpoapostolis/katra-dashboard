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
import { fstat } from 'fs';

const fact_1_data = uniq(flatten(pluck('data', models)));
class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      stopWords: [
        "use", "see", "used", "via", "amp", "we",
        "us", "you", "will", "check", "can", "p", "vs", "hearing", "aid", "abstract", "objective", "conclusion",
        "result", "results", "abstracttext"
      ],
      stopWordValue: '',
      fStartDate: 2000,
      fEndDate: 2018
    };
  }

  handleStartChange = ({ currentTarget }) => this.setState({ fStartDate: currentTarget.value });
  handleEndChange = ({ currentTarget }) => this.setState({ fEndDate: currentTarget.value });
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
      this.setState({ stopWords: [...stopWords, evt.currentTarget.value] });
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
      submit,
      dateCont,
      modelNameClass,
    } = styles;
    const {
      fact_1 = "",
      fact_2 = "",
      stopWords,
      fStartDate,
      fEndDate,
      stopWordValue,
    } = this.state;
    const modelHasData = (arr) => arr.includes(fact_1);
    const range = [...Array(101).keys()].map(e => 2018 - e)

    const filteredModels = models.filter((obj) => modelHasData(obj.data));
    const fact_2_data = uniq(flatten(pluck('factors', filteredModels)));

    const [model] = models.filter(
      (obj) => obj.data.includes(fact_1) && obj.factors.includes(fact_2)
    );
    const searchWords = `${fact_1.replace(/ /g, '_')}+${fact_2.replace(/ /g, '_')}`
    let stopWordsString = ''
    stopWords.forEach(element => {
      stopWordsString += `,${element}`
    });
    const modelName = model ? model.modelName : ' ';
    const url = `/reports?model=${modelName}&search_word=${searchWords}&stopwords=${stopWordsString.slice(1)}&startDate=${fStartDate}&endDate=${fEndDate}`
    return (
      <div className={container}>
        <div className={fieldset}>
          <div className={modelNameClass}>Model: {modelName}</div>
          <div className={label0}>Dates:</div>
          <div className={label1}>Select Keywords:</div>
          <div className={label2}>Stop words:
          </div>
          <div className={filters}>
            <div className={dateCont}>
              From:
              <select value={fStartDate} onChange={this.handleStartChange} className={styles.option} >
                {range.map((num, key) => <option key={key}>{num}</option>)}
              </select>
            </div>

            <div className={dateCont}>
              To:
              <select value={fEndDate} onChange={this.handleEndChange} className={styles.option} >
                {range.map((num, key) => <option key={key}>{num}</option>)}
              </select>
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
            <p className={styles.alert}>Please write any additional stopwords you might want to include in the current stopword list*</p>
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
