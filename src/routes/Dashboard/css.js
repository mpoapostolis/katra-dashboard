import { css } from 'emotion';

export const container = css`
  width: 100%;
  display: flex;
  margin-top: 40px;
  justify-content: center;
`;

export const fieldset = css`
  display: grid;
  width: 100%;
  padding: 20px;
  grid-gap: 30px;
  grid-template-columns: 150px repeat(2, 1fr) 10px;
  grid-template-rows: 50px repeat(2, 1fr) 50px repeat(2fr);
  transition: box-shadow 0.25s;
  grid-template-areas: 'modelNameClass . . .' 'label0 filters filters .'
    'label1 textField1 textField2 .' 'label2 chipCont chipCont chipCont'
    'label2 textField3 textField3 .' '. .  submit . ';
  box-shadow: 2px 2px 5px 2px #0000002F;
  &:hover {
    box-shadow: 2px 2px 5px 2px #0000003F;
  }
`;

export const modelNameClass = css`
  grid-area: modelNameClass;
  display: flex;
`;

export const label0 = css`
  grid-area: label0;
  margin-bottom: 30px;
`;

export const alert = css`
color:#0000004f;
`

export const textField1 = css`grid-area: textField1;`;

export const filters = css`
  grid-area: filters;
  display: flex;
  flex-wrap: wrap;
`;

export const textField2 = css`grid-area: textField2;`;

export const textField3 = css`grid-area: textField3;`;

export const label1 = css`grid-area: label1;`;

export const label2 = css`
grid-area: label2;
`;

export const chipCont = css`
  display: flex;
  grid-area: chipCont;
  flex-wrap: wrap;
`;

export const submit = css`
  grid-area: submit;
  display: flex;
  justify-content: flex-end;
`;

export const chip = css`
  margin: 5px;
`;

export const input = css`
  border: none;
  margin-left: 20px;
`;

export const option = css`
  margin-left: 20px;
  border:none;
  padding:2px;
  background:#0000001f;
`

export const dateCont = css`
  display: flex;
  align-items: center;
  margin-right: 30px;
`;

export const hide = css`
  
  cursor:pointer;
  margin-top:20px;
  max-height:50px;
  max-width:50px;
`
