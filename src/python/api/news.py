import requests
import json
import sys

page = 0

def article_search(api_key, search="World"):
    
    parameter = {"page": page, "api-key": api_key, "q": search}
    data = requests.get("https://api.nytimes.com/svc/search/v2/articlesearch.json", params=parameter)
    return data.json()["response"]["docs"]


def content(data):
    website = "https://www.nytimes.com/"
    author_name = []
    lead_paragraph = []
    abstract = []
    web_url = []
    image_url = []
    main_headline = []
    

    for i in range(10):
        abstract.append(data[i]["abstract"])
        web_url.append(data[i]["web_url"])
        lead_paragraph.append(data[i]["lead_paragraph"])
        main_headline.append(data[i]["headline"]["main"])
        author_name.append(data[i]["byline"]["original"])

        try:
            image_url.append(website+data[i]["multimedia"][0]["url"])
        except IndexError:
            image_url.append("")

    return abstract, main_headline ,web_url, image_url, author_name


def load_article(api_key, search="World"):
    global page
    page += 1
    data = article_search(api_key=api_key, search=search)
    return content(data)


if __name__ == "__main__":
    search = sys.argv[1]

    if search == "":
        search = "world"

    with open("src\\python\\api\\api_keys.json") as f:
        data = json.load(f)

    api_key = data["Nyt"]

    for contents in load_article(api_key, search=search):
        print(contents)