
import { Page } from "puppeteer";

export const getTableData =async (page: Page) => {

    const result = await page.$$eval('#people tr', rows => {
        return Array.from(rows, row => {
          const columns = row.querySelectorAll('td');
          return Array.from(columns, column => column.innerText);
        });
      });
      
    return result;
}