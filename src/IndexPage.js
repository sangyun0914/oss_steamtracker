import React, { useState, useEffect } from 'react'
import './App.css'
import './sort_search/sort_search.js'
import { load_list, search_title } from './sort_search/sort_search.js'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Header from './components/Header'

const SortContainer = styled.div`
  position: absolute;
  top: 100px;
  left: 100px;

  width: 100px;
  height: 50px;

  overflow: hidden;

  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  z-index: 100000;

  transition: 0.3s ease-out;
`

const SortTitle = styled.div`
  width: 100px;
  height: 50px;
  background: gray;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const SortItems = styled.div`
  width: 100px;
  height: 50px;
  background: gray;

  color: white;

  top: 10px
  //display: none;
  font-size: 14px;
  cursor: pointer;

  transition: 0.3s ease-out;
`

const IntroductionContent = styled.div`
  width: 100vw;
  height: 400px;
`

const CheckBox = styled.div`
  width: 30px;
  height: 30px;

  border: 1px solid red;
`

const IndexPage = (props) => {
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
  // const [isChecked, setIsChecked] = useState([])

  // const checkboxHandler = () => {
  //   if(isChecked[])
  // }
  const wishlist = []

  const checkboxHand = (e, idx) => {
    let isDup = 0
    for (let i = 0; i < wishlist.length; i++) {
      if (wishlist[i].title === displayList[idx].title) {
        isDup = 1
        wishlist.splice(i, 1)
        break
      }
    }
    if (!isDup) wishlist.push(displayList[idx])
    console.log(wishlist)

    window.localStorage.clear()
    const wishlistString = JSON.stringify(wishlist)
    window.localStorage.setItem('wishlist', wishlistString)
  }

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
      <Header />
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
            <input
              type="checkbox"
              onChange={(e) => {
                checkboxHand(e, index)
              }}
            />
            <ul class="dataimg">
              <a class="imgCell" href={item.link}>
                <img class="forImg" src={item.imgSmall} />
              </a>
            </ul>
            <ul class="dataTitle">
              <a href={item.link}>{item.title}</a>
            </ul>
            <ul class="nomalPrice">
              {item.price === 0 ? 'Free game.' : item.price}
            </ul>
            <ul class="discountRate">
              {item['discount rate'] === null
                ? 'No discount.'
                : item['discount rate']}{' '}
            </ul>
            <ul class="discountedPrice">
              {item.discounted === 0 ? 'Free game.' : item.discounted}
            </ul>
            <li class="Ratings">{item.rating}</li>
          </li>
        )
      })}
    </div>
  )
}

export default IndexPage
