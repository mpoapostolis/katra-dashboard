import React, { Component } from 'react'
import { container, images, table, row, column, img } from './css';
const a = []
class Reports extends Component {

    state = {
        data: [],
        imagesPaths: []
    }

    componentDidMount() {
        const url = window.location.search.replace(/\?|&/g, '/')
        if (url)
            fetch(`/api/reports${url}`).then(e => e.json()).then(res => this.setState({ ...res }))
    }

    render() {
        const { data, imagesPaths } = this.state
        return <main>
            <div className={container}>
                <div className={table}>
                    <div className={row}>
                        <div className={column}>PMID</div>
                        <div className={column}>Title</div>
                        <article className={column}>Abstract</article>
                    </div>
                    {data.map((obj, key) =>
                        <div key={key} className={row}>
                            <div className={column}>{obj.PMID}</div>
                            <div className={column}>{obj.Title}</div>
                            <article className={column}>{obj.abstract}</article>
                        </div>
                    )}
                </div>
                <div className={images}>
                    {imagesPaths.map((url, key) =>
                        <img alt=":)" key={key} className={img} onClick={() => window.open(url)} title={"open in new tab"} src={url} />
                    )}
                </div>
            </div>
        </main>
    }
}

export default Reports