import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '29689577-6dc67b4d31de18bcd5a01035c';

export const getImagesViaApi = async ({ search, page }) => {
  const options = {
    params: {
      q: search,
      page,
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  };
  const response = await axios.get('/', options);
  return response.data;
};
