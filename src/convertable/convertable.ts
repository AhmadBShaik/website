import fs from 'fs'

import result from '../output/result.json'
import { detectEmailAddress, detectPhoneNumber } from '../utilities/utils'

let convertable = [...result];

for(let e in convertable){
    let res = ""

    if(
        detectEmailAddress(convertable[e]['Contact Details']) !== null &&
        detectPhoneNumber(convertable[e]['Contact Details']) !== null){
            res += detectEmailAddress(convertable[e]['Contact Details']) +"\n"
            res += detectPhoneNumber(convertable[e]['Contact Details'])

     }else{
         if(detectEmailAddress(convertable[e]['Contact Details']) !==null)
         res += detectEmailAddress(convertable[e]['Contact Details']) 
     
         if(detectPhoneNumber(convertable[e]['Contact Details']) !==null)
         res += detectPhoneNumber(convertable[e]['Contact Details'])
     }
    convertable[e]['Contact Details'] = res
}

fs.writeFileSync(
    './src/output/convertable.json',
    JSON.stringify(convertable)
);
