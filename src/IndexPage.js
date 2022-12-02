import React, { useState, useEffect } from 'react'
import './App.css'
import './sort_search/sort_search.js'
import { load_list, search_title } from './sort_search/sort_search.js'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Header from './components/Header'

const SortContainer = styled.div`
  position: absolute;
  top: 445px;
  left: calc(50vw - 590px + 180px);

  width: 120px;
  height: 50px;

  overflow: hidden;

  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  z-index: 100000;

  transition: 0.3s ease-out;
  font-size: 0.8rem;
  color: white;
`

const SortTitle = styled.div`
  width: 120px;
  height: 50px;
  background: gray;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const SortItems = styled.div`
  width: 120px;
  height: 50px;
  background: gray;

  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  transition: 0.3s ease-out;
`
const InputBox = styled.input`
  position: absolute;
  top: 450px;
  left: calc(50vw - 590px);

  box-sizing: borderbox;
  padding: 0 5px;
  width: 150px;
  height: 30px;

  overflow: hidden;
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
// const MainContainer = (i) =>{
//   return (<>
//     {i? ()}
//   </>)
// }
const IndexPage = (props) => {
  const [displayList, setDIsplayList] = useState([])
  //const [beforeSearchList, setBeforeSearchList] = useState([])

  const [nowList, setNowList] = useState(1)
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
          width: isMenuOpen ? 840 : 120,
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
          style={{
            width: isMenuOpen ? '120px' : '0',
            visibility: isMenuOpen ? 'visible' : 'hidden',
          }}
        >
          Lowest Price
        </SortItems>
        <SortItems
          onClick={() => {
            clickHandler(2)
            setIsMenuOpen(0)
          }}
          style={{
            width: isMenuOpen ? '120px' : '0',
            visibility: isMenuOpen ? 'visible' : 'hidden',
          }}
        >
          Highest Price
        </SortItems>
        <SortItems
          onClick={() => {
            clickHandler(3)
            setIsMenuOpen(0)
          }}
          style={{
            width: isMenuOpen ? '120px' : '0',
            visibility: isMenuOpen ? 'visible' : 'hidden',
          }}
        >
          Lowest Discount Rate
        </SortItems>
        <SortItems
          onClick={() => {
            clickHandler(4)
            setIsMenuOpen(0)
          }}
          style={{
            width: isMenuOpen ? '120px' : '0',
            visibility: isMenuOpen ? 'visible' : 'hidden',
          }}
        >
          Highest Discount Rate
        </SortItems>
        <SortItems
          onClick={() => {
            clickHandler(5)
            setIsMenuOpen(0)
          }}
          style={{
            width: isMenuOpen ? '120px' : '0',
            visibility: isMenuOpen ? 'visible' : 'hidden',
          }}
        >
          Lowest User Rate
        </SortItems>
        <SortItems
          onClick={() => {
            clickHandler(6)
            setIsMenuOpen(0)
          }}
          style={{
            width: isMenuOpen ? '120px' : '0',
            visibility: isMenuOpen ? 'visible' : 'hidden',
          }}
        >
          Highest User Rate
        </SortItems>
      </SortContainer>
      <InputBox onChange={search} placeholder="Search" />

      <IntroductionContent></IntroductionContent>
      {displayList.map((item, index) => {
        return (
          <li class={item.platform}>
            <input
              type="checkbox"
              onChange={(e) => {
                checkboxHand(e, index)
              }}
            />
            <ul class="dataimg">
              <a href={item.link}>
                {item.platform == 'steam' ? (
                  <div class="imgCell">
                    <img class="forImg" src={item.imgSmall} />
                  </div>
                ) : (
                  <div class="imgCellEpic">
                    <img class="forImg" src={item.imgSmall} />
                  </div>
                )}
              </a>
            </ul>
            <ul class="dataTitle">
              <a href={item.link}>{item.title}</a>
            </ul>
            <ul class="nomalPrice">
              {item.price === 0 ? 'Free game.' : item.price} &#8361;
            </ul>
            <ul class="discountRate">
              {item['discount rate'] === null
                ? 'No discount.'
                : item['discount rate']}{' '}
            </ul>
            <ul class="discountedPrice">
              {item.discounted === 0 ? 'Free game.' : item.discounted} &#8361;
            </ul>
            <ul class="Ratings">
              {item.rating === null ? 'No user Ratings.' : item.rating}
            </ul>
          </li>
        )
      })}
    </div>
  )
}

export default IndexPage
