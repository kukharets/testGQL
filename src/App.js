import React, { useState } from 'react';
import './App.css';
import './Mobile.css';
import BetAmount from "./BetAmount";
import List from "./List";
import Claws from "./Claws";
import Modal from "./Modal";
import Slider from "./Slider";



function App() {
  const [modalOpenState, setModalOpenState] = useState(false);

  const handleModalOpenState = () => {
    setModalOpenState(!modalOpenState);
  };

  return (
    <div className="app">
      {modalOpenState &&
        <Modal handleModalOpenState={handleModalOpenState}/>
      }
      <header className="header">
          <span className="header-menu-icon"/>
      </header>
      <div  className="content">
        <div className='slider-container'>
          <Slider/>
          <BetAmount/>
        </div>
        <div className='datalist-container'>
          <List/>
        </div>
        <div className='shellfish-container'>
          <Claws handleModalOpenState={handleModalOpenState}/>
        </div>
      </div>
    </div>
  );
}

export default App;
