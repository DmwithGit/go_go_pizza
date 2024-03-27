import {hideLoader, showLoader} from './loader.js'

export const getData = async(url) => {
    showLoader();
    try {
        const response = await fetch(url);

        // fetch('https://confused-vanilla-guide.glitch.me/api/products');             // adress server

        if (!response.ok) {
            throw new Error('Failed to fetch pizza products');
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching pizza products: ${error}`)
        return [];
    } finally {
        hideLoader()
    }
}






