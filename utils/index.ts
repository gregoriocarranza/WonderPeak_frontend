export const isValidImage = (source: string): boolean => {
  const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/;
  const base64ImageRegex = /^data:image\/(png|jpeg|jpg|gif|svg\+xml);base64,[A-Za-z0-9+/=]+$/;
  return urlRegex.test(source) || base64ImageRegex.test(source);
};
