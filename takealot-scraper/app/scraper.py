# app/scraper.py
import urllib.parse
from bs4 import BeautifulSoup
from playwright.async_api import async_playwright

HEADERS_USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/120.0.0.0 Safari/537.36"
)

async def fetch_html_two_load_more(query: str, headless: bool = True) -> str:
    url = "https://www.takealot.com/all?qsearch=" + urllib.parse.quote_plus(query)
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=headless, args=["--no-sandbox"])
        context = await browser.new_context(user_agent=HEADERS_USER_AGENT, locale="en-ZA")
        page = await context.new_page()
        await page.goto(url, wait_until="networkidle", timeout=60000)

        # click load more twice if present
        for _ in range(2):
            try:
                load_more = await page.query_selector("button.ghost.search-listings-module_load-more_OwyvW")
                if not load_more:
                    break
                await load_more.click()
                await page.wait_for_timeout(2000)
            except Exception:
                break

        html = await page.content()
        await browser.close()
    return html

def parse_products(html: str):
    soup = BeautifulSoup(html, "lxml")
    products = []

    link_tags = soup.select("a.product-card-module_link-underlay_3sfaA")
    for link_tag in link_tags:
        href = link_tag.get("href")
        link = "https://www.takealot.com" + href if href else None

        details_div = link_tag.find_next("div", class_="product-card-module_product-details-container_3ntEA")
        if details_div:
            title_tag = details_div.select_one("h4.product-card-module_product-title_16xh8")
            title = title_tag.get_text(strip=True) if title_tag else None

            brand_tag = details_div.select_one('div[data-ref="brand-wrapper"] a')
            brand = brand_tag.get_text(strip=True) if brand_tag else None

            price_tag = details_div.select_one('li.price[data-ref="price"] span.currency')
            price = price_tag.get_text(strip=True) if price_tag else None

            list_price_tag = details_div.select_one('li.list-price[data-ref="list-price"] span.currency')
            list_price = list_price_tag.get_text(strip=True) if list_price_tag else None

            stock_tag = details_div.select_one('span.stock-availability-status[data-ref="stock-availability-status"]')
            stock_status = stock_tag.get_text(strip=True) if stock_tag else None

            est_tag = details_div.select_one('div.product-card-module_estimated-dates_adGQI span')
            estimated_delivery = est_tag.get_text(strip=True) if est_tag else None

            rating_tag = details_div.select_one('div.rating-module_rating-wrapper_3Cogb .score')
            rating = rating_tag.get_text(strip=True) if rating_tag else None
            reviews_tag = details_div.select_one('div.rating-module_rating-wrapper_3Cogb .rating-module_review-count_3g6zO')
            reviews = reviews_tag.get_text(strip=True) if reviews_tag else None
        else:
            title = brand = price = list_price = stock_status = estimated_delivery = rating = reviews = None

        products.append({
            "title": title,
            "brand": brand,
            "price": price,
            "list_price": list_price,
            "stock_status": stock_status,
            "estimated_delivery": estimated_delivery,
            "rating": rating,
            "reviews": reviews,
            "link": link
        })
    return products
