// import { useState } from 'react';
// import './form.styles.css';

// function Form() {
//   const [input, setInput] = useState({
//     name: "",
//     temperament: "",
//     life_span: ""
//   });

//   const [error, setError] = useState({
//     name: "",
//     temperament: "",
//     life_span: ""
//   });

//   const validate = () => {
//     if (!/^[A-Za-z]+$/i.test(input.name)) {
//       setError({
//         ...error,
//         name: 'Error en el nombre'
//       });
//     } else {
//       setError({
//         ...error,
//         name: ''
//       });
//       console.log('Ok, haz tu dispatch');
//     }
//   }

//   function handleSubmit(event) {
//     event.preventDefault();
//     validate();
//   }

//   function handleChange(event) {
//     setInput({
//       ...input,
//       [event.target.name]: event.target.value
//     });
//   }

//   return (
//     <div>
//       <form onSubmit={""}>
//         <div>
//           <label htmlFor="">Nombre</label>
//           <input name="name" value={input} onChange={handleChange} />
//         </div>
//         <div>
//           <label htmlFor="">Temperaments</label>
//           <input name="temperament" value={input} onChange={handleChange} />
//         </div>
//         <div>
//           <label htmlFor="">Years of life</label>
//           <input name="life_span" value={input} onChange={handleChange} />
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Form;

import { useState } from 'react';
import './form.styles.css';

function Form() {
  const [input, setInput] = useState({
    name: "",
    temperament: "",
    life_span: ""
  });

  const [error, setError] = useState({
    name: "",
    temperament: "",
    life_span: ""
  });

  const validate = () => {
    let isValid = true;

    // Validación del nombre
    if (!/^[A-Za-z]+$/i.test(input.name)) {
      setError({
        ...error,
        name: "Formato inválido"
      });
      isValid = false;
    } else {
      setError({
        ...error,
        name: ""
      });
    }

    // Puedes agregar más lógica de validación para temperament y life_span aquí

    return isValid;
  };

  const sendDataToBackend = async () => {
    try {
      const isValid = validate();

      if (!isValid) {
        console.error('Error en la validación');
        return;
      }

      const response = await fetch('http://localhost:3001/dogs/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(input),
});

      if (response.ok) {
        console.log('Datos enviados con éxito');
      } else {
        console.error('Error al enviar datos al backend');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendDataToBackend();
  };

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre</label>
          <input name="name" value={input.name} onChange={handleChange} />
          <span>{error.name}</span>
        </div>
        <div>
          <label htmlFor="temperament">Temperaments</label>
          <input name="temperament" value={input.temperament} onChange={handleChange} />
          <span>{error.temperament}</span>
        </div>
        <div>
          <label htmlFor="life_span">Years of life</label>
          <input name="life_span" value={input.life_span} onChange={handleChange} />
          <span>{error.life_span}</span>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
