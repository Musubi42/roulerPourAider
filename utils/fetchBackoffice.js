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
async function fetchFromStrapi() {
    const strapiBaseUrl = `https://backoffice.roulerpouraider.fr`;
    const endpointUrl = `${strapiBaseUrl}/api/partenaires?populate=*`;
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer eac6b6436d0eb19f3dd8b4468379bb3f18bbcbd986e343c6880e9343cd7a6da64558b704aeae8a6950c3bfa92f6407572f13c354296d83e13266f180a35ca81ef87de94cec4262d68876b72c43bcb2119eed8bf1f2c9d63454ca77a8fe1137b18ab6a4c0246dc087d2da99eddd09363dce0536fa84895db0a56e431bde687590`,
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

fetchFromStrapi();
