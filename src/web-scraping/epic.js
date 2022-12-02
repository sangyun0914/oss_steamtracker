const jsonData = require("./sale.json");
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

  element["keyImages"].forEach((data) => {
    if (data.type === "Thumbnail") imgSmall = data.url;
  });
  imgBig = imgSmall;
  release_date = element["releaseDate"].split("T")[0];
  link = element["url"];
  platform = null;
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

console.log(total);

// Save games to json file
const totalJson = JSON.stringify(total, null, 4);
fs.writeFile(`EpicSale.json`, totalJson, function (err) {
  if (err) {
    console.log(err);
  }
});
