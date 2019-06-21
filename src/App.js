import React, { Component } from 'react'
import './App.css'
import PDFV from './components/pdfv'
import PDFFile from './jsforkids.pdf'

class App extends Component {
  render() {
    return (
      <PDFV file={PDFFile} />
    )
  }
}

export default App
