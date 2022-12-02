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
        let _a = a.rating !== null ? parseInt(a.rating.toString().slice(0, 3)) : 0;
        let _b = b.rating !== null ? parseInt(b.rating.toString().slice(0, 3)) : 0;
        return _a - _b;
    });
}
//highest rating order
export function highest_rating(game_list) {
    game_list.sort((a, b) => {
        let _a = a.rating !== null ? parseInt(a.rating.toString().slice(0, 3)) : 0;
        let _b = b.rating !== null ? parseInt(b.rating.toString().slice(0, 3)) : 0;
        return _b - _a;
    });
}
//search title
export function search_title(game_list, substirng) {
    return game_list.filter((game) => game.title.toLowerCase().indexOf(substirng.toLowerCase()) !== -1)
}
//select platform
export function select_platform(game_list, platform) {
    return game_list.filter((game) => game.platform === platform)
}

// load game list
export function load_list(user_select) {
    let game_list = game_data.filter((game) => {
        return 1
    })

    if (user_select === 1) lowest_price(game_list)
    else if (user_select === 2) highest_price(game_list)
    else if (user_select === 3) lowest_rate(game_list)
    else if (user_select === 4) highest_rate(game_list)
    else if (user_select === 5) lowest_rating(game_list)
    else if (user_select === 6) highest_rating(game_list)

    return game_list
}

