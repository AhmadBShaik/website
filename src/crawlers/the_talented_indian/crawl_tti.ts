import puppeteer, {Page} from 'puppeteer';
import fs from 'fs';

import { Constants } from '../../constants/Constants';
import { getRandomInt, getLastPartOfUrl, delay } from '../../utilities/utils';
import { getDropdownCategoryURLs } from './getDropdownCategoryURLs';
import { getInstagramLinks } from './getInstagramLinks';
import { getInnerLinksOfDropdownURLs } from './getInnerLinksOfDropdownURLs';


export const crawlTTI = async () => {
    const browser = await puppeteer.launch();
    
    const page = await browser.newPage();
    
    // categories in confluentia of talent
    const dropdownCategories = await getDropdownCategoryURLs(
        page,
        `${Constants.BASE_URL}/category/confluentia-of-talent/`
    );
    
    let output: {[key:string]: object} = {};
    let allInstagramLinksCount = 0;

    const totalDropdownCategories = dropdownCategories.length;
    let currentDropdownCategory = 1;
    
    console.log(`\n\n${totalDropdownCategories} categories detected...`);
    console.log(`Started crawling...`);
    
    for(let dropdownCategory of dropdownCategories){ // list of category items Ex:/arts-and-crafts, /creators, etc,.
        
        // console.log(dropdownCategories)
        
        try{
            console.log(
                `\n${currentDropdownCategory}/${totalDropdownCategories}` + 
            ` started extracting links from ${getLastPartOfUrl(dropdownCategory!)} category\n`
            );
            const innerDropdownCategoryURLs = await getInnerLinksOfDropdownURLs(page, dropdownCategory!);

            let linksCount = 0;
            let dropdownCategoriesOutput: {[key: string]: object} = {};
            
            console.log("========================================================================================================================\n");
            
            const totalInnerDropdownCategoryURLs = innerDropdownCategoryURLs.length;
            let currentInnerDropdownCategoryURLNumber = 1;

            for(let innerDropdownCategoryURL of innerDropdownCategoryURLs){ // inner category items Ex: arts-and-crafts/these-art-creators-paint-the-magnificent-colours-of-life
                const randomInt =  getRandomInt(5);
                await delay(randomInt*1000);
                
                console.log(
                    `\t${currentInnerDropdownCategoryURLNumber}/${totalInnerDropdownCategoryURLs}` +  
                    `   ${getLastPartOfUrl(innerDropdownCategoryURL!)} | ??? delay ${randomInt} seconds`
                );
                const instagramLinks = await getInstagramLinks(page, innerDropdownCategoryURL!);
                
                dropdownCategoriesOutput[getLastPartOfUrl(innerDropdownCategoryURL!)] = instagramLinks;
                output[getLastPartOfUrl(dropdownCategory!)] = dropdownCategoriesOutput;
                
                fs.writeFileSync(
                    './src/output/data.json',
                    JSON.stringify(output)
                    );
                    await delay(2000);
                    console.log(`\twrite output to data.json   ???`);
                    
                    linksCount += dropdownCategories.length;
                    currentInnerDropdownCategoryURLNumber += 1;
                    
                    
                    console.log(`extracted ${linksCount} instagram links from ${dropdownCategory}`);
                    console.log('\n------------------------------------------------------------------------------------------------------------------------\n');
                    
                    allInstagramLinksCount += linksCount;
                }
                
            }
            catch(e){
                console.log("An error occured:", e)
            }    
            currentDropdownCategory += 1;
        }

    console.log("========================================================================================================================");
    console.log("Complete!");
    console.log(`Total links extracted : ${allInstagramLinksCount}`);
    console.log("========================================================================================================================\n");
    
    browser.close();
}

            