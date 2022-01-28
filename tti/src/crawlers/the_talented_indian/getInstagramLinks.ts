import { Page } from 'puppeteer';

export const getInstagramLinks = async (page: Page, url: string) => {
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
