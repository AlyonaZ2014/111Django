import React from 'react'
import AuthorList from './components/Author.js'
import BookList from './components/Book.js'
import AuthorBookList from './components/AuthorBook.js'
import {BrowserRouter, Route, Switch, Redirect, Link} from 'react-router-dom'
import axios from 'axios'
import LoginForm from './components/Auth.js'
import Cookies from 'universal-cookie';


const NotFound404 = ({ location }) => {
  return (
    <div>
      <h1>Страница по адресу '{location.pathname}' не найдена</h1>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'authors': [],
      'books': [],
      'token': ''
    }
  }
  set_token(token) {
    const cookies = new Cookies()
    cookies.set('token', token)
    this.setState({'token': token}, ()=>this.load_data())
  }
  deleteBook(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/books/${id}`, {headers, headers})
      .then(response => {
        this.setState({books: this.state.books.filter((item)=>item.id !== id)})
      }).catch(error => console.log(error))
  }
  is_authenticated() {
    return this.state.token != ''
  }
  logout() {
    this.set_token('')
  }
  get_token_from_storage() {
    const cookies = new Cookies()
    const token = cookies.get('token')
    this.setState({'token': token}, ()=>this.load_data())
  }
  get_token(username, password) {
      axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username,
  password: password})
    .then(response => {
        this.set_token(response.data['token'])
    }).catch(error => alert('Неверный логин или пароль'))
  }
  get_headers() {
    let headers = {
      'Content-Type': 'application/json'
    }
  if (this.is_authenticated())
    {
      headers['Authorization'] = 'Token ' + this.state.token
    }
    return headers
  }
  load_data() {
    const headers = this.get_headers()
    axios.get('http://127.0.0.1:8000/api/authors/', {headers})
      .then(response => {
        this.setState({authors: response.data})
      }).catch(error => console.log(error))
    axios.get('http://127.0.0.1:8000/api/books/', {headers})
      .then(response => {
        this.setState({books: response.data})
      }).catch(error => {
      console.log(error)
      this.setState({books: []})
      })
  }
  componentDidMount() {
    this.get_token_from_storage()
  }
  createBook(name, author) {
    const headers = this.get_headers()
    const data = {name: name, author: author}
    axios.post(`http://127.0.0.1:8000/api/books/`, data, {headers, headers})
      .then(response => {
        let new_book = response.data
        const author = this.state.authors.filter((item) => item.id === new_book.author)[0]
        new_book.author = author
        this.setState({books: [...this.state.books, new_book]})
      }).catch(error => console.log(error))
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <nav>
            <ul>
              <li>
                <Link to='/'>Authors</Link>
              </li>
              <li>
                <Link to='/books'>Books</Link>
              </li>
              <li>
                            {this.is_authenticated() ? <button
onClick={()=>this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
              </li>
            </ul>
          </nav>
          <Switch>
                    <Route exact path='/' component={() => <AuthorList
items={this.state.authors} />} />
                    <Route exact path='/books' component={() => <BookList
items={this.state.books} />} />
                    <Route exact path='/login' component={() => <LoginForm
get_token={(username, password) => this.get_token(username, password)} />} />
              <Route path="/author/:id">
              <Route exact path='/books/create' component={() => <BookForm
createBook={(name, author) => this.createBook(name, author)} />} />
              <Route exact path='/books/create' component={() => <BookForm />}/>
              <Route exact path='/books/create' component={() => <BookForm
authors={this.state.authors} createBook={(name, author) => this.createBook(name,
author)} />} />
              <Route exact path='/books' component={() => <BookList 
items={this.state.books} deleteBook={(id)=>this.deleteBook(id)} />} />
                <AuthorBookList items={this.state.books} />
              </Route>
              <Redirect from='/authors' to='/' />
              <Route component={NotFound404} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
export default App

// </div>load_data() {
//   axios.get('http://127.0.0.1:8000/api/authors/')
//     .then(response => {
//       this.setState({authors: response.data})
//     }).catch(error => console.log(error))
//   axios.get('http://127.0.0.1:8000/api/books/')
//     .then(response => {
//       this.setState({books: response.data})
//     }).catch(error => console.log(error))
// }

// get_token(username, password) {
//       axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username,
//   password: password})
//     .then(response => {
//       console.log(response.data)
//     }).catch(error => alert('Неверный логин или пароль'))
// }

// componentDidMount() {
//   this.load_data()
// }
//   render() {
//     return (
//       <div className="App">
//         <BrowserRouter>
//           <nav>
//           <ul>
//           <li>
//           <Link to='/'>Authors</Link>
//           </li>
//           <li>
//           <Link to='/books'>Books</Link>
//           </li>
//           <li>
//           <Link to='/login'>Login</Link>
//           </li>
//           </ul>
//           </nav>
//           <Switch>
//             <Route exact path='/' component={() => <AuthorList
//   items={this.state.authors} />} />
//             <Route exact path='/books' component={() => <BookList
//   items={this.state.books} />} />
//             <Route exact path='/login' component={() => <LoginForm
// get_token={(username, password) => this.get_token(username, password)} />} />
//             <Route path="/author/:id">
//             <AuthorBookList items={this.state.books} />
//             </Route>
//             <Redirect from='/authors' to='/' />
//             <Route component={NotFound404} />
//           </Switch>
//         </BrowserRouter>
//       </div>
//     )
//   }
// }
// export default App;




// import request from 'request';
// import React, { Component } from 'react';
// import { BrowserRouter, Routes, Route} from 'react-router-dom';
// import './App.css';
// import UsersList from './components/Users';
// import ProjectList from './components/Projects';
// import ToDoList from './components/ToDo';
// import Header from './components/Menu';
// import Footer from './components/Footer';
// import NotFound404 from './components/NotFound404';
// import ProjectDetail from './components/ProjectDetail';
// import Home from './components/Home';




// class App extends Component {
//   constructor(props) {
//     super(props)
//     const apiPath = 'http://localhost:8000/api/'
//     this.state = {
//       'users': [],
//       'projects': [],
//       'todo': [],
//       'api': [
//         apiPath + 'users',
//         apiPath + 'projects',
//         apiPath + 'todo',
//       ]
//     }
//   }

//   pullData(url) {   
//     let result = [];
//     const key = url.split('/').pop();

//     const _request = (url) => {
//       request(url, (error, response, body) => {
//         _pullData(body);
//       });
//     }

//     const _pullData = function (body) {
//       const parsedData = JSON.parse(body);
//       result.push(...parsedData.results);
//       if (!parsedData.next)
//         return;
//       _request(parsedData.next);
//     }

//     _request(url);

//     return { [key]: result };
//   }

//   componentDidMount() {
//     const pulledData = this.state.api.map(url => {
//       return this.pullData(url);
//     }); 
//     setTimeout(() => {
//       this.setState(Object.assign(...pulledData));
//     }, 500)
//   }

//   render() {
//     return (
//       <div className="sub_body">
//         <div className="top">
//           <BrowserRouter>
//             <Header />
//               <Routes>
//                 <Route path='/' element={<Home/>} />
//                   <Route path='projects' element={<ProjectList projects={this.state.projects}/>} />
//                     <Route path='projects/:id' element={<ProjectDetail projects={this.state.projects}/>} />
//                   <Route path='todo' element={<ToDoList toDoTasks={this.state.todo}
//                     projects={this.state.projects} users={this.state.users}/>} />
//                   <Route path='users' element={<UsersList users={this.state.users}/>} />
//                   <Route path='*' element={<NotFound404 />} />
//               </Routes>
//           </BrowserRouter>
//         </div>
//         <div className="footer bg-light">
//           <Footer />
//         </div>
//       </div>
//     );
//   }
// }

// export default App;