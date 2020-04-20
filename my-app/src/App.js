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
  handleAddNews = data => {
    // сначала мы формируем массив, на основе всего того, что уже было в новостях и кладем это все в новый массив + новую новость кладем в начало массива
    const nextNews = [data, ...this.state.news];

    // затем обновляем новый массив новостей в this.state.news
    this.setState({ news: nextNews });
  };
  componentDidMount() {
    // ставим isLoading true, т.е. запрос за данными начался
    // фактически он начнется в строке с fetch, но на переход от одной строки к другой пройдут миллисекунды
    this.setState({ isLoading: true })
    fetch('http://localhost:3000/data/newsData.json')
    .then(response => {
      return response.json()
    })
    .then(data => {
      setTimeout(() => {
        // запрос завершился успешно, делаем isLoading: false
      // в news кладем пришедшие данные
      this.setState({ isLoading: false, news: data })
      }, 3000) // добавили задержку в 3 секундыы
    })
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
