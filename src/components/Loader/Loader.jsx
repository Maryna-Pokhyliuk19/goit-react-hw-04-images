import css from './Loader.module.css';

export const Loader = ({ onClick, disabled }) => {
  return (
    <button className={css.button} onClick={onClick} disabled={disabled}>
      Load more
    </button>
  );
};
