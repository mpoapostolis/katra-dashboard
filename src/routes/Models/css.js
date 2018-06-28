import { css } from 'emotion';

export const container = css`
  display: flex;
  justify-content: space-around;
`;

export const left = css`
  padding: 20px;
  width: calc(49% - 20px);
  height: 100vh;
`;

export const right = css`
  width: 49%;
  height: 100%;
  display: flex;
  img {
    max-width: 35vw;
  }
`;

export const inputCont = css`
  display: flex;
  margin: 10px;
  font-size:small;
`;

export const input = css`cursor: pointer;`;

export const fieldset = css`
  margin: 20px;
  border: solid 1px #0000002f;
`;

export const btnCont = css`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
