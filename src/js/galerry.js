`use strict`;
import apiService from './apiService';
import galleryListTemplate from '../template/gallery-list-template.hbs';
import spinner from './spinner';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import lightbox from './basicLightbox';

const refs = {
  searchForm: document.querySelector('#search-form'),
  articleList: document.querySelector('.gallery'),
  loadMore: document.querySelector('#load-more'),
  spinner: document.querySelector('#spinner'),
};

refs.searchForm.addEventListener('submit', searchFormSubmitHandler);
refs.loadMore.addEventListener('click', loadMoreBtnHandler);
refs.articleList.addEventListener('click', imageClickHandler);
toastr.options = {
  closeButton: true,
  progressBar: true,
  timeOut: '2000',
};
function imageClickHandler(e) {
  if (e.target.nodeName === 'IMG') {
    const imgClicked = e.target;
    const largeImage = imgClicked.dataset.source;
    lightbox.showLargeImage(largeImage);
  }
}
function searchFormSubmitHandler(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const input = form.elements.query;
  clearListItem();
  apiService.resetPage();
  apiService.searchQuery = input.value;
  fetchImages();
  refs.loadMore.classList.remove('is-hidden');
  input.value = '';
}
function loadMoreBtnHandler() {
  fetchImages();
  scroll();
}
function fetchImages() {
  spinner.show();
  apiService
    .featchGallery()
    .then(items => {
      spinner.hide();
      if (items.length < 1) {
        refs.loadMore.classList.add('is-hidden');
        toastr.error(`No results were found for your request.`);
      } else {
        toastr.success(`12 hits added to your request!`);

        insertListItems(items);
      }
    })
    .catch(error => {
      toastr.error(`Error!!!`);
      console.warn(error);
    });
}
function insertListItems(items) {
  const galleryListMarkup = galleryListTemplate(items);
  refs.articleList.insertAdjacentHTML('beforeend', galleryListMarkup);
}
function clearListItem() {
  refs.articleList.innerHTML = '';
}
function scroll() {
  setTimeout(() => {
    window.scrollTo({
      top: +window.scrollY + window.innerHeight,
      behavior: 'smooth',
    });
  }, 300);
}
