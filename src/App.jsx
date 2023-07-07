import { useState, useEffect } from 'react';
import './App.css';

const JuegoContador = () => {
  const [count, setCount] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(5);
  const [gameStarted, setGameStarted] = useState(false);
  const [clickerEnabled, setClickerEnabled] = useState(false);
  const [countdownMessage, setCountdownMessage] = useState('');
  const [showCongrats, setShowCongrats] = useState(false);


  useEffect(() => {
    if (timeRemaining > 0 && gameStarted && clickerEnabled && countdownMessage === 'Juego en proceso') {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && clickerEnabled) {
      endGame();
    }
  }, [timeRemaining, gameStarted, clickerEnabled, countdownMessage]);

  const startGame = () => {
    setCount(0);
    setShowCongrats(false);
    setGameStarted(true);
    setTimeRemaining(5);
    setCountdownMessage('Preparados...');
    setTimeout(() => {
      setCountdownMessage('Listos...');
    }, 1000);
    setTimeout(() => {
      setCountdownMessage('Ya!');
    }, 2000);
    setTimeout(() => {
      setCountdownMessage('Juego en proceso');
      setClickerEnabled(true);
    }, 3000);

  };

  const endGame = () => {
    setClickerEnabled(false);
    setGameStarted(false);
    if (count > maxScore) {
      setMaxScore(count);
        if(maxScore !== 0)
      setShowCongrats(true);
    }
  };

  const incrementCount = () => {
    if (clickerEnabled) {
      setCount(count + 1);
    }
  };

  return (
    <main>
      <h1 className='juego-contador__title'>Juego Contador</h1>
      <p className='juego-contador__max-score'>Puntaje Maximo: {maxScore}</p>
      <div className='juego-contador-container_column'>
      <button className='juego-contador-button__game-started' onClick={startGame} disabled={gameStarted}>
        {gameStarted ? countdownMessage : 'Iniciar Juego'}
      </button>
      <button className='juego-contador-button_incrementCount'onClick={incrementCount} disabled={!clickerEnabled}>
        Sumar
      </button>
      </div>
      <p className='juego-contador__time-remaining'>Tiempo Restante: {timeRemaining}s</p>
      <p className='juego-contador__count'>Puntaje: {count}</p>
      {showCongrats && <p className='juego-contador__congrats'>¡Felicitaciones, alcanzaste un nuevo puntaje máximo!</p>}
    </main>
  );
};

export default JuegoContador;
