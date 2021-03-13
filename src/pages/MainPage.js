import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { Container,TextField} from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import ExchangeItem from '../components/ExchangeItem'
import { GET_EXCHANGES_FILTER } from '../queries/queries'

const MainPage = () => {

  const [page, setPage] = useState(1)
  const [input, setInput] = useState('')
  const { data } =  useQuery(GET_EXCHANGES_FILTER, {
    variables: {
      name: input,
      offset: page - 1,
    }
  })

  const changeFilter = (value) => {
    setPage(1)
    setInput(value)
  }

  const exchangesCount = data ? data.cryptoStockExchanges.cryptoStockExchanges.length : null
  const pagesCount = exchangesCount && exchangesCount < 5 ? 1 : 30

  return (  
    <Container maxWidth="sm">
      <TextField 
        style={{marginBottom: '10px', width: "100%"}}
        onChange={(event) => changeFilter(event.target.value)}
        id="standard-basic" 
        label="Filter exchanges" 
      />
      {
        data &&
          data.cryptoStockExchanges.cryptoStockExchanges.map(item => {
            return <ExchangeItem exchange={item} key={item.exchange_id}/>
          })         
      } 
      <Pagination 
        style={{display: exchangesCount ? "block": "none"}}
        size="large"
        onChange={(event, page) => setPage(page * 5)}
        page={page === 1 ? page : (page / 5)}
        count={pagesCount} 
        color="primary" 
      />   
    </Container>
  )
}

export default MainPage