import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  onToggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const {
      image: { webformatURL, largeImageURL, tags },
    } = this.props;

    return (
      <>
        <li className={css.galleryItem}>
          <img
            className={css.galleryItemImage}
            src={webformatURL}
            alt={tags}
            onClick={this.onToggleModal}
          />
        </li>
        {this.state.showModal && (
          <Modal
            onClose={this.onToggleModal}
            image={largeImageURL}
            alt={tags}
          />
        )}
      </>
    );
  }
}
