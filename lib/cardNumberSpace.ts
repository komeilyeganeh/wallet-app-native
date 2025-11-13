export const cardNumberSpace = (cardNumber: string) => {
    return cardNumber.replace(/\s/g, "").match(/.{1,4}/g)?.join(" ") || " ";
}