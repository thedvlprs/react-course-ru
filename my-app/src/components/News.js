import React from 'react';
import PropTypes from 'prop-types'
import { Article } from './Article'; // идти в components не нужно, так как мы уже в этой директории

class News extends React.Component {
  state = {
    filteredNews: this.props.data,
  }

  componentWillReceiveProps(nextProps) {
    let nextFilteredNews = [...nextProps.data]

    nextFilteredNews.forEach((item, index) => {
      if (item.bigText.toLowerCase().indexOf('pubg') !== -1) {
        item.bigText = 'СПАМ'
      }
    })

    this.setState({ filteredNews: nextFilteredNews})
  }
  
  // удалили старое состояние counter: 0 (старый ненужный код)
  renderNews = () => {
    const { filteredNews } = this.state; // используем состояние
    let newsTemplate = null;

    if (filteredNews.length) {
      // везде data заменена на filteredNews
      newsTemplate = filteredNews.map(function (item) {
        return <Article key={item.id} data={item} />;
      });
    } else {
      // если новостей нет - сохрани в переменную параграф
      newsTemplate = <p>К сожалению, новостей нет.</p>;
    }

    return newsTemplate;
  };

  render() {
             const { filteredNews } = this.state; // аналогично, используем состояние

             return (
               <div className='news'>
                 {this.renderNews()}
                 {
                   /* добавили onClick */
                   filteredNews.length ? (
                     <strong className={'news__count'}>
                       Всего новостей: {filteredNews.length}
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