import { Page } from 'puppeteer';

export const getInnerLinksOfDropdownURLs =async (page:Page, url: string) => {
    
    await page.goto(url, {
        waitUntil: 'domcontentloaded'
    });

    const innerDropdownCategoryURLs = await page.$$eval(
        'ul.mvp-blog-story-list-col > li.mvp-blog-story-col > a',
        (innerCategoryContentLinks) => {
            return innerCategoryContentLinks.map(e => e.getAttribute('href'))
                .filter(e => e !== null)
                .filter((elem, index, self) => {
                    return index === self.indexOf(elem);
            });
        }
    );

    return innerDropdownCategoryURLs;
}
