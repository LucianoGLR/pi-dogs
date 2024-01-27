import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './card.styles.css';

function Card({ dog }) {
  const { name, temperament, weight, id } = dog;
  const dogId = id;

  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchDogImage = async () => {
      try {
        const response = await axios.get(`https://api.thedogapi.com/v1/images/search?breed_id=${dogId}`);

        await new Promise(resolve => setTimeout(resolve, 500));

        const image = response.data[0]?.url || '';
        setImageUrl(image);
      } catch (error) {
        console.error('Error al obtener la imagen del perro:', error.message);
        setImageUrl('');
      }
    };

    fetchDogImage();
  }, [dogId]);

  return (
    <div className="dog-card">
      <Link to={`/home/${id}`} className='linkStyle' onClick={() => console.log('Redirecting to:', `/home/${id}`)}>
        {imageUrl && <img src={imageUrl} alt={name} className='dog-card-img' />}
        <h2>Breed: {name ? name : 'no se encontro name'}</h2>
        <p>Temperaments: {temperament ? temperament : 'no se encontro temperaments'}</p>
        <p>Weight: {weight && weight.metric ? weight.metric: 'No weight available'} kg</p>
      </Link>
    </div>
  );
}

export default Card;
