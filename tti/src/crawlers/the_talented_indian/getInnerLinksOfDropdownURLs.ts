import { Page } from 'puppeteer';
import { delay } from '../../utilities/utils';

export const getInnerLinksOfDropdownURLs = async (page: Page, url: string) => {
    await page.goto(url, {
        waitUntil:'domcontentloaded'
    });
    
    
    let moreBtnExists = true;
    while(moreBtnExists){
        await delay(5000)
        moreBtnExists =  await page.$eval(
            'div.mvp-inf-more-wrap > a.mvp-inf-more-but',
            (e) => {
                return window.getComputedStyle(e).getPropertyValue('display') !== "none";
            }
        );
        
        
        if(moreBtnExists){
            console.log("pagination is available, clicking more posts button")
            await page.click('a.mvp-inf-more-but');
        }
        else{
            console.log(`all posts of ${url} are detected`);
        }
    }
    return await page.$$eval(
        'ul.mvp-blog-story-list-col > li.mvp-blog-story-col > a',
        (innerCategoryContentLinks) => {
            return innerCategoryContentLinks.map(e => e.getAttribute('href'))
                .filter(e => e !== null)
                .filter((elem, index, self) => {
                    return index === self.indexOf(elem);
            });
        }    
    )
}

