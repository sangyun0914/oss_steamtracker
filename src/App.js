import React from 'react'
import './App.css'
import './sort_search/sort_search.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IndexPage from './IndexPage'
import UserPage from './UserPage'

const App = () => {
  //실제 웹
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/wish" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
