import { useState } from 'react';
import { toast } from 'react-toastify';
import css from './SearchBar.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import 'react-toastify/dist/ReactToastify.css';

export const SearchBar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleNameChange = event => {
    setSearch(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (search.trim() === '') {
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

    onSubmit(search);
    setSearch('');
  };

  return (
    <header className={css.searchbar}>
      <form onSubmit={handleSubmit} className={css.form}>
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
          value={search}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
};
