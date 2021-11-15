import React, {  Fragment } from "react";
import { ChakraProvider, Container }  from "@chakra-ui/react"
import { connect } from 'react-redux';
import { handleInitialData} from '../actions/shared';
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom';
import Home from "./Home";
import NavBar from './NavBar';
import Login from './Login';
import Leaderboard from "./Leaderboard";
import NewQuestion from "./NewQuestion";
import NoMatch from "./NoMatch";
import Card from './Card';


class App extends React.Component {
  componentDidMount() { 
    this.props.handleInitialData(); 
  } 
  render() {
    const { authUser } = this.props;
  return (
    <ChakraProvider>
    <Router>
    <div className="App">
    {authUser === null ? (
            <Route
              render={() => (
                <Container>
                  <Login />
                </Container>
              )}
            />
          ) : (
            <Fragment>
       <NavBar />
        <Switch>
          <Route path ="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/questions/:question_id" component={Card} />
          <Route path="/add" component={NewQuestion} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route component={NoMatch} />
            <Redirect exact from="/" to="/home" />
            
        </Switch>
     </Fragment>    
          )}
    </div>
    </Router>
    </ChakraProvider>
  );
}
}

//const PrivateRoute = ({ component: Component, ...rest }) => {
 // const authed = !!rest.authUser;
 // return (
 //   <Route
 //     {...rest}
    //  render={props =>
    ///    authed ? (
    //     <Component {...props} />
     //   ) : (
     //     <Redirect
     //       to={{
       //       pathname: '/home',
        //      state: { from: props.location.pathname },
       //     }}
       //   />
    //    )
  //    }
  //  />
//  );
//};


function mapStateToProps({ authUser }) {
  return {
    authUser
  };
}


export default connect( mapStateToProps,
  { handleInitialData })(App);
