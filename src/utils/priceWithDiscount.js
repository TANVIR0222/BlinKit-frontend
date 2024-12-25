export const pricewithDiscount = (price,dis = 1)=>{
    if (dis === 0) return price;

    const discountAmount = Math.ceil((Number(price) * Number(dis)) / 100);
    return price - discountAmount;
}