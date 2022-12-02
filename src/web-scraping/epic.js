const jsonData = require("./epicTotalRaw.json");
const fs = require("fs");

let game_data = JSON.parse(JSON.stringify(jsonData));
let games = jsonData["data"]["Catalog"]["searchStore"]["elements"];
let total = [];

games.forEach((element) => {
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

  title = element["title"];
  price = element["price"]["totalPrice"]["originalPrice"];
  discounted = element["price"]["totalPrice"]["discountPrice"];
  discount_rate =
    Math.floor((element["price"]["totalPrice"]["discount"] / price) * 100) +
    "%";
  if (discount_rate === "NaN%" || discount_rate === "0%") discount_rate = null;

  element["keyImages"].forEach((data) => {
    if (data.type === "Thumbnail") imgSmall = data.url;
  });
  imgBig = imgSmall;
  try {
    release_date = element["releaseDate"].split("T")[0];
  } catch {
    release_date = null;
  }
  link =
    "https://store.epicgames.com/en-US/p/" +
    element["catalogNs"]["mappings"][0]["pageSlug"];
  platform = "epic";
  review = null;
  rating = null;

  let game = {
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
  total.push(game);
});

// Save games to json file
const totalJson = JSON.stringify(total, null, 4);
fs.writeFile(`EpicTotal.json`, totalJson, function (err) {
  if (err) {
    console.log(err);
  }
});
