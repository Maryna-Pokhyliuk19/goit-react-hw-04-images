import css from './Loader.module.css';

export const Loader = ({ onClick }) => {
  return (
    <button className={css.button} onClick={onClick}>
      Load more
    </button>
  );
};
