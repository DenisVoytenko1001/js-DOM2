let currentPage = 1;
const limit = 4;


const galleryContainer = document.getElementById('gallery');
const btnLoadMore = document.getElementById('loadMore');      
const btnClear = document.getElementById('clearGallery');      
const btnRemoveLast = document.getElementById('removeLast');   
const btnReverse = document.getElementById('reverseGallery');  

async function fetchImages() {
    try {
        
        const response = await fetch(`https://picsum.photos/v2/list?page=${currentPage}&limit=${limit}`);
        
        if (!response.ok) {
            throw new Error('Помилка завантаження даних');
        }

        const data = await response.json();
        renderGallery(data);
        
       
        currentPage++;
    } catch (error) {
        console.error('Сталася помилка:', error);
        alert('Не вдалося завантажити картинки. Перевірте консоль (F12).');
    }
}

function renderGallery(images) {
    images.forEach(image => {
        const imgElement = document.createElement('img');
        
        imgElement.src = `https://picsum.photos/id/${image.id}/400/300`; 
        
        imgElement.alt = `Image by ${image.author}`;
        imgElement.classList.add('gallery-item'); 
        
        galleryContainer.appendChild(imgElement);
    });
}

function clearGallery() {
    galleryContainer.innerHTML = '';
    currentPage = 1; 
}

function removeLastImage() {
    if (galleryContainer.lastElementChild) {
        galleryContainer.removeChild(galleryContainer.lastElementChild);
    } else {
        alert('Галерея порожня!');
    }
}

function reverseGallery() {
    const images = Array.from(galleryContainer.children);
    
    if (images.length <= 1) return;

    images.reverse();

    galleryContainer.innerHTML = '';
    images.forEach(img => galleryContainer.appendChild(img));
}

if (btnLoadMore && btnClear && btnRemoveLast && btnReverse) {
    btnLoadMore.addEventListener('click', fetchImages);
    btnClear.addEventListener('click', clearGallery);
    btnRemoveLast.addEventListener('click', removeLastImage);
    btnReverse.addEventListener('click', reverseGallery);
} else {
    console.error("Помилка: Не знайдено кнопки в HTML. Перевірте ID.");
}

window.addEventListener('DOMContentLoaded', fetchImages);
