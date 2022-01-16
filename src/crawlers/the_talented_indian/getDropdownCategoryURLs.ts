import { Page } from 'puppeteer';

export const getDropdownCategoryURLs = async (page: Page, url: string) => {
    await page.goto(url, {
        waitUntil:'domcontentloaded'
    });
    
    const dropdownCategoryURLs = await page.$$eval(
        'li.menu-item > ul.sub-menu > li > a',
        (dropdownCategoryLinks) => {
            return dropdownCategoryLinks
                .map(e => e.getAttribute('href'))
                .filter(e => e !== null)
                .filter((elem, index, self) => {
                    return index === self.indexOf(elem);
                });
        }
    );
    return dropdownCategoryURLs;
}