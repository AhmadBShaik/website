import puppeteer, {Page} from 'puppeteer'
import { Constants } from './Constants';
import fs from 'fs';
import { getRandomInt, getLastPartOfUrl, delay } from './utils'

const crawl = async () => {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    const dropdownCategories = await getDropdownCategoryURLs(page,`${Constants.BASE_URL}/category/confluentia-of-talent/`);

    let output: {[key:string]: object} = {}
    let allInstagramLinksCount = 0;

    const totalDropdownCategories = dropdownCategories.length;
    let currentDropdownCategory = 0;
    let currentDropdownCatogory = 1;

    console.log(`\n\n${totalDropdownCategories} categories detected...`)
    console.log(`Started crawling...`)

    for(let dropdownCategory of dropdownCategories){

        const innerDropdownCategoryURLs = await getInnerLinksOfDropdownURLs(page, dropdownCategory!)
        let linksCount = 0;
        let dropdownCategoriesOutput: {[key: string]: object} = {}
        
        console.log(`\n${currentDropdownCatogory}/${totalDropdownCategories} started extracting links from ${getLastPartOfUrl(dropdownCategory!)} category`)
        console.log("============================================================\n")
        
        const totalInnerDropdownCategoryURLs = innerDropdownCategoryURLs.length;
        let currentInnerDropdownCategoryURLNumber = 1;
        
        for(let innerDropdownCategoryURL of innerDropdownCategoryURLs){
            
            const randomInt = getRandomInt(5);
            delay(randomInt*1000)
            
            console.log(`\t${currentInnerDropdownCategoryURLNumber}/${totalInnerDropdownCategoryURLs}   ${getLastPartOfUrl(innerDropdownCategoryURL!)} | ⏳ delay ${randomInt} seconds`)
            const instagramLinks = await getInstagramLinks(page, innerDropdownCategoryURL!);
                        
            dropdownCategoriesOutput[getLastPartOfUrl(innerDropdownCategoryURL!)] = instagramLinks;
            output[getLastPartOfUrl(dropdownCategory!)] = dropdownCategoriesOutput;
            
            fs.writeFileSync(
                'output.json',
                JSON.stringify(output)
            );
            delay(2000);
            console.log(`\twrite output to output.json   ✔`);
            
            linksCount += dropdownCategories.length;
            currentInnerDropdownCategoryURLNumber += 1;
            }
            
            
            console.log(`extracted ${linksCount} instagram links from ${dropdownCategory}`)
            console.log('\n------------------------------------------------------------\n')
            
            allInstagramLinksCount += linksCount;
            currentDropdownCatogory += 1;
    }
    console.log("============================================================")  
    console.log("Complete!")  
    console.log(`Total links extracted : ${allInstagramLinksCount}`)
    console.log("============================================================\n")

    browser.close();
}

const getDropdownCategoryURLs = async (page: Page, url: string) => {
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

const getInnerLinksOfDropdownURLs =async (page:Page, url: string) => {
    
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

const getInstagramLinks = async (page: Page, url: string) => {
    await page.goto(url, {
        waitUntil: 'domcontentloaded'
    });

    const instagramLinks = await page.$$eval(
        'figcaption > a',
        (instaLinks) => {
            return instaLinks.map(e => e.getAttribute('href'))
                .filter(e => e !== null)
                .filter(e => e?.includes("www.instagram.com"))
                .filter((elem, index, self) => {
                    return index === self.indexOf(elem);
            });
        }
    );
    return instagramLinks;
}

crawl();