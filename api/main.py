import os
import re
from datetime import datetime, timedelta

import requests
from bs4 import BeautifulSoup
from fastapi import FastAPI

app = FastAPI()

URL = "https://solidarite.fondationaphp.fr/projects/rouler-pour-aider-fr"
CACHE_MINUTES = os.getenv("CACHE_MINUTES", 15)


def get_donations():
    page = requests.get(URL)
    soup = BeautifulSoup(page.content, "html.parser")

    current_amount_html = soup.find(class_="current-amount")
    current_amount = re.findall(r"\d+", current_amount_html.text)[0]

    target_amount_html = soup.find(class_="objectif-amount")
    target_amount = re.findall(r"\d[\d\s,]*", target_amount_html.text)
    target_amount = re.sub(r"[\s,]", "", target_amount[0])

    days_left_html = soup.find(id="show_days")
    days_left = re.findall(r"\d+", days_left_html.span.text)[0]

    contributors_count_html = soup.select_one(".contributeurs span")
    contributors_count = contributors_count_html.text

    return {
        "current_amount": int(current_amount),
        "target_amount": int(target_amount),
        "days_left": int(days_left),
        "contributors_count": int(contributors_count),
    }


last_request = {"date": datetime.now(), "response": get_donations()}


@app.get("/donations")
def read_donations():
    now = datetime.now()

    if now - last_request["date"] > timedelta(minutes=CACHE_MINUTES):
        last_request["date"] = now
        last_request["response"] = get_donations()

    return last_request["response"]
