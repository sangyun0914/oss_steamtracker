/**
 * scraper - Javascript code to scrape the STEAM store and output it in json file
 *
 * INPUT - node scraper.js [mode] [numGames]
 * @param mode {top, popularNew} - return topSellers or popular new games
 * @param numGames - number of games to scrap, multiple of 50 (Default to 100)
 *
 * OUTPUT - 'scraped.json'
 */

const https = require("https");
const cheerio = require("cheerio");
const fs = require("fs");

// Async function to receive data from URL and pass to 'parse' function
async function parseSteam(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (d) => {
        data += d;
      });
      // Parse given data
      res.on("end", () => {
        resolve(parse(JSON.parse(data)));
      });
    });
  });
}

// Parse given data into array of objects 'games'
function parse(result) {
  let gameslist = []; // Total games array of game objects
  result = result["results_html"];

  const $ = cheerio.load(result);
  const list = $("a");

  // Loop through games
  list.each((i, tag) => {
    let title,
      discount_rate,
      price,
      discounted,
      imgSmall,
      imgBig,
      link,
      platform = [],
      release_date,
      review,
      rating;

    title = $(tag).find(".title").text();

    release_date = $(tag).find(".search_released").text().trim();

    link = $(tag).attr("href");

    discount_rate = $(tag).find(".search_discount").text().trim();
    if (discount_rate === "") discount_rate = null;

    try {
      price = parseInt(
        $(tag)
          .find(".search_price")
          .text()
          .trim()
          .split("₩")[1]
          .trim()
          .replaceAll(",", "")
      );
    } catch {
      price = 0;
    }

    try {
      discounted = parseInt(
        $(tag)
          .find(".search_price")
          .text()
          .trim()
          .split("₩")[2]
          .trim()
          .replaceAll(",", "")
      );
    } catch {
      if (price !== 0) discounted = price;
      else discounted = 0;
    }

    imgSmall = $(tag).find("img").attr("srcset").split(" ")[0]; // Image 1x
    imgBig = $(tag).find("img").attr("srcset").split(" ")[2]; // Image 2x

    try {
      review = $(tag)
        .find(".search_review_summary")
        .attr("data-tooltip-html")
        .split("<br>")[0];

      rating = $(tag)
        .find(".search_review_summary")
        .attr("data-tooltip-html")
        .split("<br>")[1];
    } catch {
      review = null;
      rating = null;
    }

    platform = "steam";

    // Game object
    game = {
      title: title,
      release_date: release_date,
      link: link,
      "discount rate": discount_rate,
      price: price,
      discounted: discounted,
      imgSmall: imgSmall,
      imgBig: imgBig,
      review: review,
      rating: rating,
      platform: platform,
    };

    gameslist.push(game);
  });

  return gameslist;
}

async function main() {
  let command = process.argv[2];
  let numGames = parseInt(process.argv[3]);
  let total = [];
  let url;

  if (isNaN(numGames)) {
    numGames = 100;
  }

  for (let i = 0; i < numGames; i += 50) {
    switch (command) {
      case "popularNew":
        url = `https://store.steampowered.com/search/results/?query&start=${i}&count=50&dynamic_data=&sort_by=Released_DESC&os=win&supportedlang=english&snr=1_7_7_popularnew_7&filter=popularnew&infinite=1`;
        break;
      case "top":
        url = `https://store.steampowered.com/search/results/?query&start=${i}&count=50&dynamic_data=&sort_by=Released_DESC&os=win&supportedlang=english&snr=1_7_7_popularnew_7&filter=popularnew&infinite=1`;
      default:
        url = `https://store.steampowered.com/search/results/?query&start=${i}&count=50&dynamic_data=&sort_by=_ASC&os=win&supportedlang=english&snr=1_7_7_7000_7&filter=topsellers&infinite=1`;
        command = "SteamTop";
    }

    total = total.concat(await parseSteam(url));
  }

  // Save games to json file
  const jsonData = JSON.stringify(total, null, 4);
  fs.writeFile(`${command}.json`, jsonData, function (err) {
    if (err) {
      console.log(err);
    }
  });
}

main();
