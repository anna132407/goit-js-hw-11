import axios from 'axios';

export default async function fetchImgPixabay(value, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '32931258-e5eb2d5c2d9c5c13ed4d71b3b';
  const filter = `?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
  return await axios.get(`${BASE_URL}${filter}`).then(response => response.data);
}