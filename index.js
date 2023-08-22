const key = "WkcDSPA2k-nzBF_vIsJSKJpuqDnS0DukIMDf_CLOYig";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("next-btn");

let inputData = "";
let page = 1;

async function searchImg() {
    try {
        inputData = inputEl.value;
        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${key}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }
        
        const data = await response.json();

        if (data.results.length === 0) {
            throw new Error("No images found for the search query.");
        }
        
        const results = data.results;
        
        if (page === 1) {
            searchResults.innerHTML = "";
        }
        
        results.map((result) => {
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add("search-result");
            const image = document.createElement('img');
            image.src = result.urls.small;
            image.alt = result.alt_description;
            const imageLink = document.createElement('a');
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.textContent = result.alt_description;

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);
            searchResults.appendChild(imageWrapper);
        });

        page++;
        if (page > 1) {
            showMore.style.display = "block";
        }
    } catch (error) {
        console.error("An error occurred:", error);
        if (error.message === "No images found for the search query.") {
            alert("Image not found for the given search query.");
        }
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImg();
});
