export const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max) + 1;
}

export const getLastPartOfUrl = (url: string): string => {
    const decomposedURL = url.split('/').filter(e => e)
    return decomposedURL[decomposedURL.length - 1]
}
    
export const delay = (ms:number) => new Promise(resolve => setTimeout(resolve, ms))

