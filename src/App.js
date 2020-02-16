import React, { useRef, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Counter from './assests/Counter.svg';
import BetAmount from "./BetAmount";

function App() {
    const [counterBottom, setCounterBottom] = useState(null);
    const [minBottom, setMinBottom] = useState(null);
    const [maxBottom, setMaxBottom] = useState(null);
    const [counterPushed, setCounterPushed] = useState(null);
    const [startMouseY, setStartMouseY] = useState(null);

    const svgRef = useRef();
    const sliderRef = useRef();

    useEffect(() => {
        console.log(typeof counterBottom)
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
        console.error('handleMouseDown');
        setCounterPushed(true);
        setStartMouseY(e.clientY);
    };
    const handleMouseUp = (e) => {
        console.error('handleMouseUp');
        setCounterPushed(false);
        console.warn('MOVE TO', counterBottom);
        let newBottom = counterBottom + (startMouseY - e.clientY);
        console.error("NEW BOT", newBottom)
        if (newBottom > maxBottom) {
            newBottom = maxBottom;
        } else if (newBottom < minBottom) {
            newBottom = minBottom;
        }
        setCounterBottom(newBottom);
        setStartMouseY(e.clientY);
    };
    console.warn('MAX MIN', maxBottom, minBottom);
    const handleMouseMove = (e) => {
        if (counterPushed) {
            console.warn('MOVE TO', counterBottom);
            let newBottom = counterBottom + (startMouseY - e.clientY);
            console.error("NEW BOT", newBottom)
            if (newBottom > maxBottom) {
                newBottom = maxBottom;
            } else if (newBottom < minBottom) {
                newBottom = minBottom;
            }
            setCounterBottom(newBottom);
            setStartMouseY(e.clientY);
        }
    };

    console.error(counterBottom )

    return (
    <div className="app">
      <header className="header">
          <span className="header-menu-icon"/>
      </header>
      <div  onMouseUp={handleMouseUp} className="content">
        <div  onMouseMove={handleMouseMove} className='slider-container'>
          <div className='slider-wrapper'>
              <div className='slider-values'>
                <span className='slider-value'>100</span>
                <span className='slider-value'>0</span>
              </div>
              <div ref={sliderRef} className='slider'>
                <div style={{height: counterBottom - minBottom}} className='slider-bottom'>
                    <div ref={svgRef} onMouseDown={handleMouseDown} style={{bottom: counterBottom}} className='image-wrapper'>
                        <span className='counter-value'>{((counterBottom - minBottom) / ((maxBottom - minBottom) / 100)).toFixed(2)}</span>
                    </div>
                </div>
              </div>
          </div>
          <BetAmount/>
        </div>
        <div className='datalist-container'>&nbsp;</div>
        <div className='shellfish-container'>&nbsp;</div>
      </div>
    </div>
  );
}

export default App;
