import React, { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import './sort_search/sort_search.js'
import steamData from './web-scraping/scraped.json'
import { load_list } from './sort_search/sort_search.js'
function App() {
  const [displayList, setDIsplayList] = useState([])
  const [nowList, setNowList] = useState(0)
  const clickHandler = (i) => {
    setNowList(i)
  }

  let newSteamData = steamData.map((item, index) => {
    return (
      <li class="forSteamData">
        <li class="dataTitle">{item.title}</li>
        <li class="nomalPrice">
          {item.price === 0 ? 'Free game.' : item.price}
        </li>
        <li class="discountRate">
          {item['discount rate'] === null
            ? 'No discount.'
            : item['discount rate']}{' '}
        </li>
        <li class="discountedPrice">
          {item.discounted === 0 ? 'Free game.' : item.discounted}
        </li>
      </li>
    )
  })

  useEffect(() => {
    const tempList = load_list(nowList)
    setDIsplayList(tempList)

    newSteamData = displayList.map((item, index) => {
      return (
        <li class="forSteamData">
          <li class="dataTitle">{item.title}</li>
          <li class="nomalPrice">
            {item.price === 0 ? 'Free game.' : item.price}
          </li>
          <li class="discountRate">
            {item['discount rate'] === null
              ? 'No discount.'
              : item['discount rate']}{' '}
          </li>
          <li class="discountedPrice">
            {item.discounted === 0 ? 'Free game.' : item.discounted}
          </li>
        </li>
      )
    })

    console.log(displayList)
  }, [nowList])

  return (
    <div className="App">
      <h1>STEAMTRACKER for SKKU</h1>
      <div
        style={{
          width: '90vw',
          display: 'flex',
          justifyContent: 'space-between',
          margin: '30px 0 30px 0',
        }}
      >
        <div
          onClick={() => {
            clickHandler(1)
          }}
        >
          싼놈
        </div>
        <div
          onClick={() => {
            clickHandler(2)
          }}
        >
          비싼놈
        </div>
        <div
          onClick={() => {
            clickHandler(3)
          }}
        >
          깎아주는놈
        </div>
        <div
          onClick={() => {
            clickHandler(4)
          }}
        >
          안깎는놈
        </div>
      </div>
      {displayList.map((item, index) => {
        return (
          <li class="forSteamData">
            <li class="dataTitle">{item.title}</li>
            <li class="nomalPrice">
              {item.price === 0 ? 'Free game.' : item.price}
            </li>
            <li class="discountRate">
              {item['discount rate'] === null
                ? 'No discount.'
                : item['discount rate']}{' '}
            </li>
            <li class="discountedPrice">
              {item.discounted === 0 ? 'Free game.' : item.discounted}
            </li>
          </li>
        )
      })}
    </div>
  )
}

export default App
