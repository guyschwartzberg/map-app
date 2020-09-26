import React from 'react'

class Test extends React.Component {

    

    render() { 
        const { data } = this.props;
        return data.map(
            city => <p key={city}> {city} </p>
        )
    }
}

export default Test