import output from '../output/data.json'

export const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max) + 1;
}

export const getLastPartOfUrl = (url: string): string => {
    const decomposedURL = url.split('/').filter(e => e)
    return decomposedURL[decomposedURL.length - 1]
}
    
export const delay = (ms:number) => new Promise(resolve => setTimeout(()=>resolve(" "), ms))


export const removeDuplicateInstagramLinks = ()=> {
    let uniqueInstagramLinks : {[key:string] : string} = {};

    const data: {
        [category: string]:{
            [innerCategory: string]: string[]
        }
    } = output;

    let count = 0;
    for(let category in data){
        const innerCategories: { [ic:string]:string[] } = data[category];
        for(let innerCategory in innerCategories){
            const instagramLinks = innerCategories[innerCategory]
            for(let instagramLink of instagramLinks){
                count += 1;
                if(!uniqueInstagramLinks.hasOwnProperty(instagramLink)){
                    uniqueInstagramLinks[instagramLink] = category;
                }
            }
        }
    }
    return uniqueInstagramLinks;
};

export const getInstaHandle = (url:string) => {
    const decomposedURL = url.split("www.instagram.com").filter(e => e);
    const handleWithSlashes = decomposedURL[decomposedURL.length - 1]
    return handleWithSlashes.substring(1,handleWithSlashes.length-1);
}


export const detectEmailAddress = (desc:string) => {
    return desc.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/gi)
}

export const detectPhoneNumber = (desc:string) => {
    return desc.match(/(?:[-+() ]*\d){10,13}/g)
}