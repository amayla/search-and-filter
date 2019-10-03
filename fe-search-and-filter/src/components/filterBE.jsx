import React, { Component } from 'react'
import Axios from 'axios'
const URL_API = 'http://localhost:1110/'
class filterBE extends Component{
    constructor(props){
        super(props)
        this.state={
            data:[]


        }
    }
    componentDidMount() {
        this.getData()
    }
    getData = () => {
        Axios.get(
            URL_API + 'getdata'
        ).then(res => {
            this.setState({
                data:res.data
            })
        }).catch(err => {
            console.log(err)
        })
    }

    renderData = () => {
        let jsx = this.state.data.map(val => {
        return (
            
                 <tr>
                    <td>{val.PassengerId}</td>
                    <td>{val.Name}</td>
                    <td>{val.Survived ? 'Alive' : 'Deceased'}</td>
                    <td>{val.Pclass === 1 ? 'Fisrt Class': val.Pclass === 2? 'Executive' : 'Economy'}</td>
                    <td>{val.Age}</td>
                    <td>{val.Sex === 'male' ? 'M': 'F'}</td>
                </tr>
            
            
        )
    })
    return jsx
    }

    render (){
        return(
            <div className='container'>
                <div className = 'table'>
                    <table>
                        <thead>
                            <th>
                                PassengerId
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Survived
                            </th>
                            <th>
                                Pclass
                            </th>
                            <th>
                                Age
                            </th>
                            <th>
                                Gender
                            </th>
                        </thead>
                        <tbody>
                            {this.renderData()}
                        </tbody>
                    </table>
                </div>
                
            </div>
        )
    }

}
export default filterBE