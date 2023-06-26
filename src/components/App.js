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
  //filtro
  // Función para filtrar citas
const handleQuoteFilter = (event) => {
    const { value } = event.target;
setFilteredQuotes(value);
};};

// Función para filtrar personajes
  
const handleCharacterFilter = (event) => {
    const { value } = event.target;
    setFilterCharacter(value);
  };

// Función para renderizar la lista filtrada
const renderList = () => {
let filteredList = list;
if (filteredQuotes) {
      filteredList = filteredList. 
filter((elementList) =>
        elementList.    
quote.includes(filteredQuotes)
      );
}
    if (filterCharacter) {
      filteredList = filteredList.
      filteredList
filter((elementList) =>
        elementList.character.includes(filterCharacter)
      );
    }
      );
    }
return filteredList.map((elementList, i) => (
      
     
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
      <form>
        <p>Filtrar por frase</p>
        <input type='text' onChange={handleQuoteFilter} />
      </form>
      <p>Filtrar por personaje</p>
      <select name='select' id='select' onChange={handleCharacterFilter}>
        <option value='' disabled></option>
        {list.map((elementList, i) => (
          <option key={i} value={elementList.character}>
            {elementList.character}
          </option>
        ))}
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
