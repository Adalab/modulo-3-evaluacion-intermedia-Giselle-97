import { useEffect, useState } from 'react';
import '../styles/App.scss';
import img from '../images/friends.png';

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
        <li className='elemntlist' key={i}>
          <h4> {elementList.quote} </h4>
          <span>{elementList.character}</span>
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
        <form className='form1'>
          <label className='form1__text1'>Filtrar por personaje</label>
          <input type='text' onInput={handleQuote} value={filteredQuote} />
          <label className='form1__text2'>Filtrar por personaje</label>
          <select name='' id='' onChange={handleCharacter}>
            <option value='all'>Todos</option>
            <option value='Joey'>Joey</option>
            <option value='Phoebe'>Phoebe</option>
            <option value='Chandler'>Chandler</option>
            <option value='Rachel'>Rachel</option>
            <option value='Ross'>Ross</option>
            <option value='Monica'>Monica</option>
          </select>
        </form>
        <ul className='list'>{renderList()}</ul>

        <form className='form2'>
          <fieldset className='fieldset'>
            <legend className='legend'>Añadir frase</legend>
            <div className='div1'>
              <label className='textFrase'>Frase</label>
              <input
                className='inputFrase'
                type='text'
                name='quote'
                onInput={handleNewQuote}
                value={newQuote.quote}
              />
            </div>
            <div className='div2'>
              <label className='textPersonaje'>Personaje</label>
              <input
                className='inputPersonaje'
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
        <p className='footer__text'>Adalab &copy;2023</p>
        <p className='footer__text'>Project by: Giselle Castro Durán</p>
      </footer>
    </div>
  );
}
export default App;
