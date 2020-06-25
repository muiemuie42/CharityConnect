import React, { useState, useEffect } from 'react';
import charitiesDisplay from './charitiesDisplay';
import savedDisplay from './savedDisplay';

export default function MainPage(){
    return (
        <div className='main-container'> 
            <charitiesDisplay />
            <savedDisplay />
        </div>
    )
}