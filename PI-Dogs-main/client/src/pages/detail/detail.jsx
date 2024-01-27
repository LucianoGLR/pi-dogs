import React, { useState, useEffect } from 'react';
import './detail.styles.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Detail() {
  const [imagen, setImagen] = useState('');
  const [dogInfo, setDogInfo] = useState(null);
  const [error, setError] = useState(null);

  const { id } = useParams();
  console.log('id:', id);

  // ...

useEffect(() => {
  const fetchData = async () => {
    try {
      // Obtener imagen del perro
      const responseImages = await axios.get(`https://api.thedogapi.com/v1/images/search?breed_id=${id}`);

      if (responseImages.data.length > 0) {
        // Intentar obtener la URL de la imagen de diferentes campos
        const imageUrl = responseImages.data[0]?.url || responseImages.data[0]?.image?.url || '';
        setImagen(imageUrl);
      } else {
        setError('No se encontraron imágenes para este perro.');
      }

      // Obtener información detallada del perro
      const responseInfo = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`);

      if (responseInfo.data) {
        setDogInfo(responseInfo.data);
      } else {
        setError('No se encontró información para este perro.');
      }
    } catch (error) {
      setError('Error al obtener la información del perro: ' + error.message);
    }
  };

  fetchData();
}, [id]);

// ...


  return (
    <div className='card-container'>
      {imagen && !error ? (
        <img src={imagen} alt="Perro" />
      ) : (
        error ? <p>Error de imagen: {error}</p> : null
      )}
      {dogInfo && (
        <>
          <h2>{dogInfo.name}</h2>
          <p>Weight: {dogInfo.weight?.metric} kg</p>
          <p>Temperament: {dogInfo.temperament}</p>
        </>
      )}
    </div>
  );
}

export default Detail;
