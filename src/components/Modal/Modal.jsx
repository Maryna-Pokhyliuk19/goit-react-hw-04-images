import { Component } from 'react';
import css from './Modal.modale.css';

export class Modal extends Component {
  state = {
    showModal: false,
  };

  onToggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { largeImageURL, tags } = this.props;

    return (
      <div className={css.overlay}>
        <div className={css.modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}
