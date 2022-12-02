import React, { useState, useEffect } from 'react'
import './App.css'
import './sort_search/sort_search.js'
import { load_list, search_title } from './sort_search/sort_search.js'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Header from './components/Header'

const UserPage = () => {
  const [wisharray, setWishArray] = useState([])

  useEffect(() => {
    const localStorageWishlist = localStorage.getItem('wishlist')
    const wishListArray = JSON.parse(localStorageWishlist)
    setWishArray(wishListArray)
  }, [])

  return (
    <>
      <Header></Header>
      {wisharray.map((item, index) => {
        return (
          <li class={item.platform}>
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
    </>
  )
}

export default UserPage
