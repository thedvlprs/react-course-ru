import React from 'react'; // мы обязаны импортировать необх-ые пакеты в каждом файле
import PropTypes from 'prop-types'; // у Article это react & prop-types

// далее просто скопировано все что было, кроме последней строки

class Article extends React.Component {
  state = {
    visible: false,
  };

  handleReadMoreClick = (e) => {
    // добавили метод
    e.preventDefault();
    this.setState({ visible: true });
  };

  render() {
    const { author, text, bigText } = this.props.data;
    const { visible } = this.state;
    console.log('render', this); // добавили console.log();
    return (
      <div className='article'>
        <p className='news__author'>{author}:</p>
        <p className='news__text'>{text}</p>
        {!visible && (
          <a
            onClick={this.handleReadMoreClick}
            href='#readmore'
            className='news__readmore'
          >
            Подробнее
          </a>
        )}
        {
          /* если visible, то показывай */
          visible && <p className='news__big-text'>{bigText}</p>
        }
      </div>
    );
  }
}

Article.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired, // добавили id, это число, обязательно
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    bigText: PropTypes.string.isRequired,
  }),
};

export { Article } // именованный экспорт