export const FormatAmount = (amount: number) => {
  let result = "";
  let counter = 0;
  while (amount !== 0) {
    if (counter === 3) {
      result = "." + result;
      counter = 0;
    }
    result = (amount % 10) + result;
    amount = Math.floor(amount / 10);
    counter++;
  }

  return result + "đ";
};
