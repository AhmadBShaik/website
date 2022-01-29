
import { Page } from 'puppeteer';

export const getCities = async (page: Page) => {
    const citiesValues = await page.$$eval(
        '#city_list > option',
        (select) => {
            return select
                    .map(e => e.getAttribute('value'))
                    .filter(e => e);
        }
    )

    const cities = await page.$$eval(
        '#city_list > option',
        (select) => {
            return select
                    .map(e => e.textContent)
                    .filter(e => e);
        }
    )
    cities.shift()
    
    const citiesInfo = cities.map((city, cityValue) => {

        return [citiesValues[cityValue], city] 

    })
    return citiesInfo;
    
}