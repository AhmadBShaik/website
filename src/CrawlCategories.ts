import puppeteer from 'puppeteer'
import { CrawlCategoriesDetailPage } from './CrawlCategoriesDetailPage'

export async function CrawlCategories(categoryURL: string){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(categoryURL, {
        waitUntil:'domcontentloaded'
    });
    // console.log(categoryURL);
    const categoriesContent = await page.$$eval(
        'ul.mvp-blog-story-list-col > li.mvp-blog-story-col > a',
        (categoryContentLinks) => {
            return categoryContentLinks.map(e => e.getAttribute('href'))
                .filter(e => e !== null)
                .filter((elem, index, self) => {
                    return index === self.indexOf(elem);
            });
        }
    )

    for(let categoryContent of categoriesContent){
        // console.log(categoryContent);
        CrawlCategoriesDetailPage(categoryContent!);
    }
    browser.close();
}