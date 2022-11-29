const https = require("https");
const cheerio = require("cheerio");

let url =
  "https://store.steampowered.com/search/results/?query&start=0&count=50&dynamic_data=&sort_by=_ASC&os=win&supportedlang=english&snr=1_7_7_7000_7&filter=topsellers&infinite=1";

function parseSteam(url) {
  https.get(url, (res) => {
    let data = "";
    res.on("data", (d) => {
      data += d;
    });
    // Parse given data
    res.on("end", () => {
      let result = JSON.parse(data);
      result = result["results_html"];

      let gameslist = []; // Total games array of game objects
      const $ = cheerio.load(result);
      const list = $("a");

      // Loop through games
      list.each((i, tag) => {
        let title, discount_rate, price, discounted, imgSmall, imgBig, link;

        title = $(tag).find(".title").text();

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
          discounted = 0;
        }

        imgSmall = $(tag).find("img").attr("srcset").split(" ")[0];
        imgBig = $(tag).find("img").attr("srcset").split(" ")[2];

        link = $(tag).attr("href");

        mygame = {
          title: title,
          "discount rate": discount_rate,
          price: price,
          discounted: discounted,
          imgSmall: imgSmall,
          imgBig: imgBig,
          link: link,
        };

        gameslist.push(mygame);
      });

      console.log(gameslist);
    });
  });
}

parseSteam(url);
