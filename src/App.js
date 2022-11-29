import logo from './logo.svg'
import './App.css'
import './sort_search/sort_search.js'
import steamData from './web-scraping/scraped.json'
function App() {
  const newSteamData = steamData.map((item, index) => {
    return (
      <li key={index}>
        {item.title} / {item.price} /{' '}
        {item['discount rate'] === null
          ? 'No discount.'
          : item['discount rate']}{' '}
        /{item.discounted}
      </li>
    )
  })
  return <div className="App">{newSteamData}</div>
}

export default App
