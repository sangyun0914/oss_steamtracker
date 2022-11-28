const https = require("https");
const cheerio = require("cheerio");

let url =
  "https://store.steampowered.com/search/results/?query&start=0&count=50&dynamic_data=&sort_by=_ASC&os=win&supportedlang=english&snr=1_7_7_7000_7&filter=topsellers&infinite=1";

function get_data(url) {
  https.get(url, (res) => {
    let data = "";
    res.on("data", (d) => {
      data += d;
    });
    res.on("end", () => {
      let result = JSON.parse(data);
      result = result["results_html"];

      let gameslist = [];
      const $ = cheerio.load(result);
      const list = $("a");
      list.each((i, tag) => {
        let title = $(tag).find(".title").text();

        let discount_rate = $(tag).find(".search_discount").text().trim();
        if (discount_rate === "") discount_rate = undefined;

        let price = $(tag).find(".search_price").text().trim().split("₩")[1];

        let discounted = $(tag)
          .find(".search_price")
          .text()
          .trim()
          .split("₩")[2];

        mygame = {
          title: title,
          "discount rate": discount_rate,
          price: price,
          discounted: discounted,
        };

        gameslist.push(mygame);
      });

      console.log(gameslist);

      //const games = root.querySelectorAll("a");
      // console.log(games);

      // games.each((game) => {
      //   console.log(game);
      // });
    });
  });
}

function getTopSeller() {
  let data = get_data(url);
}

getTopSeller();
