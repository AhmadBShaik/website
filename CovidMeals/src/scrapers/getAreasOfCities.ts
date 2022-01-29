
import { Page } from 'puppeteer';

export const getAreasOfCities = async (page: Page, id: string) => {
    const areasOfCities = await page.$$eval(
        `#${id}_list > option`,
        (select) => {
            return select
                    .map(e => e.getAttribute('value'))
                    .filter(e => e);
        }
    )

    return areasOfCities;
    
}