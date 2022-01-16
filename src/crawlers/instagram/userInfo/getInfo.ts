import { Page } from 'puppeteer';

export const getInfo = async (page: Page, url: string) => {
    await page.goto(url, {
        waitUntil:'domcontentloaded'
    });
    
    const username = await page.$eval(
        'section.wW3k- > div.QGPIr > h1',
        (name) => {
            console.log(name.textContent)
            return name.textContent;
        }
    );
    const profession = await page.$eval(
        'section.wW3k- > div.QGPIr > div.qF0y9 > span',
        (name) => {
            console.log(name.textContent)
            return name.textContent;
        }
    );

    const posts = await page.$eval(
        'section.wW3k- > ul.k9GMp  > li.Y8-fY  > span > span',
        (name) => {
            console.log(name.textContent)
            return name.textContent;
        }
    );

    const followersAndFollowing = await page.$$eval(
        'section.wW3k- > ul.k9GMp  > li.Y8-fY  > a.-nal3 > span',
        (name) => {
            return name.map((e) => e.textContent)
        }
    );

    const followers = followersAndFollowing[0];
    const following = followersAndFollowing[1];

    return { username, profession, posts, followers, following };
}