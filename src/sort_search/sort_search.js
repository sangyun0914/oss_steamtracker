const jsonData = require('../web-scraping/scraped.json');
let game_data = JSON.parse(JSON.stringify(jsonData));

//lowest price order
export function lowest_price(game_list) {
    game_list.sort((a, b) => a.discounted - b.discounted)
}
//highest price order
export function highest_price(game_list) {
    game_list.sort((a, b) => b.discounted - a.discounted)
}
//lowest discount rate order
export function lowest_rate(game_list) {
    game_list.sort((a, b) => {
        let _a = a["discount rate"] !== null ? parseInt(a["discount rate"]) : 0;
        let _b = b["discount rate"] !== null ? parseInt(b["discount rate"]) : 0;
        return _b - _a;
    });
}
//highest discount rate order
export function highest_rate(game_list) {
    game_list.sort((a, b) => {
        let _a = a["discount rate"] !== null ? parseInt(a["discount rate"]) : 0;
        let _b = b["discount rate"] !== null ? parseInt(b["discount rate"]) : 0;
        return _a - _b;
    });
}
//lowest rating order
export function lowest_rating(game_list) {
    game_list.sort((a, b) => {
        let _a = a.rating !== null ? a.rating.toString().slice(0, 2) : 0;
        let _b = b.rating !== null ? b.rating.toString().slice(0, 2) : 0;
        return _a - _b;
    });
}
//highest rating order
export function highest_rating(game_list) {
    game_list.sort((a, b) => {
        let _a = a.rating !== null ? a.rating.toString().slice(0, 2) : 0;
        let _b = b.rating !== null ? b.rating.toString().slice(0, 2) : 0;
        return _b - _a;
    });
}
//search title
export function search_title(game_list, substirng) {
    return game_list.filter((game) => game.title.indexOf(substirng) !== -1)
}

// load game list
export function load_list(user_select) {
    let game_list = game_data.filter((game) => {
        return 1
    })
    if (user_select.title) game_list = search_title(game_list, user_select.title)

    if (user_select === 1) lowest_price(game_list)
    else if (user_select === 2) highest_price(game_list)
    else if (user_select === 3) lowest_rate(game_list)
    else if (user_select === 4) highest_rate(game_list)
    else if (user_select.order === 5) lowest_rating(game_list)
    else if (user_select.order === 6) highest_rating(game_list)

    return game_list
}

export const Order_type = {
    default: 0,
    'lowest price': 1,
    'higest price': 2,
    'lowest rate': 3,
    'higest rate': 4,
    'lowest rating': 5,
    'highest rating': 6,
}

// exmaple
export let user_select = {
    order: Order_type['lowest rate'],
    title: null,
}

export let game_list = load_list(user_select)
console.log(game_list)
