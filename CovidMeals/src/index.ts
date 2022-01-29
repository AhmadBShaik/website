import puppeteer from "puppeteer";
import fs from 'fs';

import { getAreasOfCities } from "./scrapers/getAreasOfCities";
import { getCities } from "./scrapers/getCities";
import { getTableData } from "./scrapers/getTableData";

(async () => {
    const browser = await puppeteer.launch({
        defaultViewport: null
    });
    const page = await browser.newPage();
    
    
    await page.goto('https://covidmeals.in/',{
        waitUntil:'domcontentloaded'
    });

    
    const citiesInfo = await getCities(page);
    
    let output: {[key: string]:{[key:string]:string[][]} []} = {};

    for(let [cityValue, city] of citiesInfo){
        
        
        const areasOfCity = await getAreasOfCities(page, cityValue!);
        await page.select('#city_list',cityValue!);
        
        
        const lst: {[key: string] :string[][]}[] = []
        for(let area of areasOfCity){
            
            console.log(`\nscraping ${area} from ${city}...`)

            await page.select(`#${cityValue!}_list`, area!);   
            await new Promise(resolve => setTimeout(resolve, 6000));

            const tableData = await getTableData(page);
            

            let obj:{[key: string]: string[][]} = {};
            obj[area!] = tableData
            lst.push(obj)
            output[city!] = lst
            console.log(`scraped ${tableData.length} hotel(s) data from ${area!},${city!}`)
            fs.writeFileSync(
                "output/data.json",
                JSON.stringify(output)
            );
        }     
    }
    await browser.close();
})();