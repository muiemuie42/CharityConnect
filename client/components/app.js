import React from 'react';

export default class App extends React.Component
{

    constructor(props){
        super(props);
        this.state = { charityRows: []};
    }
    componentDidMount(){
        const charityResult = [];
        fetch('https://api.data.charitynavigator.org/v2/Organizations?' +
                'app_id=3f3f4a3b&' +
                'app_key=6b3dbcbf452059aaecb6b346d7bebad2&pageSize=5&' +
                'state=NY&' +
                'city=New%20Hyde%20Park&' +
                'zip=11040')
        .then(response => response.json())
        .then(charityArray => {
            
            console.log("charityArray: ",charityArray)
            charityArray.map(currObj =>{
                let charityObj = {}
                charityObj["charityName"] = currObj.charityName;
                charityObj["ein"] = currObj.ein;
                charityObj["websiteURL"] = currObj.websiteURL;
                charityObj['charityNavigatorURL'] = currObj.charityNavigatorURL;
                charityResult.push(charityObj);
            })
            this.setState({charityRows: charityResult })
        });
    }



    render(){

        const charityRows = this.state.charityRows.map( currCharity =>{
            return (<li> {currCharity.charityName}  {currCharity.ein} {currCharity.websiteURL}</li>)
        })

        return(
            <React.Fragment>
                <p>     name        ein        websiteURL </p>
                <ul>{charityRows}</ul>
            </React.Fragment>

        )

    }



}