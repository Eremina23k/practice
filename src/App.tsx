import './App.css'
import './index.css'
import Button from './components/Button'
import { useState } from 'react'
// import A from './components/ListOutput'

export default function App() {
  const [content, setContent] = useState('')
  function handleClick (type: string) {
    console.log('click', type)
    setContent(type)
  }

  
    const users = [
      { id: 1, name: 'Анна', email: 'anna@mail.com' },
      { id: 2, name: 'Олег', email: 'oleg@mail.com' },
    ]

  return (
    <>
      <header><h3>Турслет</h3></header>
      <div>
        <Button click={() => handleClick('выбор списка')}>Списки</Button>
        <Button click={() => handleClick('победители')}>Победители</Button>
        <h5>{content}</h5>
      </div>
      {/* <A /> */}
      <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Имя</th>
          <th>Эл.почта</th>
        </tr>
      </thead>
      <tbody>
        {users.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  )
}
