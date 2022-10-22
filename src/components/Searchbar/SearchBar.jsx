import { Component } from 'react';
import { toast } from 'react-toastify';

export class SearchBar extends Component {
  state = {
    search: '',
  };

  handleNameChange = event => {
    this.setState({ search: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.search.trim() === '') {
      return toast.error('Enter text');
    }

    this.props.onSubmit(this.state.search);
    this.setState({ search: '' });
  };

  render() {
    return (
      <header class="searchbar">
        <form onSubmit={this.handleSubmit} class="form">
          <button type="submit" class="button">
            <span class="button-label">Search</span>
          </button>

          <input
            class="input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            value={this.state.search}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}
