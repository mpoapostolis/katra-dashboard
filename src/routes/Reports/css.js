import { css } from "emotion";

export const container = css`
    margin-top: 50px;
    width:calc(100% - 40px);
    max-height:50%;
    display:flex;
    justify-content:space-around;
`

export const table = css`
    width:49%;
`

export const row = css`
    display:flex;
    justify-content:space-between;
    &:first-child{
        font-weight:600;
    }
`

export const img = css`
    cursor:pointer;
    transition:all 0.55s;
`

export const pdf = css`
    width:100%;
    height:80vh;
`
export const column = css`
    border: solid 1px #0000003f;
    padding:10px;
    width:100%;
    display:flex;
    justify-content:flex-start;
    flex-wrap:wrap;
    &:nth-child(1){
        width:200px;
    }
`


export const images = css`
    border: solid 1px #0000002F;
    width: 49%;
    img{
        max-height: 375px;
    }
`
