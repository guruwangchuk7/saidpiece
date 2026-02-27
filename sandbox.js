import fs from 'fs';

let code = fs.readFileSync('src/data/products.js', 'utf-8');

const imports = `import img1 from '../assets/store/storeiteams/Wardrobe_accessories_b2.0_series_atmosphere_2_header-1920x901.jpg';
import img2 from '../assets/store/storeiteams/chair.jpg';
import img3 from '../assets/store/storeiteams/interiordesing.jpg';
import img4 from '../assets/store/storeiteams/pexels-pixabay-271795.jpg';

`;

// Replace unplash urls with a rotation of img1, img2, img3, img4
let imgIndex = 1;
code = code.replace(/'https:\/\/images\.unsplash\.com\/[^']+'/g, () => {
    const replacement = `img${imgIndex}`;
    imgIndex = imgIndex >= 4 ? 1 : imgIndex + 1;
    return replacement;
});

fs.writeFileSync('src/data/products.js', imports + code);
