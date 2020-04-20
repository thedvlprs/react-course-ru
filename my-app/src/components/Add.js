import React from 'react';
import PropTypes from 'prop-types';

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
    this.setState({ [id]: value });
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
    const { name, text, bigText } = this.state; // вытащили значения из стейта

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

export { Add }