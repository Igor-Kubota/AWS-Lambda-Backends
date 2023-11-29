import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [feedback, setFeedback] = useState({ id: '', comentario: '', classificacao: '', info: '' });
  const [feedbacks, setFeedbacks] = useState([]);
  const [backendURL, setBackendURL] = useState('https://wqq2jrm2s4.execute-api.us-east-1.amazonaws.com/dev');
  const [apiKey, setApiKey] = useState('https://wqq2jrm2s4.execute-api.us-east-1.amazonaws.com/dev');

  // useEffect(() => {
  //   obterLivros()
  // }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFeedback((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const handleURLChange = (event) => {
    setBackendURL(event.target.value);
  };

  const config = {
    headers: {
      'x-api-key': apiKey
    }
  };

  const obterFeedbacks = async () => {
  try {
    const response = await axios.get(`${backendURL}/feedback`, config);

    if (response.data && response.data.body) {
      const dataFromBody = JSON.parse(response.data.body);

      if (Array.isArray(dataFromBody)) {
        const feedbacksFormatted = dataFromBody.map(feedback => ({
          ID: feedback.ID,
          classificacao: feedback.Classificacao,
          comentario: feedback.Comentario,
          informacoes: feedback.Informacoes
        }));

        setFeedbacks(feedbacksFormatted);
      } else {
        console.error("Dados de feedback inválidos: não é um array", dataFromBody);
      }
    } else {
      console.error("Resposta inválida da API", response.data);
    }
  } catch (error) {
    console.error("Erro ao obter feedbacks", error);
  }
};

const cadastrarFeedback = async () => {
  try {
    const feedbackData = {
      ID: feedback.ID,
      classificacao: feedback.classificacao,
      comentario: feedback.comentario,
      informacoes: feedback.informacoes
    };

    const response = await axios.post(`${backendURL}/feedback`, feedbackData, config);
    if (response.status === 200 || response.status === 201) {
      const novoFeedback = {
        ID: feedback.ID,
        classificacao: feedback.classificacao,
        comentario: feedback.comentario,
        informacoes: feedback.informacoes
      };

      setFeedbacks([...feedbacks, novoFeedback]);
      setFeedback({ ID: '', classificacao: '', comentario: '', informacoes: '' });
    } else {
      console.error("Erro ao cadastrar o feedback", response.data);
    }
  } catch (error) {
    console.error("Erro ao conectar com o back-end", error);
  }
};

  return (
    <div className="App">
      <form>
        <input
          name="id"
          placeholder="ID"
          value={feedback.id}
          onChange={handleInputChange}
        />
        <input
          name="comentario"
          placeholder="comentario"
          value={feedback.comentario}
          onChange={handleInputChange}
    
        />
        <input
          name="classificacao"
          placeholder="classificacao"
          value={feedback.classificacao}
          onChange={handleInputChange}
          
        />
        <input
          name="info"
          placeholder="info"
          value={feedback.info}
          onChange={handleInputChange}
          
        />
        <button type="button" onClick={cadastrarFeedback}>Cadastrar Feedback</button>
        <button type="button" onClick={() => obterFeedbacks()}>Obter todos os Feedbacks</button>
      </form>
      <input
        className="backend-url-input"
        type="text"
        placeholder="URL do Backend"
        value={backendURL}
        onChange={handleURLChange}
      />
      <ul>
        {feedbacks.map((f, index) => (
          <li key={index}>
            <div className="feedback-box">
              <div>ID: {f.ID}</div>
              <div>comentario: {f.comentario}</div>
              <div>classificacao: {f.classificacao}</div>
              <div>Info: {f.info}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
