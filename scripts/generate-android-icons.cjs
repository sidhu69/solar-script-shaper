// scripts/generate-android-icons.cjs
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const ICON_PATH = path.resolve("resources/icon.png");
const RES_PATH = path.resolve("android/app/src/main/res");

// Android mipmap sizes
const sizes = {
  "mipmap-mdpi": 48,
  "mipmap-hdpi": 72,
  "mipmap-xhdpi": 96,
  "mipmap-xxhdpi": 144,
  "mipmap-xxxhdpi": 192
};

(async () => {
  for (const [folder, size] of Object.entries(sizes)) {
    const dir = path.join(RES_PATH, folder);
    if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });

    await sharp(ICON_PATH)
      .resize(size, size)
      .toFile(path.join(dir, "ic_launcher.png"));

    await sharp(ICON_PATH)
      .resize(size, size)
      .toFile(path.join(dir, "ic_launcher_round.png"));
  }
  console.log("Android icons generated successfully!");
})();
