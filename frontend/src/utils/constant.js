export function discountedPrice(item) {
    const discount = item.price * (1 - item.discountPercentage / 100);
    return Math.round(discount * 100) / 100; // round to 2 decimal places
}
