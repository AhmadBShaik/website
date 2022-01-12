import puppeteer from 'puppeteer'
import { Constants } from './Constants';
import { CrawlCategories } from './CrawlCatogories'

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto( `${Constants.BASE_URL}/category/confluentia-of-talent/`);

    const categories = await page.$$eval(
        'li.menu-item > ul.sub-menu > li > a',
        (categoryLinks) => {

            return categoryLinks
                .map(e => e.getAttribute('href'))
                .filter(e => e !== null)
                .filter((elem, index, self) => {
                    return index === self.indexOf(elem);
                });
        }
    )

    for(let category of categories){
        CrawlCategories(category!)
    }
    
    browser.close();
})();

