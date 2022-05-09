import requests


def article_search(api_key, search="World"):

    parameter = {"api-key": api_key, "q": search}
    data = requests.get("https://api.nytimes.com/svc/search/v2/articlesearch.json", params=parameter)
    return data.json()["response"]["docs"]



def content(data):
    abstract = []
    web_url = []
    #image_url = []
    lead_paragraph = []

    for i in range(10):
        abstract.append(data[i]["abstract"])
        web_url.append(data[i]["web_url"])
        lead_paragraph.append(data[i]["lead_paragraph"])
        #image_url.append(data[i]["multimedia"][0]["url"])

    #return image_url