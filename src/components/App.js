//sección import
//React, archivos propios, Sass, Images
import '../styles/App.css';
import { useEffect, useState } from 'react';
//Componente
function App() {
  const [list, setList] = useState([]);
  const [filteredQuotes, setFilteredQuotes] = useState('');
  const [filterCharacter, setFilterCharacter] = useState('');

  //Fetch
  useEffect(() => {
    fetch(
      'https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json'
    )
      .then((response) => response.json())
      .then((data) => {
        setList(data);
      });
  }, []);

  //Function and Event
  const renderList = () => {
    return list.map((elementList, i) => (
      <li key={i}>
        {elementList.quote} {elementList.character}
      </li>
    ));
  };

  return (
    //CÓDIGO HTML
    <div>
      <header>
        <h1>Frases de Friends</h1>
      </header>
      <form action=''>
        <p>Filtrar por frase</p>
        <input type='text' />
      </form>
      <p>Filtrar por personaje</p>
      <select name='select' id='select'>
        <option value='Todos' disabled></option>
      </select>

      <ul>{renderList()}</ul>

      <h1>Añadir una nueva frase</h1>
      <p>Frase</p>
      <input type='text' />
      <p>Personaje</p>
      <input type='text' />
    </div>
  );
}
export default App;
