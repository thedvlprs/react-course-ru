import React from 'react'; // подключение библиотеки React
// испорт пакета prop-types удален, так как в этом файле prop-types не исп-ся
import { Add } from './components/Add'; // ./ = текущая директория
import { News } from './components/News';
// удален импорт newsData
import './App.css'; // подключение файла стилей

class App extends React.Component {
  state = {
    news: null, // было newsData
    isLoading: false, // статус для манипуляций "прелоадером" ("Загружаю..." в нашем с лучае)
  };
  static getDirevedStateFromProps(props, state) {
    let nextFilteredNews

    // смотрим в state.news (ранее смотрели в props)
    // и проверяем, чтобы не клонировать null
    // например, в момент первой отрисовки
    if (Array.isArray(state.news)) {
      nextFilteredNews = [...state.news]

      nextFilteredNews.forEach((item, index) => {
        if (item.bigText.toLowerCase().indexOf('pubg') !== -1) {
          item.bigText = 'СПАМ'
        }
      })

      return {
        filteredNews: nextFilteredNews,
      }
    }

    return null
  }
  componentDidMount() {
    // ставим isLoading true, т.е. запрос за данными начался
    // фактически он начнется в строке с fetch, но на переход от одной строки к другой пройдут миллисекунды
    this.setState({ isLoading: true })
    fetch('https://react-course-ru.now.sh/data/newsData.json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTimeout(() => {
          // запрос завершился успешно, делаем isLoading: false
          // в news кладем пришедшие данные
          this.setState({ isLoading: false, news: data });
        }, 1000); // изменили таймер на 1000, чтобы не ждать долго
      });
  }

  handleAddNews = data => {
    const nextNews = [data, ...this.state.news]
    this.setState({ news: nextNews })
  }
 
  render() {
    const { news, isLoading } = this.state // все необходимое взяли из state 

    return (
      <React.Fragment>
        <Add onAddNews={this.handleAddNews} />
        <h3>Новости</h3>
        {isLoading && <p>Загружаю...</p>}
        {Array.isArray(news) && <News data={news} />}
      </React.Fragment>
    );
  }
}

// скопировано все кроме ReactDOM.render

// добавился export
export default App;
