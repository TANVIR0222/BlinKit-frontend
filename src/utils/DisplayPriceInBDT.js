export const DisplayPriceInBDT = (price)=>{
    return Math.trunc(price * 120).toLocaleString('en-IN');
}