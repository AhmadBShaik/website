import puppeteer from 'puppeteer'
const BASE_URL = "https://thetalentedindian.com/";
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto( `${BASE_URL}category/confluentia-of-talent/`);

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

    console.log(categories);

    for(let category of categories){
        console.log(category);
    }
    
    browser.close();
})();

