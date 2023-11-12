import './App.scss';
import Footer from './components/Footer';
import GameScreen from './components/GameScreen';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <GameScreen /> 
      <Footer />
      <audio id="audio" preload='auto' src="src/assets/pokemon-battle.mp3"></audio>
    </>
  )
}

export default App
