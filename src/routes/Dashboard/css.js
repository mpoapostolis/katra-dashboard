import {css} from 'emotion';

export const container = css`
  width: 100%;
`;

export const header = css`
  display: flex;
  font-size:large;
  font-weight:600;
  align-items: center;
  padding:5px;
  justify-content:space-between;
  align-content: center;
`;

export const filters = css`
  label{
    font-weight:600;
    color: #777777;
    font-size:large;
    margin-right:30px;
  }
  padding:30px 0;
  display:flex;
`;

export const datePickerClass = css`

  &:active {
    outline: none;
  }

  &:focus {
    outline: none;
  }
  color: rgba(0, 0, 0, 0.75);
  font-weight: bolder;
  border: none;
  margin-left: 5px;
  width: 100px;
  background: transparent;
`;

export const dateCont = css`
  display: flex;
  color: #999999;
  width:500px;
  align-content: center;
  margin: 20px 0 50px 0;
`;

export const filterCont = css`
  display:flex;
  margin-left:40px;
`;

export const inputCont = css`
  display: flex;
  color: #999999;
  align-content: center;
  justify-content:space-around;
`;

export const input = css`
  width:45%;
`;

export const modelCont = css`
  margin:10px 0 10px 0;
  display:flex;
  justify-content:space-between;
`;
