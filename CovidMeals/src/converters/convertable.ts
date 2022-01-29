import fs from 'fs'
import path from 'path/posix'


const data = fs.readFileSync(path.resolve(__dirname,'../../output/data.json'))
// const data = fs.readFileSync(path.resolve(__dirname,'../../output/test.json'))


interface IArea{
    [key: string]: string[][]
}

interface ICities{
    [key: string]: IArea[]
}

const cities: ICities  = JSON.parse(data.toString())

let result = []
for(let city in cities){
    const areas = cities[city]
    for(let area in areas){
        const hotelLocations = areas[area]
        
        for(let hotelLocation in hotelLocations){
            const hotelNames = hotelLocations[hotelLocation]

            for(let hotelName in hotelNames){
                const details = hotelNames[hotelName]

                result.push({
                    City:city, 
                    HotelLocation:hotelLocation, 
                    Column0:details[0] || "", 
                    Column1:details[1] || "", 
                    column2:details[2] || "", 
                    column3:details[3] || "", 
                    column4:details[4] || "", 
                    column5:details[5] || "", 
                    column6:details[6] || "", 
                    column7:details[7] || "", 
                    column8:details[8] || "", 
                    column9:details[9] || "", 
                    column10:details[10] || "", 
                    column11:details[11] || "",
                    column12:details[12] || "", 
                    column13:details[13] || "", 
                    column14:details[14] || "", 
                    column15:details[15] || "", 
                    column16:details[16] || "", 
                    column17:details[17] || "",
                    column18:details[18] || "",
                    column19:details[19] || "",
                    column20:details[20] || "",
                    column21:details[21] || "",
                    column22:details[22] || "",
                    column23:details[23] || "",
                    column24:details[24] || "",
                    column25:details[25] || ""
                })
               
                fs.writeFileSync(
                    "output/convertable.json",
                    JSON.stringify(result)
                )
            }
        }       
    }
}