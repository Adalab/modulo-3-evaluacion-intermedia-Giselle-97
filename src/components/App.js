import { useEffect, useState } from 'react';
import '../styles/App.css';
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
        <li key={i}>
          <h4> {elementList.quote} </h4>
          <span>{elementList.character}</span>
        </li>
      ));
  };

  return (
    <div>
      <header>
        <h1>Frases de Friends</h1>
      </header>
      <form>
        <label>Filtrar por personaje</label>
        <input type='text' onInput={handleQuote} value={filteredQuote} />
        <label>Filtrar por personaje</label>
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
      <ul>{renderList()}</ul>
      <form action=''>
        <label>Frase</label>
        <input type='text' name='quote' onInput={handleNewQuote} value={newQuote.quote}/>
        <label>Personaje</label>
        <input type='text' name='character' onInput={handleNewQuote} value={newQuote.character} />
        <button onClick={handleClick}>Añadir la nueva frase</button>
      </form>
    </div>
  );
}
export default App;
