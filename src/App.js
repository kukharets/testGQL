import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import './Mobile.css';
import BetAmount from "./BetAmount";
import List from "./List";
import Claws from "./Claws";
import Modal from "./Modal";

const findEventY = (e) => {
  if (e.clientY) {
    return e.clientY
  } else if (e.nativeEvent && e.nativeEvent.touches[0] && e.nativeEvent.touches[0].pageY) {
    e.preventDefault();
    e.stopPropagation();
    return e.nativeEvent.touches[0].pageY
  } else if (e.nativeEvent && e.nativeEvent.changedTouches[0] && e.nativeEvent.changedTouches[0].pageY) {
    return e.nativeEvent.changedTouches[0].pageY
  }
  return 0;
};

function App() {
    const [counterBottom, setCounterBottom] = useState(null);
    const [minBottom, setMinBottom] = useState(null);
    const [maxBottom, setMaxBottom] = useState(null);
    const [counterPushed, setCounterPushed] = useState(null);
    const [startMouseY, setStartMouseY] = useState(null);
    const [modalOpenState, setModalOpenState] = useState(false);

    const svgRef = useRef();
    const sliderRef = useRef();

    useEffect(() => {
        if (svgRef.current.clientHeight && typeof counterBottom !== 'number') {
            setCounterBottom(- svgRef.current.clientHeight / 2);
        }
        if (!minBottom && counterBottom) {
            setMinBottom(counterBottom);
        }
        if (sliderRef.current.clientHeight && svgRef.current.clientHeight) {
            setMaxBottom(sliderRef.current.clientHeight - svgRef.current.clientHeight/2);
        }

    }, [counterBottom]);

    const handleMouseDown = (e) => {
        setCounterPushed(true);
        setStartMouseY(findEventY(e));
    };

    const handleModalOpenState = () => {
        setModalOpenState(!modalOpenState);
    };

    const handleMouseUp = (e) => {
        setCounterPushed(false);
        let newBottom = counterBottom + (startMouseY - findEventY(e));
      console.warn('maxBottom', maxBottom, newBottom)
      if (newBottom >= maxBottom) {
            newBottom = maxBottom;
        } else if (newBottom < minBottom) {
            newBottom = minBottom;
        }
        setCounterBottom(newBottom);
        setStartMouseY(findEventY(e));
    };
    const handleMouseMove = (e) => {
      if (counterPushed) {
            let newBottom = counterBottom + (startMouseY - findEventY(e));
            if (newBottom > maxBottom) {
                newBottom = maxBottom;
            } else if (newBottom < minBottom) {
                newBottom = minBottom;
            }
            setCounterBottom(newBottom);
            setStartMouseY(findEventY(e));
        }
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
        <div  className='slider-container'>
          <div onMouseUp={handleMouseUp} onTouchEnd={handleMouseUp} onTouchMove={handleMouseMove} onMouseMove={handleMouseMove} className='slider-wrapper'>
              <div className='slider-values'>
                <span className='slider-value'>100</span>
                <span className='slider-value'>0</span>
              </div>
              <div ref={sliderRef} className='slider'>
                <div style={{height: counterBottom - minBottom}} className='slider-bottom'>
                    <div ref={svgRef} onTouchStart={handleMouseDown} onMouseDown={handleMouseDown} style={{bottom: counterBottom}} className='image-wrapper'>
                        <span className='counter-value'>{((counterBottom - minBottom) / ((maxBottom - minBottom) / 100)).toFixed(2)}</span>
                    </div>
                </div>
              </div>
          </div>
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
