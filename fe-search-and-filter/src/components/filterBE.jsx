import React, { Component } from 'react'
import Axios from 'axios'
import querystring from 'query-string'

const URL_API = 'http://localhost:1110/'
class filterBE extends Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            psgName:'',
            ageMin:'',
            ageMax:'',
            psgSurvived:'',
            psgClass:'',
            psgSex:'',
            psgAge:''


        }
    }
    componentDidMount() {
        this.getData()

    }
    getData = () => {
            let params = {}
           if(this.props.location.search){
               console.log(this.props.location.search)
               params=querystring.parse(this.props.location.search)
           }


        Axios.get(
            URL_API + 'getdata',{
                params:params
            }
        ).then(res => {
            this.setState({
                data:res.data
            })
        }).catch(err => {
            console.log(err)
        })
    }

    renderData = () => {
        let jsx = this.state.data.map((val,index) => {
        return (
            
                 <tr key={index}>
                    <td>{val.PassengerId}</td>
                    <td>{val.Name}</td>
                    <td>{val.Survived ? 'Alive' : 'Deceased'}</td>
                    <td>{val.Class === 1 ? 'Fisrt Class': val.Pclass === 2? 'Executive' : 'Economy'}</td>
                    <td>{val.Age}</td>
                    <td>{val.Gender === 'male' ? 'M': 'F'}</td>
                </tr>
            
        )
    })
    return jsx
    }

    pushUrl = () => { 
        let params = {}
        // let feParams = querystring.parse(this.props.location.search)
        
        // console.log(feParams)
        
        if(this.state.psgName){
            params = {...params, psgName: this.state.psgName}
        }
        if(this.state.ageMin){
            params = {...params, ageMin: this.state.ageMin}
        }
        if(this.state.ageMax){
            params = {...params, ageMax: this.state.ageMax}
        }
        if(this.state.psgSex){
            params = {...params, psgSex: this.state.psgSex}
        }
        if(this.state.psgClass){
            params = {...params, psgClass: this.state.psgClass}
        }
        if(this.state.psgSurvived){
            params = {...params, psgSurvived: this.state.psgSurvived}
        }

        this.props.history.push('/search?'+querystring.stringify(params))

        Axios.get(
            URL_API + 'getdata',{
                params:params
            }
        ).then(res => {
            this.setState({
                data:res.data
            })
        }).catch(err => {
            console.log(err)
        })
            }
        
    

    render (){
        return(
            <div className='container'>
                <div  style={{textAlign:"left"}}>
                
                <div>
                    
                    <div className='form p-3 border-bottom border-secondary card-title'>
                        <div className='border-bottom border-secondary card-title'>
                            <h4>Titanic MV Passengers List</h4>
                        </div>
                        
                        <div className='row mb-5'>
                            <div className='col-6'>
                                <h5 className= 'm-2'>Name</h5>
                                <input 
                                ref="psgName" onChange={e => this.setState({psgName: e.target.value})}
                                type='text' 
                                className='mb-2 flex col-12'/>
                            </div>
                            <div className='col-6'>
                                    <div className='row'>
                                    <div className='col-12'>
                                        <h5 className='m-2'>Age</h5>
                                    </div>
                                    <div className='col-6'>
                                        <input ref='ageMin' onChange={e => this.setState({ageMin: e.target.value})}
                                        type='text' 
                                        placeholder='Age Minimum' 
                                        className='mb-2  col-12'/>
                                    </div>
                                     <div className='col-6 flex'>
                                        <input ref='ageMax' onChange={e => this.setState({ageMax: e.target.value})}
                                        type='text' 
                                        placeholder='Age Maximum'
                                        className='mb-2  col-12'/>
                                     </div>
                             </div>
                            </div>
                        </div>
                        <div className='row'>
                        
                        <div className = 'col-3'>
                        <h5 className = 'm-2'
                            style={{textAlign:"Left"}}>
                            Passenger Class </h5>
                            <select name='psgClass'
                                onChange={e => this.setState({psgClass: e.target.value})}>
                                <option style = {{color:"gray",fontSize:"11px",textDecoration:"italic"}} >Please Choose</option>
                                <option value='1'>1</option>
                                <option value= '2'>2</option>
                                <option value= '3'>3</option>
                            </select>
                        </div>
                        <div className='container col-3'> 
                        <h5 className = 'm-2'
                            style={{textAlign:"Left"}}>
                            Survived </h5>
                            <select name='psgSurvived'
                                onChange={e => this.setState({psgSurvived: e.target.value})}>
                                <option style = {{color:"gray",fontSize:"11px",textDecoration:"italic"}}>Please Choose</option>
                                <option value='nameAsc'>Yes</option>
                                <option value= 'priceLowest'>No</option>
                            </select>
                            
                        </div>
                        <div className='container col-3'> 
                        <h5 className = 'm-2'
                            style={{textAlign:"Left"}}>
                            Gender </h5>
                            <select name='psgSex'
                                onChange={e => this.setState({psgSex: e.target.value})}>
                                <option style = {{color:"gray",fontSize:"11px",textDecoration:"italic"}} >Please Choose</option>
                                <option value='female'>Female</option>
                                <option value= 'male'>Male</option>
                            </select>
                        
                        </div>
                        <div className=' col-3'> 
                        
                        <input type='button' className='btn btn-outline-primary mt-4 ml-5 mr-4 mb-2'style={{backgroundColor:'#CC9966', color:'white'}} 
                            onClick={()=>this.pushUrl()} value ='Search'/>
                        
                        <input type ='button' className=' btn btn-outline-primary mr-2 mt-4 mb-2' style={{backgroundColor:'#258472', color: 'white'}}
                            onClick={this.onResetClicked} value='Reset'/>
                        
                        </div>
                        </div>
                    
                    </div>
                
            </div>
            </div>
        
                
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