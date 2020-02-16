import React, { useRef, useState, useEffect } from 'react';

function BetAmount() {
    return (
        <div className='bet-amount-container'>
            <div>
                BET AMOUNT
                <span className='bet-amount-value'>
                    <span className='bet-amount-btc-icon'>₿</span>
                    0.04885313
                </span>
            </div>
            <div>1/2</div>
            <div>x2</div>
        </div>
    )
}

export default BetAmount;