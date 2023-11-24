import Home from './pages/home/home';
import TextToText from './pages/TextToText/TextToText';
import SpeechToSpeech from './pages/SpeechToSpeech/SpeechToSpeech';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import "./App.css"
function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
      <Routes>
        <Route path="/TextToText" element={<TextToText/>} />
      </Routes>
      <Routes>
        <Route path="/SpeechToSpeech" element={<SpeechToSpeech/>} />
      </Routes>
    </BrowserRouter> 
    </div>
  );
}

export default App;
