#!/usr/local/bin/python3

import requests
import bs4


def main():
    url = 'https://www.regulations.gov/document?D=EPA-HQ-OW-2018-0149-3974'
    css_path = ('html body div div.printPageContainer.GIY1LSJCQC div'
                '.GIY1LSJNPC.GIY1LSJBQC.printPage div.GIY1LSJAQC div.'
                'GIY1LSJD5C table tbody tr td div div.breakWord div.'
                'GIY1LSJLXD div.GIY1LSJIXD div')
    # css_path = 'html body div div.printPageContainer.GIY1LSJCQC div.GIY1LSJNPC.GIY1LSJBQC.printPage div.GIY1LSJAQC div.GIY1LSJD5C table tbody tr td div div.breakWord div.GIY1LSJLXD div.GIY1LSJIXD div'
    res = requests.get(url)
    print(res.text)
    soup = bs4.BeautifulSoup(res.text, 'html.parser')
    elems = soup.select(css_path)
    print(elems)


if __name__ == '__main__':
    main()
