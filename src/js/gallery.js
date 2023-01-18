import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import fetchImgPixabay from './fetchImgPixabay';
import { markupImg } from './imgMarkup';

const refs = {
  search: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreButn: document.querySelector('.load-more'),
}

function renderMarkupImg(array) {
  refs.gallery.insertAdjacentHTML('beforeend', markupImg(array))
}

let simpleLightbox = new SimpleLightbox('.photo-card a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
});

let page = 1;
let hits = 0;
let query = '';
let per_page = 40;

refs.search.addEventListener('submit', onSearchInFormSubmit);

async function onSearchInFormSubmit(e) {
    e.preventDefault();
    query = e.target.searchQuery.value;
    page = 1;

    if (query === '') {
        return;
        }

    const response = await fetchImgPixabay(query, page);
    hits = response.hits.length;
    
    if (response.totalHits > per_page) {
      refs.loadMoreButn.classList.remove('is-hidden');
    }
    else {
      refs.loadMoreButn.classList.add('is-hidden');
    }


    try {
        if (response.totalHits > 0) {
            Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
            refs.gallery.innerHTML = '';
            renderMarkupImg(response.hits);
            simpleLightbox.refresh();
      

            const { height: cardHeight } = document
                .querySelector('.gallery')
                .firstElementChild.getBoundingClientRect();

            window.scrollBy({
                top: cardHeight * -100,
                behavior: 'smooth',
            });
          
        }

      if (response.totalHits === 0) {
        refs.gallery.innerHTML = '';
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        refs.loadMoreButn.classList.add('is-hidden');
        }
      } catch (error) {
        console.log(error);
    }
}

refs.loadMoreButn.addEventListener('click', onClickLoadMoreButn);

async function onClickLoadMoreButn() {
    
    page += 1;
    const response = await fetchImgPixabay(query, page);
    renderMarkupImg(response.hits);
    simpleLightbox.refresh();
    hits += response.hits.length;

    if (hits === response.totalHits) {
    refs.loadMoreButn.classList.add('is-hidden');
    }
}
