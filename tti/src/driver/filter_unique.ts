import fs from 'fs'

import { removeDuplicateInstagramLinks } from "../utilities/utils";

const filteredData = removeDuplicateInstagramLinks();

fs.writeFileSync(
    './src/output/filteredLinks.json',
    JSON.stringify(filteredData)
);
