import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState('')
  const [datetime, setDatetime] = useState('')
  const [description, setDescription] = useState('')
  const [transactions, setTransactions] = useState('')

  useEffect(() => {
    getTransactions().then((transactions) => {
      setTransactions(transactions)
    })
  }, [])

  async function getTransactions() {
    const url = process.env.REACT_APP_API_URL + '/transactions'
    const response = await fetch(url)
    return await response.json()
  }

  function addNewTransaction(event) {
    event.preventDefault()
    const url = process.env.REACT_APP_API_URL + '/transaction'
    const price = (name.split(' ')[0])
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        price,
        name: name.substring(price.length + 1),
        description,
        datetime,
      }),
    }).then((response) => {
      response.json().then((json) => {
        setName('')
        setDatetime('')
        setDescription('')
        console.log(json)
      })
    })
  }

  let balance =0;
  for(let transaction of transactions){
    balance+= transaction.price
  }
  let total = balance.toFixed(2).split('.')
  balance = total[0]
  const fraction = total[1]
  return (
    <main>
      <h1>
        ${balance}
        <span>{fraction}</span>
      </h1>
      <form onSubmit={addNewTransaction}>
        <div className='basic'>
          <input
            type='text'
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={'+200 new Samsung Tv'}
          />
          <input
            value={datetime}
            onChange={(event) => setDatetime(event.target.value)}
            type='datetime-local'
          />
        </div>
        <div className='description'>
          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            type='text'
            placeholder={'description'}
          />
        </div>
        <button type='submit'>Add new transaction</button>
      </form>
      <div className='transactions'>
        {transactions.length > 0 &&
          transactions.map((transaction, index) => (
            <div key={index} className='transaction'>
              <div className='left'>
                <div className='name'>{transaction.name}</div>
                <div className='description'>{transaction.description}</div>
              </div>
              <div className='right'>
                <div
                  className={
                    'price ' + (transaction.price < 0 ? 'red' : 'green')
                  }
                >
                  {transaction.price}
                </div>
                <div className='datetime'>{transaction.datetime}</div>
              </div>
            </div>
          ))}
      </div>
    </main>
  )
}

export default App
