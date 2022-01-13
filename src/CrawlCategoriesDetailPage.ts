import puppeteer from 'puppeteer'

export async function CrawlCategoriesDetailPage(categoryDetailURL: string){    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(categoryDetailURL, {
        waitUntil: 'domcontentloaded'
    });
    console.log(categoryDetailURL);
    console.log("=============================================================")
    const categoryDetailContent = await page.$$eval(
        'mvp-main-post-head > a',
        (categoryDetailContentLinks) => {
            return categoryDetailContentLinks.map(e => e.getAttribute('href'))
            .filter(e => e !== null)
            .filter(e => e?.includes('instagram.com'))
            .filter((elem, index, self) => {
                return index === self.indexOf(elem);
            });
        }
    )
    
    console.log(categoryDetailContent)
    console.log(categoryDetailContent.length)
    browser.close();
}