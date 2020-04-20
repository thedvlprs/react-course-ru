import React from 'react'; // подключение библиотеки React
import PropTypes from 'prop-types';
import './App.css'; // подключение файла стилей

// далее скопировано из тэга script
const myNews = [
  {
    id: 1,
    author: 'Саша Печкин',
    text: 'В четверг, четвертого числа...',
    bigText:
      'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.',
  },
  {
    id: 2,
    author: 'Просто Вася',
    text: 'Считаю, что $ должен стоить 35 рублей!',
    bigText: 'А евро 42!',
  },
  {
    id: 3,
    author: 'Max Frontend',
    text: 'Прошло 2 года с прошлых учебников, а $ так и не стоит 35',
    bigText: 'А евро опять выше 70.',
  },
  {
    id: 4,
    author: 'Гость',
    text: 'Бесплатно. Без смс, про реакт, заходи - https://maxpfrontend.ru',
    bigText:
      'Еще есть группа VK, telegram и канал на youtube! Вся инфа на сайте, не реклама!',
  },
];

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
            href='#'
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

// --- добавили форму ---
class Add extends React.Component {
  state = {
    // добавили начальное состояние
    name: '',
    text: '',
    bigText: '', // добавлен bigText
    agree: false, // новое значение состояния - agree (булево)
  };
  onBtnClickHandler = (e) => {
    e.preventDefault();
    const { name, text, bigText } = this.state; // вытащили так же и bigText
    // alert(name + '\n' + text);
    // вызовем вместо alert
    this.props.onAddNews({
      id: +new Date(), // в id сохраняется количество миллисекунд прошедших с 1 января 1970 года в часовом поясе UTC
      author: name, // name сохраняем в поле author
      text,
      bigText,
    });
  };
  handleChange = (e) => {
    const { id, value } = e.currentTarget;
    this.setState({ [id]: e.currentTarget.value });
  };
  handleCheckboxChange = (e) => {
    // обработчик кликов по чекбоксу, чтобы установить true/false считываем свойство checked
    this.setState({ agree: e.currentTarget.checked });
  };
  validate = () => {
    const { name, text, agree } = this.state;
    if (name.trim() && text.trim() && agree) {
      return true;
    }
    return false;
  };
  render() {
    const { name, text, bigText, agree } = this.state; // вытащили значения из стейта

    // добавили value для name и для textarea
    return (
      <form className='add'>
        <input
          id='name'
          type='text'
          onChange={this.handleChange}
          className='add__author'
          placeholder='Ваше имя'
          value={name}
        />
        <textarea
          id='text'
          onChange={this.handleChange}
          className='add__text'
          placeholder='Текст новости'
          value={text}
        ></textarea>
        {/* добавили bigText */}
        <textarea
          id='bigText'
          onChange={this.handleChange}
          className='add__text'
          placeholder='Текст новости подробно'
          value={bigText}
        ></textarea>
        <label className='add__checkrule'>
          <input type='checkbox' onChange={this.handleCheckboxChange} /> Я
          согласен с правилами
        </label>
        {/* кнопке добавили disabled равный (НЕ agree) */}
        <button
          className='add__btn'
          onClick={this.onBtnClickHandler}
          disabled={!this.validate()}
        >
          Показать alert
        </button>
      </form>
    );
  }
}

Add.propTypes = {
  onAddNews: PropTypes.func.isRequired, // func исп-ся для проверки передачи functions
};

class App extends React.Component {
  state = {
    news: myNews, // в начальное состояние положили значение из переменной
  };
  handleAddNews = (data) => {
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
