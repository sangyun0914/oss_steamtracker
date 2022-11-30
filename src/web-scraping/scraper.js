const https = require("https");
const cheerio = require("cheerio");
const fs = require("fs");

function parseSteam(url, command) {
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

        $(tag)
          .find(".platform_img")
          .each(function (index, element) {
            platform.push(
              $(element).attr("class").replaceAll("platform_img", "").trim()
            );
          });

        // Game object
        mygame = {
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

        gameslist.push(mygame);
      });

      // Save to json
      const jsonData = JSON.stringify(gameslist, null, 4);
      fs.writeFile(`./${command}.json`, jsonData, function (err) {
        if (err) {
          console.log(err);
        }
      });
    });
  });
}

function main() {
  if (process.argv.length <= 2) {
    console.log("Insufficient parameter! arg: topSeller or  popularNew");
    process.exit(1);
  }

  let command = process.argv[2];
  let url;

  switch (command) {
    case "topSeller":
      url =
        "https://store.steampowered.com/search/results/?query&start=0&count=50&dynamic_data=&sort_by=_ASC&os=win&supportedlang=english&snr=1_7_7_7000_7&filter=topsellers&infinite=1";
      break;
    case "popularNew":
      url =
        "https://store.steampowered.com/search/results/?query&start=0&count=50&dynamic_data=&sort_by=Released_DESC&os=win&supportedlang=english&snr=1_7_7_popularnew_7&filter=popularnew&infinite=1";
      break;
    default:
      console.log("Wrong command!");
      process.exit(1);
  }

  parseSteam(url, command);
}

main();
