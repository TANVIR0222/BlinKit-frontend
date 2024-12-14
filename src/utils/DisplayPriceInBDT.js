export const DisplayPriceInBDT = (price)=>{
    return Math.trunc(price * 110).toLocaleString('en-IN');
}