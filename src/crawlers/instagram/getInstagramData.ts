import puppeteer, { Page } from 'puppeteer';
import { delay, getInstaHandle, getRandomInt } from '../../utilities/utils';
import fs from 'fs';

import * as dotenv from 'dotenv';


dotenv.config();
import filteredLinks from '../../output/filteredLinks.json'
import { getInfo } from './userInfo/getInfo';



export const getInstagramData = async () => {
    const browser = await puppeteer.launch({
        headless:false,
    });

    const page = await browser.newPage();
    await page.goto("https://www.instagram.com/accounts/login/",{
        waitUntil:'networkidle2'
    })


    await page.waitForSelector('input[name="username"]');
    
    await page.type('input[name="username"]', process.env.INSTA_USERNAME!);
    await page.type('input[name="password"]', process.env.INSTA_PASSWORD!);
    await page.click('button[type="submit"]');

    await page.waitForNavigation();
    
    
    const resultList: object[] = []
    
    const filterdInstaLinks :{[key:string] :string} = filteredLinks;
   
    for(let link in filterdInstaLinks){
        
        const randomInt = getRandomInt(8);
        const waitTime = (randomInt*1000);
        delay(waitTime);
        
          
        console.log(`wait for ${waitTime/1000} seconds`)
        const { username, profession, posts, followers, following } = await getInfo(page,link);
        const instaHandle = getInstaHandle(link)
     
        console.log({ username, profession, posts, followers, following, instaHandle })
        resultList.push({ 
            username, 
            profession, 
            posts, 
            followers, 
            following, 
            instaHandle 
        })
        fs.writeFileSync(
            './src/output/result.json',
            JSON.stringify(resultList)
        );
        await page.waitForNavigation();

        break;
    }    

 browser.close();   
}


