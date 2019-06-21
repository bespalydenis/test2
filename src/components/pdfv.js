import React, { Component } from 'react'
import { Document, Page } from 'react-pdf/dist/entry.webpack'
import { PDFtoIMG } from 'react-pdf-to-image'

class PDFV extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages })
  }

  onClickHandle = (e) => {
    let result = this.state.pageNumber
    if(e.target.className === 'decrement') {
      if(this.state.pageNumber > 1) {
          result = this.state.pageNumber - 1
      }
    } else if(e.target.className === 'incement') {
      if(this.state.pageNumber < this.state.numPages) {
        result = this.state.pageNumber + 1
      }
    }
    this.setState({ pageNumber: result });
  }

  setCurrentPage = (e) => {
    const setCurrentPage = +e.target.dataset.pageindex + 1
    this.setState({ pageNumber: setCurrentPage });
  }

  render() {
    const { pageNumber, numPages } = this.state

    return (
      <div id="pdfviewer">
        <div id="pageContent">
          <p>Страница {pageNumber} из {numPages}</p>
          <a href="javascript:void(0);" className="decrement" onClick={this.onClickHandle}>Назад</a>
          <a href="javascript:void(0);" className="incement" onClick={this.onClickHandle}>Далее</a>
          <div className="previewContainer">
            <PDFtoIMG file={this.props.file}>
              {({pages}) => {
                if(!pages.length) return 'Loading pages...'
                return pages.map((page, index) =>
                  <img onClick={this.setCurrentPage} key={index} data-pageindex={index} src={page} />
                )
              }}
            </PDFtoIMG>
          </div>
        </div>
          <Document
            file={this.props.file}
            onLoadSuccess={this.onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
      </div>
    )
  }
}

export default PDFV
