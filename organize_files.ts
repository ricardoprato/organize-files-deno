import { ensureDir, move } from "https://deno.land/std@0.177.0/fs/mod.ts";

const folderPath = Deno.cwd();

const fileTypes = new Map<string, string>([
  ["jpg", "IMAGES"],
  ["jpeg", "IMAGES"],
  ["png", "IMAGES"],
  ["gif", "IMAGES"],
  ["bmp", "IMAGES"],
  ["tif", "IMAGES"],
  ["tiff", "IMAGES"],
  ["heic", "IMAGES"],
  ["mp4", "VIDEOS"],
  ["mkv", "VIDEOS"],
  ["flv", "VIDEOS"],
  ["avi", "VIDEOS"],
  ["mov", "VIDEOS"],
  ["m4v", "VIDEOS"],
  ["mpeg", "VIDEOS"],
  ["mpg", "VIDEOS"],
  ["swf", "VIDEOS"],
  ["wmv", "VIDEOS"],
  ["asf", "VIDEOS"],
  ["3gp", "VIDEOS"],
  ["ram", "VIDEOS"],
  ["mp3", "AUDIOS"],
  ["wav", "AUDIOS"],
  ["aac", "AUDIOS"],
  ["aif", "AUDIOS"],
  ["aiff", "AUDIOS"],
  ["mpa", "AUDIOS"],
  ["m4a", "AUDIOS"],
  ["wma", "AUDIOS"],
  ["pdf", "PDF"],
  ["ai", "Adobe Illustrator"],
  ["eps", "Adobe Illustrator"],
  ["psd", "Adobe Photoshop"],
  ["indd", "Adobe InDesign"],
  ["xls", "Office"],
  ["xlsx", "Office"],
  ["doc", "Office"],
  ["docx", "Office"],
  ["aep", "After Effects"],
  ["aepx", "After Effects"],
  ["aet", "After Effects"],
  ["zip", "ZIP"],
  ["rar", "ZIP"],
  ["rar5", "ZIP"],
  ["7z", "ZIP"],
  ["ace", "ZIP"],
  ["r00", "ZIP"],
  ["bz2", "ZIP"],
  ["ttf", "Fonts"],
  ["otf", "Fonts"],
  ["fnt", "Fonts"],
  ["eot", "Fonts"],
  ["woff", "Fonts"],
]);

const getFileType = (file: string) => {
  const extension = file.split(".").pop();
  return fileTypes.get(extension) || "unknown";
};

const organizeFiles = async () => {
  for await (const file of Deno.readDir(folderPath)) {
    if (file.isFile) {
      const fileType = getFileType(file.name);
      if (fileType !== "unknown") {
        const destination = `${folderPath}/${fileType}`;
        try {
          await ensureDir(destination);
          await move(
            `${folderPath}/${file.name}`,
            `${destination}/${file.name}`,
          );
          console.log(`Moved ${file.name} to ${destination}`);
        } catch (error) {
          console.error(error);
        }
      }
    }
  }
};
organizeFiles();
