import { Page } from 'puppeteer';

export const getInfo = async (page: Page, url: string) => {
    await page.goto(url, {
        waitUntil:'load'
    });
    let username;
    let profession;
    let posts;
    let followersAndFollowing ;
    let desc;
    try{
        username = await page.$eval(
            'section.wW3k- > div.QGPIr > h1',
            (name) => {
                console.log(name.textContent)
                return name.textContent;
            }
        );
    }catch{
        username = "";
    }

 
    try{

        profession = await page.$eval(
            'section.wW3k- > div.QGPIr > div.qF0y9 > span',
            (name) => {
                console.log(name.textContent)
                return name.textContent;
            }
        );
    }catch{
        profession = ""
    }

 
    try{
        posts = await page.$eval(
            'section.wW3k- > ul.k9GMp  > li.Y8-fY  > span > span',
            (name) => {
                console.log(name.textContent)
                return name.textContent;
            }
        );
    }catch{
        posts = "0"
    }

 
    try{
        followersAndFollowing = await page.$$eval(
            'section.wW3k- > ul.k9GMp  > li.Y8-fY  > a.-nal3 > span',
            (name) => {
                return name.map((e) => e.textContent)
            }
        );
    }catch{
        followersAndFollowing = ["0", "0"]
    }
 
 
    try{
        desc = await page.$eval(
            'section.wW3k- > div.QGPIr > span',
            (content) => {
                return content.textContent
            }
        )
    }catch{
        desc = ""
    }
    
    const followers = followersAndFollowing[0];
    const following = followersAndFollowing[1];

    return { username, profession, posts, followers, following, desc };
}