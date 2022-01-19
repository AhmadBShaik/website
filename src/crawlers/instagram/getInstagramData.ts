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
    let completedList: {[key:string]:string} = {}

    const filteredInstaLinks :{[key:string] :string} = filteredLinks;
   
    for(let link in filteredInstaLinks){
        
        const randomInt = 5 + getRandomInt(8);
        const waitTime = (randomInt*60000);
        delay(waitTime);
        
          
        try{
            console.log(`wait for ${randomInt*60000} seconds`)
        
            const { username, profession, posts, followers, following, desc } = await getInfo(page,link!);
            const instaHandle = getInstaHandle(link)
            const areaOfExpertise = filteredInstaLinks[link];
            console.log({ username, areaOfExpertise, profession, posts, followers, following, instaHandle, desc })
            resultList.push({ 
                "Creator Name":username, 
                "Area of Expertise":areaOfExpertise,
                "Profession":profession, 
                "Insta Handle":instaHandle,
                "Posts":posts, 
                "Followers":followers, 
                "Following":following,
                "Contact Details":desc
            })
            
            
            
            fs.writeFileSync(
                './src/output/result.json',
                JSON.stringify(resultList)
            );


        }
        catch{
            console.log(`profile is unavailable or removed: ${link}`)            
        }        
        
    }    

 browser.close();   
}


