import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import DetailPage from './pages/DetailPage'
import Header from './components/Header'
import MainPage from './pages/MainPage'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <Header/>
          <Route path="/" exact render={(props) => <MainPage {...props}/>}/>
          <Route path="/exchange/:id" render={(props) => <DetailPage {...props}/>}/>
      </ApolloProvider>
    </Router>
  )
}

export default App
