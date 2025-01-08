const searchForm = document.querySelector('#search-form');
const searchBox = document.querySelector('#search-box');
const searchResult = document.querySelector('#search-result');
const showMoreBtn = document.querySelector('#show-more-btn');

const accessKey = "qvGwc6Bheo6hgCrRKp8SjwHTxNpneVXSmLWZNoov47o";

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value; 
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    
    if (page === 1) {
        searchResult.innerHTML = '';
    }

   
    if (data.results.length > 0) {
        data.results.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = image.urls.small;
            imgElement.alt = image.alt_description || 'Image';
            imgElement.classList.add('search-image'); 
            searchResult.appendChild(imgElement);
        });
    } else {
        searchResult.innerHTML = 'No results found.';
    }

   
    if (data.total_pages > page) {
        showMoreBtn.style.display = 'block';
    } else {
        showMoreBtn.style.display = 'none';
    }
}


searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1; 
    searchImages();
});


showMoreBtn.addEventListener('click', () => {
    page++; 
    searchImages();
});
