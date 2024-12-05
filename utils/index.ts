import i18n from "@/languages";
import { images } from "@/constants";

export const isValidImage = (source: string): boolean => {
  const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/;
  const base64ImageRegex = /^data:image\/(png|jpeg|jpg|gif|svg\+xml);base64,[A-Za-z0-9+/=]+$/;
  return urlRegex.test(source) || base64ImageRegex.test(source);
};

export const capitalizeWords = (str: string): string => {
  if (!str) return "";
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const isValidEmail = (email: string): boolean => {
  const REGEX_EMAIL = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

  return REGEX_EMAIL.test(email)
}

export const formatDate = (isoString: string): string => {
  if (!isoString) return "";
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() returns 0-11
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const getGamificationImage = (initialLevel: string | undefined) => {
  const { gamification1, gamification2, gamification3, gamification } = images;
  const level = Number(initialLevel)
  if (!level || level > 4 || level < 1) return;
  const levelsImages = [
    gamification1,
    gamification2,
    gamification3,
    gamification,
  ];
  return levelsImages[level - 1];
};

export const genderData = [
  { label: i18n.t("female"), value: "female" },
  { label: i18n.t("male"), value: "male" },
  { label: i18n.t("other"), value: "other" },
];