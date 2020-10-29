import React, { useState, useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get('projects').then((response) => {
      setRepository(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('projects', {
      title: `Novo repositório ${Date.now()}`,
      owner: 'Repositório novo',
    });

    const repository = response.data;

    setRepository([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/projects/${id}`);

    const index = repositories.indexOf(response);

    repositories.splice(index, 1);

    setRepository([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <>
            <li key={repository.id}>{repository.title}</li>
            <button
              key={repository.id}
              onClick={() => handleRemoveRepository(repository.id)}
            >
              Remover
            </button>
          </>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
