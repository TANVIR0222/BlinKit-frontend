export const DisplayPriceInBDT = (price)=>{
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'BDT',
    }).format(price*100);
}