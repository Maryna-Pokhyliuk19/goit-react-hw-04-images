import { Component } from 'react';
import { toast } from 'react-toastify';
import css from './SearchBar.module.css';
import { ReactComponent as SearchIcon } from '../../icons/searchIcon.svg';

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
      <header className={css.searchbar}>
        <form onSubmit={this.handleSubmit} className={css.form}>
          <button type="submit" className={css.button}>
            <SearchIcon width="30" height="30" fill="red" />
            <span className={css.buttonLabel}>Search</span>
          </button>

          <input
            className={css.input}
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
