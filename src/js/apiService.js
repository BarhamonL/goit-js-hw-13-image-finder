`use strict`;

const baseUrl = 'https://pixabay.com/api/';
const apiKey = '?key=16324952-34095f6b5c046a6325f3315db';
const countImage = '&per_page=12';

export default {
  page: 1,
  query: '',
  featchGallery() {
    const requestParams = `&image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}`;
    return fetch(baseUrl + apiKey + requestParams + countImage)
      .then(response => response.json())
      .then(parsedResponse => {
        this.incrementPage();
        return parsedResponse.hits;
      });
  },
  get searchQuery() {
    return this.query;
  },
  set searchQuery(string) {
    this.query = string;
  },
  incrementPage() {
    this.page += 1;
  },
  resetPage() {
    this.page = 1;
  },
};
