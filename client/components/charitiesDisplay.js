import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Charity from './Charity';
import FilterPanel from './filterPanel';
import ColumnHeader from './columnHeader';

// export default function CharitesDisplay (){
//     const [charities, setCharities] = useState({})

//     return (
//         <div className='charity-display'>
//             Charity Display
//         </div>
//     )

// }

export default class CharityDisplay extends React.Component
{
    constructor(props, context){
        super(props, context);
        this.state = { 
            charityRows: [], 
            originalCharityRows: [],
        };
        this.fetchData = this.fetchData.bind(this);
    }
    componentDidMount(){
        const charityResult = [];
        // fetch('https://api.data.charitynavigator.org/v2/Organizations?' +
        //         'app_id=3f3f4a3b&' +
        //         'app_key=6b3dbcbf452059aaecb6b346d7bebad2&pageSize=5&' +
        //         'state=NY&' +
        //         'city=New%20Hyde%20Park&' +
        //         'zip=11040')
        fetch('https://api.data.charitynavigator.org/v2/Organizations?app_id=acad48f7&app_key=1caab9869fdb918b252c8f56de6b62ce&pageSize=1000&sort=RATING')
        .then(response => response.json())
        .then(charityArray => {
            charityArray.map(currObj =>{
                let charityObj = {}
                charityObj["charityName"] = currObj.charityName;
                charityObj["ein"] = currObj.ein;
                charityObj["websiteURL"] = currObj.websiteURL;
                charityObj['charityNavigatorURL'] = currObj.charityNavigatorURL;
                charityObj['category'] = currObj.category.categoryName;
                charityObj['cause'] = currObj.cause.causeName;
                charityObj['ratingImageURL'] = currObj.currentRating === undefined ? "" : currObj.currentRating.ratingImage.large;
                charityObj['advisory'] = currObj.advisories.severity === null ? "none" : currObj.advisories.severity ;
                const address = currObj.mailingAddress
                charityObj['address'] = address.city + ", " + address.stateOrProvince + " " + address.postalCode;
                charityObj['state'] = address.stateOrProvince;
                charityResult.push(charityObj);
            })
            this.setState({charityRows: charityResult, originalCharityRows: [...charityResult] })
        });
    }


    fetchData(){
        const category = document.querySelector("#category").value;
        const state = document.querySelector("#state").value;
        const cause = document.querySelector("#cause").value;
        const newCharityRows= this.state.originalCharityRows.filter(currRow =>{
            if ((category === "" || currRow.category === category) &&
                (cause === "" || currRow.cause === cause) &&
                (state === "" || currRow.state === state)){
                        return currRow;
            }
                 
        })
        console.log("newCharityRows -", newCharityRows);
        this.setState({charityRows: newCharityRows});

    }


    render(){

        const charityRows = this.state.charityRows.map( (currCharity, index) =>{
            const keyId = "row"+index
            return (<div className="queryResultsRow" key={keyId} >
                        <div className="field"><a href={currCharity.websiteURL}>{currCharity.charityName}</a></div> 
                        <div className="field">{currCharity.address}</div>
                        <div className="field">{currCharity.category}</div>
                        <div className="field">{currCharity.cause}</div>
                        <div className="field"><img src={currCharity.ratingImageURL}></img> </div>
                        <div className="field">{currCharity.advisory}</div>
                    </div>)
        })

        return(

            <div className='charity-display'>
                <FilterPanel fetchData={this.fetchData}/>
                <ColumnHeader />
                <div className="queryResultsColumn">
                        {charityRows}
                </div>
            </div>
  
        )

    }
    



}