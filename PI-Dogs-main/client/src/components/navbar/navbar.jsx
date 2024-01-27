// Navbar.jsx
import React from 'react';
import './navbar.styles.css';

function Navbar({ handleChange, handleSubmit, handleSortChange, handleFilterChange }) {
  return (
    <div className='search-bar'>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <div className="form-container">
          {/* Input para la búsqueda */}
          <div className="input-container">
            <label htmlFor="search">Búsqueda:</label>
            <input type="search" id="search" placeholder='Buscar perro' onChange={(e) => handleChange(e)} />
          </div>

          {/* Dropdown para ordenar por nombres */}
          <div className="select-container">
            <label htmlFor="sort">Ordenar por:</label>
            <select id="sort" onChange={(e) => handleSortChange(e)}>
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
          </div>

          {/* Dropdown para filtrar por raza */}
          <div className="input-container">
            <label htmlFor="filterBreed">Filtrar por Raza:</label>
            {/* Conecta el cambio al handler de filtro por raza */}
            <select onChange={(e) => handleFilterChange('breed', e.target.value)}>
              <option value="shitzu">Shitzu</option>
              <option value="golden">Golden</option>
              <option value="dalmata">Dálmata</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          {/* Dropdown para filtrar por temperamento */}
          <div className="input-container">
            <label htmlFor="filterTemperament">Filtrar por Temperamento:</label>
            <input type="text" id="filterTemperament" onChange={(e) => handleFilterChange('temperament', e.target.value)} />
          </div>

          {/* Botón de envío */}
          <button type='submit'>Enviar</button>
        </div>
      </form>
    </div>
  );
}


export default Navbar;
