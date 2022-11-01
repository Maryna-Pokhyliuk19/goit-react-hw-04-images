import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  image: { webformatURL, largeImageURL, tags },
}) => {
  const [showModal, setShowModal] = useState(false);

  const onToggleModal = () => {
    setShowModal(state => !state);
  };

  return (
    <>
      <li className={css.galleryItem}>
        <img
          className={css.galleryItemImage}
          src={webformatURL}
          alt={tags}
          onClick={onToggleModal}
        />
      </li>
      {showModal && (
        <Modal onClose={onToggleModal} image={largeImageURL} alt={tags} />
      )}
    </>
  );
};
