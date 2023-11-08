import React, { useState } from 'react';

const CrearUsuario = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !email || !celular) {
      setError('Todos los campos son requeridos');
      return;
    }

    if (!/^\d{9}$/.test(celular)) {
      setError('El número de celular debe tener 9 dígitos');
      return;
    }

    try {
      const response = await fetch('https://654acfad5b38a59f28ee3f86.mockapi.io/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          email,
          celular,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear el usuario');
      }


    } catch (error) {
      setError('Error al crear el usuario');
    }
  };

  return (
    <div>
      <h1>Crear Usuario</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Celular:</label>
          <input
            type="text"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
          />
        </div>
        <button type="submit">Crear Usuario</button>
      </form>
    </div>
  );
};

export default CrearUsuario;
