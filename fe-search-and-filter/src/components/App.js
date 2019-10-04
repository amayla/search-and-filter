import React,{Component} from 'react'
import  {Switch,
        Route,
        withRouter,
        } from 'react-router-dom'

import "bootstrap/dist/css/bootstrap.min.css"
import filterBE from './filterBE'


class App extends Component{
    render(){
        return(
          
                <Switch>
                    <Route component={filterBE} path="/"/>{/*//define / solely for home*/}
                </Switch>
            
        )
    }
}

export default withRouter(App)