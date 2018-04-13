import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import axios from 'axios'
import { clearAuthTokens, saveAuthTokens, setAxiosDefaults, userIsLoggedIn } from "./util/SessionHeaderUtil"
import SignUpLogIn from './components/SignUpLogIn'
import Home from './components/Home'
import TopicShowPage from './components/TopicShowPage'


class App extends Component {
  state = {
    signedIn: false,
    topics: []
  }


  async componentDidMount() {
    try {
      const signedIn = userIsLoggedIn()
      
      if (signedIn) {
        setAxiosDefaults()
      }

      this.setState({
        signedIn
      })
    } catch (error) {
      console.log(error)
    }
    await this.getTopics()

  }

  signUp = async (email, password, password_confirmation) => {
    try {
      const payload = {
        email: email,
        password: password,
        password_confirmation: password_confirmation
      }
      const response = await axios.post('/auth', payload)
      saveAuthTokens(response.headers)

      this.setState({
        signedIn: true,
      })

    } catch (error) {
      console.log(error)
    }
  }

  signIn = async (email, password) => {
    try {
      const payload = {
        email,
        password
      }
      const response = await axios.post('/auth/sign_in', payload)
      saveAuthTokens(response.headers)


      // const posts = await this.getPosts()

      this.setState({
        signedIn: true,
        // posts
      })

    } catch (error) {
      console.log(error)
    }
  }


  signOut = async (event) => {
    try {
      event.preventDefault()

      await axios.delete('/auth/sign_out')

      clearAuthTokens();

      this.setState({ signedIn: false })
    } catch (error) {
      console.log(error)
    }
  }

  getTopics = async () => {
    const res = await axios.get('/api/topics')
    // console.log(res.data)
    this.setState({topics: res.data})
  }


  render() {

    const SignUpLogInComponent = () => (
      <SignUpLogIn
        signUp={this.signUp}
        signIn={this.signIn} />
    )

    const HomeWrapper = () => {
      return <Home topics={this.state.topics} getTopics={this.getTopics}/>
    }

    const ShowTopicWrapper = (props) => {
      return <TopicShowPage topics={this.state.topics} {...props}/>
    }

    return (
      <Router>
        <div>
          <button onClick={this.signOut}>Sign Out</button>
          <Switch>
            <Route exact path="/signUp" render={SignUpLogInComponent} />
            <Route exact path="/home" render={HomeWrapper} />
            <Route exact path="/topics/:id" render={ShowTopicWrapper} />
          </Switch>
          {this.state.signedIn ? <Redirect to='/home' /> : <Redirect to="/signUp" />}
          
        </div>
      </Router>
    )
  }
}

export default App;
