export const getMediaType = (uri: string): string => {
  const sanitizedUri = uri.split("://").pop();

  if (!sanitizedUri) {
    throw new Error("El URI no es válido.");
  }

  const extension = sanitizedUri.split(".").pop()?.toLowerCase();

  const mimeTypes: { [key: string]: string } = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    bmp: "image/bmp",
    webp: "image/webp",
    tiff: "image/tiff",
    mp4: "video/mp4",
    mov: "video/quicktime",
    avi: "video/x-msvideo",
    mkv: "video/x-matroska",
    webm: "video/webm",
    ogg: "video/ogg",
  };

  if (!extension || !mimeTypes[extension]) {
    console.warn(`Extensión desconocida: ${extension || "ninguna"}`);
    return "application/octet-stream"; // Tipo predeterminado
  }

  return mimeTypes[extension];
};
