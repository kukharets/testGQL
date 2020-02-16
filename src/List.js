import React, { useRef, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { graphql } from 'react-apollo';
import { useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';
const COMMENTS_SUBSCRIPTION = gql`
  subscription {
      betAdded {
        id,
        time,
        bet,
        payout,
        profit,
      }
}
`;

const parseDate = (unix_timestamp) => {
    var date = new Date(unix_timestamp * 1000);
// Hours part from the timestamp
    var hours = date.getHours();
// Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
   return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
};

function RenderBetItem ({time, bet, multiplier, profit, index, isNew})  {
    console.log('isNew', isNew, time)
    const [marginTop, setMarginTop] = useState(0);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        let counter = 1;
        const scroller = setInterval(() => {
            counter++;
            if (counter <= 24) {
                console.warn('zzz')
                setMarginTop(4 + counter)
            } else {
                clearInterval(scroller)
            }
        },10);
        setTimeout(() => {
                setVisible(true)
            }
        , 100)
    }, []);
    console.warn(marginTop)
    return (
        <div   style={{maxHeight: marginTop}} key={`bet-item-${index}`} className={`bets-row bets-data-row ${visible ? 'visible' : ''}`}>
            <span>{time}</span>
            <span className='bet-amount-value'>
                    <span className='bet-amount-btc-icon'>₿</span>
                    {bet}
            </span>
            <span>x{multiplier}</span>
            <span className='bet-amount-value green'>
                    <span className='bet-amount-btc-icon'>₿</span>
                    {profit}
            </span>
        </div>
    )
}

function List() {
    const [items, setItems] = useState([]);

    const { data: {betAdded} = {}, loading } = useSubscription(
        COMMENTS_SUBSCRIPTION
    );

    useEffect(() => {
        if (betAdded) {
            const { time, bet, payout, profit, id } = betAdded;
            let currentItems = items.concat();
            if (currentItems.length < 10) {
                currentItems.unshift({
                    time: parseDate(time),
                    bet: bet / 1000,
                    multiplier: payout / 4,
                    profit: profit / 1000,
                    id
                })
            } else {
                currentItems.unshift({
                    time: parseDate(time),
                    bet: bet / 1000,
                    multiplier: payout / 4,
                    profit: profit / 1000,
                    id
                });

                currentItems.splice(-1,1)
            }
            setItems(currentItems);
        }
    }, [betAdded]);

    return (
        <div className='bets-list'>
            <div className='bets-row bets-header'>
                <span>TIME</span>
                <span>BET</span>
                <span>MULTIPLIER</span>
                <span>PROFIT</span>
            </div>
            <div className='bets-items'>
                {items.map((item, index) => {
                    console.warn('index map', index)
                    return <RenderBetItem {...item} key={item.id} isNew={index === 0}/>})}
            </div>
        </div>
    )
}

export default List;