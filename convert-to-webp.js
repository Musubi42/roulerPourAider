const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directory = './public/1ere-edition'; // Change this to your images directory

fs.readdir(directory, (err, files) => {
  if (err) {
    console.error("Could not list the directory.", err);
    process.exit(1);
  }

  files.forEach((file) => {
    const filePath = path.join(directory, file);
    const parsedPath = path.parse(filePath);

    // Only proceed if the file is an image
    if (parsedPath.ext === '.jpg' || parsedPath.ext === '.jpeg' || parsedPath.ext === '.png') {
      const outputPath = path.join(parsedPath.dir, `${parsedPath.name}.webp`);
      // console.log(outputPath);
      sharp(filePath)
        .webp({ quality: 80 }) // You can adjust the quality
        .toFile(outputPath, (err) => {
          if (err) {
            console.error(`Error converting ${file}`, err);
          } else {
            console.log(`Successfully converted ${file} to WebP`);
          }
        });
    }
  });
});
