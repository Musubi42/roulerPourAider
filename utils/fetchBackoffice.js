// utils/fetchFromStrapi.ts
import axios from 'axios';
import fs from 'fs';
import path from 'path';

async function downloadImage(url, imagePath) {
  const response = await axios({
    url,
    responseType: 'stream',
  });
  return new Promise((resolve, reject) => {
    response.data.pipe(fs.createWriteStream(imagePath))
      .on('finish', () => resolve())
      .on('error', e => reject(e));
  });
}

export async function fetchFromStrapi(url, strapiToken) {
  const strapiBaseUrl = `https://backoffice.roulerpouraider.fr`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${strapiToken}`,
  };

  const response = await axios.get(url, { headers });
  const data = response.data;

  console.log("fetchBackoffice", data.data);

  // Iterate over all data objects and check for image URLs
  const promises = data.data.map(async item => {
    if (item.attributes.image) {
      const imageUrl = strapiBaseUrl + item.attributes.image.data.attributes.url;
      console.log(imageUrl);
      const imageName = path.basename(imageUrl);
      console.log(imageName);
      const imagePath = path.resolve(__dirname, '/public/backoffice', imageName);
      console.log("imagePath", imagePath);
      await downloadImage(imageUrl, imagePath);
      item.attributes.image.data.attributes.url = `/images/${imageName}`;
    }
    console.log("item", item);
    return item;
  });

  return Promise.all(promises);
}
