import { useState, useEffect } from 'react'
import './App.css'
import SampleButton from './SampleButton';

function App() {
  const playableButtons = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'];
  let buttonsAndClips = {
    'Q': {
      sample: new Audio('https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'),
      name: 'Heater 1',
    },
    'W': {
      sample: new Audio('https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'),
      name: 'Heater 2'
    },
    'E': {
      sample: new Audio('https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'),
      name: 'Heater 3'
    },
    'A': {
      sample: new Audio('https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'),
      name: 'Heater 4'
    },
    'S': {
      sample: new Audio('https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'),
      name: 'Clap'
    },
    'D': {
      sample: new Audio('https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'),
      name: 'Open Hi-Hat'
    },
    'Z': {
      sample: new Audio('https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'),
      name: "Kick n' Hat"
    },
    'X': {
      sample: new Audio('https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'),
      name: 'Kick'
    },
    'C': {
      sample: new Audio('https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'),
      name: 'Closed Hi-Hat'
    }
  };

  const [button, setButton] = useState('');
  const [power, setPower] = useState(true);
  const [sample, setSample] = useState('');
  const [status, setStatus] = useState('');

  const updatePower = () => {
    setPower((prevPower) => !prevPower);
  }
  
  const handleKeyPress = (event) => {    
    if (!power)
      return;

    if (!playableButtons.includes(event.key.toUpperCase()))  
      return;

    setSample(buttonsAndClips[event.key.toUpperCase()].name);
    setButton(event.key.toUpperCase());
    setStatus(buttonsAndClips[event.key.toUpperCase()].name);

    keyHighlight(event);
    playSound(event.key.toUpperCase());
  }

  const playSound = (key) => {
    playableButtons.forEach((button) => {
      // if (button !== event.key.toUpperCase())
      {
        buttonsAndClips[button].sample.pause();    
        buttonsAndClips[button].sample.currentTime = 0;    
      }
    });
    
  buttonsAndClips[key].sample.play();
  }

  const keyHighlight = (event) => {
    if (!playableButtons.includes(event.key.toUpperCase()))  
      return;

    document.getElementById(event.key.toUpperCase()).animate({
      backgroundColor: 'rgba(255, 255, 255, .1)'
    }, 100);
  };

  useEffect(() => {
    if (power) {
      document.body.addEventListener('keydown', handleKeyPress);
    } else {
      document.body.removeEventListener('keydown', handleKeyPress);
      document.body.addEventListener('keydown', keyHighlight);
      setStatus('');
    }
    return () => {
      document.body.removeEventListener('keydown', handleKeyPress);
      document.body.addEventListener('keydown', keyHighlight);
      setStatus('');
    };
  }, [power]);

  return (
    <div className="App">
      <div className='container' id='drum-machine'>
        <div className='drum-machine-grid drum-pad'>
          <SampleButton id='Q' keyTrigger='Q' playSound={playSound} button={button}/>
          <SampleButton id='W' keyTrigger='W' playSound={playSound} button={button}/>
          <SampleButton id='E' keyTrigger='E' playSound={playSound} button={button}/>
          <SampleButton id='A' keyTrigger='A' playSound={playSound} button={button}/>
          <SampleButton id='S' keyTrigger='S' playSound={playSound} button={button}/>
          <SampleButton id='D' keyTrigger='D' playSound={playSound} button={button}/>
          <SampleButton id='Z' keyTrigger='Z' playSound={playSound} button={button}/>
          <SampleButton id='X' keyTrigger='X' playSound={playSound} button={button}/>
          <SampleButton id='C' keyTrigger='C' playSound={playSound} button={button}/>
        </div>
        <div className='mixer'>
          <h2>Power</h2>
          <div onClick={() => updatePower()}  className='power-select'>
            <div className={`power-on-off ${power ? 'right' : 'left'}`}></div>
          </div>
          <div style={{width: '110px', height: '30px', backgroundColor: 'seashell', marginLeft: 0}} id='display'>{status}</div>
        </div>
      </div>
    </div>
  )
}

export default App
