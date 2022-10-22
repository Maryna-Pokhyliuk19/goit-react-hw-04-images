import { Component } from 'react';
import { SearchBar } from './Searchbar/SearchBar';

// const BASE_URL = 'https://pixabay.com/api/';
// const KEY = '29689577-6dc67b4d31de18bcd5a01035c';

export class App extends Component {
  componentDidMount() {
    fetch(
      `https://pixabay.com/api/?q=cat&page=1&key=29689577-6dc67b4d31de18bcd5a01035c&image_type=photo&orientation=horizontal&per_page=12`
        .then(res => res.json())
        .then()
    );
  }
  render() {
    return (
      <div>
        <SearchBar />
      </div>
    );
  }
}
