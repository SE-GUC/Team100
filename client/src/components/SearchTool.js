import React, {Component} from 'react'

export class SearchTool extends Component{
    render() {
        return (
            <form style={{display: 'flex'}}>
                <input
                input= "text"
                name= "title"
                style={{ flex: '10', padding: '5px'}}
                placeholder="search..."
                />

                <input type= "submit"
                value="Search"
                className="btn"
                style= {{flex: "1"}}
                />
            </form>
        )
    }
}
export default SearchTool