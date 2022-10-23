import { Component } from 'react';
import { toast } from 'react-toastify';
import css from './SearchBar.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import 'react-toastify/dist/ReactToastify.css';

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
      toast.error('Enter text', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    this.props.onSubmit(this.state.search);
    this.setState({ search: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form onSubmit={this.handleSubmit} className={css.form}>
          <button type="submit" className={css.button}>
            <AiOutlineSearch style={{ width: 30, height: 30 }} />
            <span className={css.buttonLabel}>Search</span>
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.search}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}
