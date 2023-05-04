import React from 'react'
import './App.css'

export default function SampleButton({ keyTrigger, button, playSound, id }) {
  return (
    <button onClick={() => playSound(id)} id={id} className={`sample-button ${(keyTrigger.toUpperCase() == button) ? ('hover') : ('')}`}>{keyTrigger}</button>
  )
}
