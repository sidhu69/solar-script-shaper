// scripts/generate-android-icons.js
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

async function generateIcons() {
  for (const [folder, size] of Object.entries(sizes)) {
    const dir = path.join(RES_PATH, folder);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    await sharp(ICON_PATH)
      .resize(size, size)
      .toFile(path.join(dir, "ic_launcher.png"));

    await sharp(ICON_PATH)
      .resize(size, size)
      .toFile(path.join(dir, "ic_launcher_round.png"));
  }
  console.log("Android icons generated successfully!");
}

generateIcons().catch(err => {
  console.error(err);
  process.exit(1);
});
