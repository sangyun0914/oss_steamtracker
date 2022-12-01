import React, { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import './sort_search/sort_search.js'
import popularSteam from './web-scraping/popularNew.json'
import steamData from './web-scraping/scraped.json'
import { load_list, search_title } from './sort_search/sort_search.js'
import styled from 'styled-components'

const Header = styled.header`
  width: 100vw;
  height: 100px;

  padding: 0px 30px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

const SortContainer = styled.div`
  position: absolute;
  top: 100px;
  left: 100px;

  width: 100px;
  height: 50px;

  overflow: hidden;

  display: flex;
  flex-wrap: nowrap;

  z-index: 100000;

  transition: 0.3s ease-out;
`

const SortTitle = styled.div`
  width: 100px;
  height: 50px;
  background: gray;

  cursor: pointer;
`

const SortItems = styled.div`
  width: 100px;
  height: 50px;
  background: gray;

  color: white;

  //display: none;

  cursor: pointer;

  transition: 0.3s ease-out;
`

const IntroductionContent = styled.div`
  width: 100vw;
  height: 400px;
`

function App() {
  const [displayList, setDIsplayList] = useState([])
  //const [beforeSearchList, setBeforeSearchList] = useState([])

  const [nowList, setNowList] = useState(0)
  const clickHandler = (i) => {
    setNowList(i)
  }

  const makeListOnOrder = () => {
    const tempList = load_list(nowList)
    setDIsplayList(tempList)
  }
  //함수 선언
  useEffect(() => {
    makeListOnOrder()
  }, [nowList])

  const [activeIndex, setActiveIndex] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(0)

  const menuClickHandler = () => {
    if (isMenuOpen) setIsMenuOpen(0)
    else setIsMenuOpen(1)
  }

  const search = (e) => {
    const tempList = search_title(load_list(nowList), e.target.value)
    setDIsplayList(tempList)
  }
  //실제 웹
  return (
    <div className="App">
      <Header>
        <h1>STEAMTRACKER for SKKU</h1>
      </Header>
      <SortContainer
        style={{
          width: isMenuOpen ? 700 : 100,
        }}
      >
        <SortTitle
          onClick={() => {
            menuClickHandler()
          }}
        >
          Sorting Option
        </SortTitle>
        <SortItems
          onClick={() => {
            clickHandler(1)
            setIsMenuOpen(0)
          }}
          style={{ width: isMenuOpen ? '100px' : '0' }}
        >
          Lowest Price
        </SortItems>
        <SortItems
          onClick={() => {
            clickHandler(2)
            setIsMenuOpen(0)
          }}
          style={{ width: isMenuOpen ? '100px' : '0' }}
        >
          Highest Price
        </SortItems>
        <SortItems
          onClick={() => {
            clickHandler(3)
            setIsMenuOpen(0)
          }}
          style={{ width: isMenuOpen ? '100px' : '0' }}
        >
          Lowest Discount Rate
        </SortItems>
        <SortItems
          onClick={() => {
            clickHandler(4)
            setIsMenuOpen(0)
          }}
          style={{ width: isMenuOpen ? '100px' : '0' }}
        >
          Highest Discount Rate
        </SortItems>
        <SortItems
          onClick={() => {
            clickHandler(5)
            setIsMenuOpen(0)
          }}
          style={{ width: isMenuOpen ? '100px' : '0' }}
        >
          Lowest User Rate
        </SortItems>
        <SortItems
          onClick={() => {
            clickHandler(6)
            setIsMenuOpen(0)
          }}
          style={{ width: isMenuOpen ? '100px' : '0' }}
        >
          Highest User Rate
        </SortItems>
      </SortContainer>
      <IntroductionContent>
        <input onChange={search}></input>
      </IntroductionContent>
      {displayList.map((item, index) => {
        return (
          <li class="forSteamData">
            <li class="dataimg">
              <a href={item.link}>
                <img src={item.imgSmall} />
              </a>
            </li>
            <li class="dataTitle">
              <a href={item.link}>{item.title}</a>
            </li>
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
            <li class="Ratings">{item.rating}</li>
          </li>
        )
      })}
    </div>
  )
}

export default App
