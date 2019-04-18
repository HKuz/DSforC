#!/Applications/anaconda/envs/webscrapy/bin

'''
Uses Anaconda environment with selenium to load JS on page and get content
    - Python 3.6, selenium, and Beautiful Soup 4 (bs4)
    - Run `source activate webscrapy`, `python scraper.py`
'''


import time
from selenium import webdriver
import bs4


def main():
    url = 'https://www.regulations.gov/document?D=EPA-HQ-OW-2018-0149-3974'
    # css_path = ('html body div div.printPageContainer.GIY1LSJCQC div'
    #             '.GIY1LSJNPC.GIY1LSJBQC.printPage div.GIY1LSJAQC div.'
    #             'GIY1LSJD5C table tbody tr td div div.breakWord div.'
    #             'GIY1LSJLXD div.GIY1LSJIXD div')
    css_sel = '.GIY1LSJIXD > div:nth-child(2)'

    browser = webdriver.Firefox()
    browser.get(url)
    time.sleep(5)
    innerHTML = browser.execute_script("return document.body.innerHTML")
    soup = bs4.BeautifulSoup(innerHTML, features="lxml")
    elem = soup.select(css_sel)
    print(elem[0].text)
    time.sleep(2)
    browser.quit()


if __name__ == '__main__':
    main()
