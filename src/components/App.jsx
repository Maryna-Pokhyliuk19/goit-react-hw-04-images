import { Component } from 'react';
import { SearchBar } from './Searchbar/SearchBar';
import { ToastContainer } from 'react-toastify';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

export class App extends Component {
  state = {
    search: '',
  };

  handleFormSubmit = search => {
    this.setState({ search });
  };
  render() {
    return (
      <div>
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGalleryItem search={this.state.search} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
