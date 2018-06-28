import React, { Component } from 'react';
import {
  container,
  left,
  right,
  inputCont,
  input,
  fieldset,
  btnCont,
} from './css';
import pluck from 'ramda/src/pluck'
import Button from '@material-ui/core/Button';

export default class Models extends Component {
  state = {
    images: [],
    models: [],
    results: [false, false, false, false, false, false, false, false, false]
  };
  componentDidMount() {
    fetch('/api/models/dummy.json')
      .then((e) => e.json())
      .then((models) => this.setState({ models }));
  }

  handleChange = (index, cheched) => {
    const tmp = this.state.results
    tmp[index] = cheched
    this.setState({ results: tmp })
  };

  handleSubmit = () => {
    const { models, results } = this.state
    const filterdArr = models.filter((e, index) => results[index])
    const aicValues = pluck('AIC', filterdArr)
    const maximum = Math.max(...aicValues)
    const index = aicValues.indexOf(maximum)

    this.setState({
      index,
      images: models.filter((e, index) => results[index])
    })
  }

  render() {
    const { models, images, index } = this.state;
    const methods = [
      'Linear Mixed Models',
      'Linear Models',
      'Log Linear Reggression',
      'Cluster Factoring',
    ];

    return (
      <div className={container}>
        <div className={left}>
          <fieldset className={fieldset}>
            <legend>1. Choose models:</legend>
            {models.map((model, key) => (
              <div key={key} className={inputCont}>
                <input
                  onChange={e => this.handleChange(key, e.target.checked)}
                  className={input}
                  type="checkbox"
                  id={model.name}
                />
                <label htmlFor={model.name}> {model.name}
                  <span style={{ fontSize: 'small', margin: '10px' }}>
                    {model.details}
                  </span>

                </label>
              </div>
            ))}
          </fieldset>

          <fieldset className={fieldset}>
            <legend>2. Choose method of Comparison:</legend>
            {methods.map((method, key) => (
              <div key={key} className={inputCont}>
                <input
                  onChange={e => this.setState({ method })}
                  className={input}
                  type="checkbox"
                  id={method}
                />
                <label htmlFor={method}>{method}</label>
              </div>
            ))}
          </fieldset>
          <div className={btnCont}>
            <Button onClick={this.handleSubmit} variant="contained" component="span">
              START COMPARISON
            </Button>
          </div>
        </div>
        <div className={right}>
          {images.length ? <fieldset className={fieldset}>
            <legend>Results:</legend>
            {images.map((obj, key) =>
              <img key={key} style={{ border: key === index ? 'solid 5px green' : '' }} src="/api/models/PHPDM4_s1.png" alt="" />
            )}
          </fieldset> : <div />}
        </div>
      </div>
    );
  }
}
