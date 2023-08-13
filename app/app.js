const accessKey = '25ZEPj277deeUTSpRTEFLsFWt-IG6fEXAm7bPIno0u8';

const form = document.querySelector('.form'),
    searchInput = document.querySelector('.search-input'),
    searchBtn = document.querySelector('.search-btn'),
    searchResults = document.querySelector('.search-results');
  console.log(searchInput.value)
let inputData = '';
let page = 1;

async function searchImage() {
    inputData = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        searchResults.innerHTML = '';
    }

    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('result');
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = '_blank';
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++;
    
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    page = 1;
    searchImage();
})
