// utils/fetchFromStrapi.ts
import axios from 'axios';
import fs from 'fs';
import path from 'path';

// Function to download images and save them locally
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

// Main function to fetch data from Strapi and handle images
export async function fetchFromStrapi(strapiToken) {
    const strapiBaseUrl = `https://backoffice.roulerpouraider.fr`;
    const endpointUrl = `${strapiBaseUrl}/api/partenaires?populate=*`;
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${strapiToken}`,
    };

    const response = await axios.get(endpointUrl, { headers });
    const data = response.data;

    console.log("Fetched data from backoffice:", data.data);

    // Iterate over all data objects and check for image URLs
    const promises = data.data.map(async item => {
        if (item.attributes.image && item.attributes.image.data) {
            const imageAttributes = item.attributes.image.data.attributes;
            const imageUrl = strapiBaseUrl + imageAttributes.url;
            const imageName = path.basename(imageAttributes.url);
            const imagePath = path.resolve('public/backoffice', imageName); // Ensure this path matches your static assets directory structure

            console.log("Downloading image:", imageUrl);
            await downloadImage(imageUrl, imagePath);

            // Update the item's image URL to point to the local version
            item.attributes.image.data.attributes.url = `/backoffice/${imageName}`;
        }
        return item;
    });

    return Promise.all(promises);
}
