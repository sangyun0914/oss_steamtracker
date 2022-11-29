
const jsonData = require('../web-scraping/scraped.json');
let game_data = JSON.parse(JSON.stringify(jsonData));
game_data.forEach(element => {
    if (element['discount rate'] === null)
        element['discount rate'] = 0;
});

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
    game_list.sort((a, b) => parseInt(b["discount rate"]) - parseInt(a["discount rate"]));
}
//highest discount rate order
function highest_rate(game_list) {
    game_list.sort((a, b) => parseInt(a["discount rate"]) - parseInt(b["discount rate"]));
}
//search title
function search_title(game_list, substirng) {
    return game_list.filter(game => game.title.indexOf(substirng) !== -1)
}

// load game list
function load_list(user_select) {

    let game_list = game_data.filter(game => { return 1 });

    if (user_select.order === Order_type['lowest price'])
        lowest_price(game_list);
    else if (user_select.order === Order_type['highest price'])
        highest_price(game_list);
    else if (user_select.order === Order_type['lowest rate'])
        lowest_rate(game_list);
    else if (user_select.order === Order_type['highest rate'])
        highest_rate(game_list);


    if (user_select.title)
        game_list = search_title(game_list, user_select.title);

    return game_list;
}

const Order_type = {
    default: 0,
    "lowest price": 1,
    "highest price": 2,
    "lowest rate": 3,
    "highest rate": 4,
}


// exmaple
let user_select = {
    order: Order_type['highest rate'],
    title: null,
}

let game_list = load_list(user_select);
console.log(game_list);