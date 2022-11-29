import logo from './logo.svg'
import './App.css'
import './sort_search/sort_search.js'
import steamData from './web-scraping/scraped.json'
function App() {
  const newSteamData = steamData.map((item, index) => {
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
  return (
    <div className="App">
      <h1>STEAMTRACKER for SKKU</h1>
      {newSteamData}
    </div>
  )
}

export default App
