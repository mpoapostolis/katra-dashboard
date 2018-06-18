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
`;

export const filterBox = css`
  width:150px;
  color: #999999;
  display:flex;
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
  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.15);
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
