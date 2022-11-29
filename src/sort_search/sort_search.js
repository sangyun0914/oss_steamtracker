
const jsonData = require('../web-scraping/scraped.json');
let game_data = JSON.parse(JSON.stringify(jsonData));

//lowest price order
function lowest_price(game_list) {
    game_list.sort((a, b) => a.discounted - b.discounted);
}
//highest price order
function highest_price(game_list) {
    game_list.sort((a, b) => b.discounted - a.discounted);
}
//lowest discount rate order
function lowest_rate(game_list) {
    game_list.sort((a, b) => {
        let _a = a["discount rate"] !== null ? parseInt(a["discount rate"]) : 0;
        let _b = b["discount rate"] !== null ? parseInt(b["discount rate"]) : 0;
        return _b - _a;
    });
}
//highest discount rate order
function highest_rate(game_list) {
    game_list.sort((a, b) => {
        let _a = a["discount rate"] !== null ? parseInt(a["discount rate"]) : 0;
        let _b = b["discount rate"] !== null ? parseInt(b["discount rate"]) : 0;
        return _a - _b;
    });
}
//lowest rating order
function lowest_rating(game_list) {
    game_list.sort((a, b) => {
        let _a = a.rating !== null ? a.rating.toString().slice(0, 2) : 0;
        let _b = b.rating !== null ? b.rating.toString().slice(0, 2) : 0;
        return _a - _b;
    });
}
//highest rating order
function highest_rating(game_list) {
    game_list.sort((a, b) => {
        let _a = a.rating !== null ? a.rating.toString().slice(0, 2) : 0;
        let _b = b.rating !== null ? b.rating.toString().slice(0, 2) : 0;
        return _b - _a;
    });
}
//search title
function search_title(game_list, substirng) {
    return game_list.filter(game => game.title.indexOf(substirng) !== -1)
}

// load game list
function load_list(user_select) {

    let game_list = game_data.filter(game => { return 1 });

    if (user_select.title)
        game_list = search_title(game_list, user_select.title);

    if (user_select.order === Order_type['lowest price'])
        lowest_price(game_list);
    else if (user_select.order === Order_type['highest price'])
        highest_price(game_list);
    else if (user_select.order === Order_type['lowest rate'])
        lowest_rate(game_list);
    else if (user_select.order === Order_type['highest rate'])
        highest_rate(game_list);
    else if (user_select.order === Order_type['lowest rating'])
        lowest_rating(game_list);
    else if (user_select.order === Order_type['highest rating'])
        highest_rating(game_list);


    return game_list;
}

const Order_type = {
    default: 0,
    "lowest price": 1,
    "highest price": 2,
    "lowest rate": 3,
    "highest rate": 4,
    "lowest rating": 5,
    "highest rating": 6,
}


// exmaple
let user_select = {
    order: Order_type['highest rating'],
    title: null,
}

let game_list = load_list(user_select);
console.log(game_list);