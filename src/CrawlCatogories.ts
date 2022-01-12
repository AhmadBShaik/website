import puppeteer from 'puppeteer'
import { Constants } from './Constants'

export async function CrawlCategories(categoryURL: string){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(categoryURL);
    console.log(categoryURL);

    browser.close();
}