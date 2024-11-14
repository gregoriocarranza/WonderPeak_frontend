export const isValidImage = (source: string): boolean => {
  const regex =
    /^(https?:\/\/)?([\w.-]+)\.([a-z.]{2,6})(\/[\w.-]+)*\/?([\w-]+\.(jpg|jpeg|png|gif|bmp|webp|svg))$/i;
  return regex.test(source);
};
