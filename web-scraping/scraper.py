"""
    scraper - Python code to scrape the STEAM store and output it in json file
    Parses the url into a dictionary
    Modify 'numGames' variable to change the number of games to scrap (Multiple of 50)

    OUTPUT - 'scraped.json'
"""

import requests
from bs4 import BeautifulSoup
import json
import os

def get_data(url):
    """Requests the HTML file of the url and returns in dictionary format."""
    r = requests.get(url)
    data = dict(r.json())
    return data['results_html']

def parse(data):
    """Parases the HTML data and returns the games in formatted dictionary."""
    gameslist = []
    soup = BeautifulSoup(data, 'html.parser')
    games = soup.find_all('a')

    for game in games:
        title = game.find('span', {'class':'title'}).text

        discount_rate = game.find('div', {'class':'search_discount'}).text.strip()
        if not discount_rate:
            discount_rate = None

        try: 
            price = game.find('div', {'class':'search_price'}).text.strip().split('₩')[1].strip()
            price = int(price.replace(',', ''))
        except:
            price = 0

        try:
            discounted = game.find('div', {'class':'search_price'}).text.strip().split('₩')[2].strip()
            discounted = int(discounted.replace(',', ''))
        except:
            discounted = price

        mygame = {
            'title':title,
            'discount rate':discount_rate,
            'price':price,
            'discounted':discounted
        }

        gameslist.append(mygame)

    return gameslist

def maximum_results(url):
    """Returns the maximum results that can be given by server."""
    r = requests.get(url)
    data = dict(r.json())
    totalresults = data['total_count']
    return int(totalresults)

def store_json(result):
    """Store the given result into .json file."""
    json_object = json.dumps(result, indent=4)
    with open(os.path.join(os.path.dirname(__file__), "scraped.json"), "w") as outfile:
        outfile.write(json_object)


def main():
    output = []

    # Change accordingly 
    numGames = 100 
    for i in range (0, numGames+1, 50):
        data = get_data(f'https://store.steampowered.com/search/results/?query&start={i}&count=50&dynamic_data=&sort_by=_ASC&os=win&supportedlang=english&snr=1_7_7_7000_7&filter=topsellers&infinite=1')
        output.extend(parse(data))
    print("Games Scraped: ", i)
    store_json(output)


if __name__ == '__main__':
    main()
