import { useEffect, useState } from 'react';
import '../styles/App.scss';
import img from '../images/friends.png';
import imgLogo from '../images/logo.png';

//Component
function App() {
  const [list, setList] = useState([]);
  const [filteredQuote, setFilteredQuote] = useState('');
  const [filterCharacter, setFilterCharacter] = useState('all');
  const [newQuote, setNewQuote] = useState({});

  //1-Fetch
  useEffect(() => {
    fetch(
      'https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json'
    )
      .then((response) => response.json())
      .then((data) => {
        setList(data);
      });
  }, []);

  //3-Function change the content of the state variable of quote
  const handleQuote = (ev) => {
    setFilteredQuote(ev.target.value);
  };

  //4-Function change the content of the state variable of character
  const handleCharacter = (ev) => {
    setFilterCharacter(ev.target.value);
  };

  //5-Function handleNewQuote
  const handleNewQuote = (ev) => {
    setNewQuote({
      ...newQuote,
      [ev.target.name]: ev.target.value,
    });
  };

  //6-Function handleClick
  const handleClick = (ev) => {
    ev.preventDefault();
    setList([...list, newQuote]);
    setNewQuote({
      quote: '',
      character: '',
    });
  };

  //2-Function renderList and filter
  const renderList = () => {
    return list
      .filter((elementList) =>
        elementList.quote.toLowerCase().includes(filteredQuote.toLowerCase())
      )
      .filter((elementList) => {
        if (filterCharacter === 'all') {
          return elementList;
        } else {
          return elementList.character === filterCharacter;
        }
      })
      .map((elementList, i) => (
        <li className='list__element' key={i}>
          <h4 className='list__element--quote'> {elementList.quote} </h4>
          <span className='list__element--character'>
            {elementList.character}
          </span>
        </li>
      ));
  };

  return (
    <div>
      <header className='header'>
        <img className='header__img' src={img} alt='img' />
        <h1 className='header__title'>Frases de Friends</h1>
      </header>
      <main className='hero'>
        <form className='form'>
          <div className='container'>
            <label className='form__phraseFilter' htmlFor='search__quote'>
              Filtrar por frase
            </label>
            <input
              className='form__phraseFilter--input'
              type='text'
              onInput={handleQuote}
              value={filteredQuote}
              placeholder='Ej: Pivot'
            />
          </div>
          <div className='container'>
            <label className='form__characterFilter' htmlFor='search__character'>
              Filtrar por personaje
            </label>
            <select
              className='form__characterFilter--select'
              name=''
              id=''
              onChange={handleCharacter}
            >
              <option value='all'>Todos</option>
              <option value='Joey'>Joey</option>
              <option value='Phoebe'>Phoebe</option>
              <option value='Chandler'>Chandler</option>
              <option value='Rachel'>Rachel</option>
              <option value='Ross'>Ross</option>
              <option value='Monica'>Monica</option>
            </select>
          </div>
        </form>
        <ul className='list'>{renderList()}</ul>
        <form className='formTwo'>
          <fieldset className='fieldset'>
            <legend className='legend'>Añadir frase</legend>
            <div className='boxPhrase'>
              <label className='textQuote' htmlFor='add__character'>
                Frase
              </label>
              <input
                className='inputQuote'
                type='text'
                name='quote'
                onInput={handleNewQuote}
                value={newQuote.quote}
              />
            </div>
            <div className='boxCharacter'>
              <label className='textCharacter' htmlFor='add__character'>
                Personaje
              </label>
              <input
                className='inputCharacter'
                type='text'
                name='character'
                onInput={handleNewQuote}
                value={newQuote.character}
              />
            </div>
            <button className='button' onClick={handleClick}>
              Añadir nueva frase
            </button>
          </fieldset>
        </form>
      </main>
      <footer className='footer'>
        <img className='footer__img' src={imgLogo} alt='Logo' />
        <p className='footer__text'>Adalab &copy;2023</p>
      </footer>
    </div>
  );
}
export default App;
