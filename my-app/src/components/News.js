import React from 'react';
import PropTypes from 'prop-types'
import { Article } from './Article'; // идти в components не нужно, так как мы уже в этой директории

class News extends React.Component {
  // удалили старое состояние counter: 0 (старый ненужный код)
  renderNews = () => {
    const { data } = this.props;
    let newsTemplate = null;

    if (data.length) {
      // если новости есть, пробегись map'ом
      newsTemplate = data.map(function (item) {
        return <Article key={item.id} data={item} />;
      });
    } else {
      // если новостей нет - сохрани в переменную параграф
      newsTemplate = <p>К сожалению, новостей нет.</p>;
    }

    return newsTemplate;
  };

  render() {
    const { data } = this.props;

    return (
      <div className='news'>
        {this.renderNews()}
        {
          /* добавили onClick */
          data.length ? (
            <strong className={'news__count'}>
              Всего новостей: {data.length}
            </strong>
          ) : null
        }
      </div>
    );
  }
}

// добавили propTypes
// propTypes (с маленькой буквы) = свойство News
News.propTypes = {
  data: PropTypes.array.isRequired, // PropTypes (с большой буквы) = библиотека prop-ty
};

export { News }