import React from 'react'; // подключение библиотеки React
// испорт пакета prop-types удален, так как в этом файле prop-types не исп-ся
import { Add } from './components/Add'; // ./ = текущая директория,
import { News } from './components/News'; // далее мы идем в директорию components и в нужный компонент
import newsData from './data/newsData.json' // импорт по дефолту
import './App.css'; // подключение файла стилей

class App extends React.Component {
  state = {
    news: newsData,
  };
  handleAddNews = data => {
    // сначала мы формируем массив, на основе всего того, что уже было в новостях и кладем это все в новый массив + новую новость кладем в начало массива
    const nextNews = [data, ...this.state.news];

    // затем обновляем новый массив новостей в this.state.news
    this.setState({ news: nextNews });
  };

  render() {
    return (
      <React.Fragment>
        <Add onAddNews={this.handleAddNews} />
        <h3>Новости</h3>
        {/* считали новости из this.state */}
        <News data={this.state.news} />
      </React.Fragment>
    );
  }
}

// скопировано все кроме ReactDOM.render

// добавился export
export default App;
