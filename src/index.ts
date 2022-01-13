import puppeteer, {Page} from 'puppeteer'
import { Constants } from './Constants';
import fs from 'fs';

// import { CrawlCategories } from './CrawlCategories'

// (async () => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto( `${Constants.BASE_URL}/category/confluentia-of-talent/`,{
//         waitUntil:'domcontentloaded'
//     });

//     const categories = await page.$$eval(
//         'li.menu-item > ul.sub-menu > li > a',
//         (categoryLinks) => {

//             return categoryLinks
//                 .map(e => e.getAttribute('href'))
//                 .filter(e => e !== null)
//                 .filter((elem, index, self) => {
//                     return index === self.indexOf(elem);
//                 });
//         }
//     )

    
//     for(let category of categories){
//     }
//     browser.close();
// })();



const crawl = async () => {
    const browser = await puppeteer.launch({
        // headless: false
    });

    const page = await browser.newPage();

    const dropdownCategories = await getDropdownCategoryURLs(page,`${Constants.BASE_URL}/category/confluentia-of-talent/`);

    let output: {[key:string]: object} = {}

    for(let dropdownCategory of dropdownCategories){
        const innerDropdownCategoryURLs = await getInnerLinksOfDropdownURLs(page, dropdownCategory!)
        console.log("================================================")
        console.log(dropdownCategory)
        console.log("================================================")

        let dropdownCategoriesOutput: {[key: string]: object} = {}
        for(let innerDropdownCategoryURL of innerDropdownCategoryURLs){
            
            console.log('\t-----------------------------------------------')
            console.log("\t",innerDropdownCategoryURL)
            console.log('\t-----------------------------------------------')
            const instagramLinks = await getInstagramLinks(page, innerDropdownCategoryURL!);
            // console.log(instagramLinks)
            dropdownCategoriesOutput[innerDropdownCategoryURL!] = instagramLinks;
            output[dropdownCategory!] = dropdownCategoriesOutput;

            // for(let listOfinstagramLinks of instagramLinks){
            //     console.log("\t\t",listOfinstagramLinks)
               
            // }

            // console.log(dropdownCategoriesOutput)
        }
    }
    fs.writeFileSync(
        'output.json',
        JSON.stringify(output)
    )


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
                // .filter(e => e?.includes("instagram.com"))
                .filter((elem, index, self) => {
                    return index === self.indexOf(elem);
            });
        }
    );
    return instagramLinks;
}

crawl();