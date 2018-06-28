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
import Button from '@material-ui/core/Button';

export default class Models extends Component {
  state = {
    models: [],
  };
  componentDidMount() {
    fetch('/api/models/dummy.json')
      .then((e) => e.json())
      .then((models) => this.setState({ models }));
  }

  handleChange = (ev) => console.log(ev.currentTarget.id);

  render() {
    const { models } = this.state;
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
                  onChange={this.handleChange}
                  className={input}
                  type="checkbox"
                  id={model.name}
                />
                <label htmlFor={model.name}>{model.name}</label>
              </div>
            ))}
          </fieldset>

          <fieldset className={fieldset}>
            <legend>2. Choose method of Comparison:</legend>
            {methods.map((method, key) => (
              <div key={key} className={inputCont}>
                <input
                  onChange={this.handleChange}
                  className={input}
                  type="checkbox"
                  id={method}
                />
                <label htmlFor={method}>{method}</label>
              </div>
            ))}
          </fieldset>
          <div className={btnCont}>
            <Button variant="contained" component="span">
              START COMPARISON
            </Button>
          </div>
        </div>
        <div className={right}>
          <fieldset className={fieldset}>
            <legend>1. Choose models:</legend>
            <img src="/api/models/PHPDM4_s1.png" alt="" />
          </fieldset>
        </div>
      </div>
    );
  }
}
