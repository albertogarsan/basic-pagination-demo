const list = document.getElementById('list');
const pages = document.querySelector('.pages');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let startIndex = 0;
const itemsPerPage = 3;

const names = [
    "Ana",
    "Luis",
    "Carlos",
    "María",
    "Sara",
    "Pedro",
    "Lucía",
    "Jorge",
    "Elena",
    "David"
];

function renderList() {
    list.innerHTML = '';

    const itemsToShow = names.slice(startIndex, startIndex + itemsPerPage);

    itemsToShow.forEach(name => {
        const li = document.createElement('li');
        li.textContent = name;
        list.appendChild(li);
    });
}

function renderNumberedPages() {
    pages.innerHTML = '';

    const totalPages = Math.ceil(names.length / itemsPerPage);

    for (let page = 1; page <= totalPages; page++) {
        const li = document.createElement('li');

        li.textContent = page;

        li.addEventListener('click', () => {
            startIndex = (page - 1) * itemsPerPage;
            renderList();
            updatePageIndicator();
        });

        pages.appendChild(li);
    }
}

function updatePageIndicator() {
    const pageItems = pages.querySelectorAll('li');
    const currentPage = Math.floor(startIndex / itemsPerPage) + 1;

    pageItems.forEach((item, index) => {
        const pageNumber = index + 1;
        if (pageNumber === currentPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    updateButtonStates();
}

function updateButtonStates() {
    prevButton.disabled = startIndex < itemsPerPage;
    nextButton.disabled = startIndex + itemsPerPage >= names.length;
}

nextButton.addEventListener('click', () => {
    if (startIndex + itemsPerPage < names.length) {
        startIndex = startIndex + itemsPerPage;
        renderList();
        updatePageIndicator();
    }
})

prevButton.addEventListener('click', () => {
    if (startIndex - itemsPerPage >= 0) {
        startIndex = startIndex - itemsPerPage;
        renderList();
        updatePageIndicator();
    }
})

// Initial render
renderList();
renderNumberedPages();
updatePageIndicator();
updateButtonStates();
