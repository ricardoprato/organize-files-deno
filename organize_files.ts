import { ensureDir, move } from "https://deno.land/std@0.177.0/fs/mod.ts";

const home = Deno.env.get("HOME");
const folderPath = `${home}/Downloads`;

const fileTypes = new Map<string, string>([
  ["jpg", "images"],
  ["jpeg", "images"],
  ["png", "images"],
  ["gif", "images"],
  ["bmp", "images"],
  ["tif", "images"],
  ["tiff", "images"],
  ["mp4", "videos"],
  ["mkv", "videos"],
  ["flv", "videos"],
  ["avi", "videos"],
  ["mov", "videos"],
  ["m4v", "videos"],
  ["mpeg", "videos"],
  ["mpg", "videos"],
  ["swf", "videos"],
  ["wmv", "videos"],
  ["asf", "videos"],
  ["3gp", "videos"],
  ["ram", "videos"],
  ["mp3", "audios"],
  ["wav", "audios"],
  ["aac", "audios"],
  ["aif", "audios"],
  ["aiff", "audios"],
  ["mpa", "audios"],
  ["m4a", "audios"],
  ["wma", "audios"],
  ["doc", "documents"],
  ["docx", "documents"],
  ["pdf", "documents"],
  ["ai", "Adobe Illustrator"],
  ["psd", "Adobe Photoshop"],
  ["indd", "Adobe InDesign"],
  ["xls", "Adobe Acrobat"],
  ["xlsx", "Adobe Acrobat"],
  ["doc", "Microsoft Office"],
  ["docx", "Microsoft Office"],
  ["aep", "After Effects"],
  ["aepx", "After Effects"],
  ["aet", "After Effects"],
  ["zip", "Comprimido"],
  ["rar", "Comprimido"],
  ["rar5", "Comprimido"],
  ["7z", "Comprimido"],
  ["ace", "Comprimido"],
  ["r00", "Comprimido"],
  ["bz2", "Comprimido"],
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
