import { Component } from 'react';
import TodoList from '../TodoList/TodoList';
import TodoAdd from '../TodoAdd/TodoAdd';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import TodoDetail from '../TodoDetail/TodoDetail';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Register from '../../Register';
import Logout from '../../logout';
import Login from '../../login';
import firebase from '../../firebase';
import { getList } from '../../api';
import { setDone } from '../../api';
import { del } from '../../api';




export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      showMenu: false,
      currentUser: undefined,
    };
    this.setDone = this.setDone.bind(this);
    this.setDelete = this.setDelete.bind(this);
    this.setAdd = this.setAdd.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.getDeed = this.getDeed.bind(this);
    this.authStateChanged = this.authStateChanged.bind(this);
  }


  async authStateChanged(user) {
    this.setState(() => ({currentUser: user }));
    if (user) {
      const newData = await getList(user);
      this.setState(() => ({data: newData}));
    } else 
      this.setState(() => ({data: []}));
  }

  componentDidMount() {
    onAuthStateChanged(getAuth(firebase), this.authStateChanged);
  }

  getDeed(key) {
    return this.state.data.find((current) => current.key === key);
  }

  showMenu(evt) {
    evt.preventDefault();
    this.setState((state) => ({showMenu: !state.showMenu}))
  }

  async setDone (key) {
    await setDone(this.state.currentUser, key)
    const deed = this.state.data.find((current) => current.key === key);
    if (deed) {
      deed.done = true;
    this.setState(() => ({}));
    }
  }

  async setDelete (key) {
    await del(this.state.currentUser, key)
    const newData = this.state.data.filter(current => current.key !== key);
    this.setState(() => ({data: newData}));
  }


  setAdd = (deed) => {
    this.state.data.push(deed);
    this.setState(() => ({}));
  }


  render() {
    return (
     <HashRouter>
      <nav className="navbar is-light">
        <div className="navbar-brand">
          <NavLink 
            to="/"
            className={({ isActive }) => 
            'navbar-item is-uppercase' + (isActive ? 'is-active' : '')}>
            {this.state.currentUser ? this.state.currentUser.email : 'Todos'}
          </NavLink>
          <a href="/"
            className={this.state.showMenu ? 'navbar-burger is-active' : 'navbar-burger'}
            onClick={this.showMenu}>
              <span></span>
              <span></span>
              <span></span>
            </a>
        </div>
        <div className={this.state.showMenu ? 'navbar-menu is-active' : 'navbar-menu'}
            onClick={this.showMenu}>
          <div className="navbar-start">
            {this.state.currentUser && (
              <NavLink
                to="/add"
                className={({isActive}) =>
               'navbar-item' + (isActive ? 'is-active' : '')}>
                Создать дело
            </NavLink>
            )}
            {!this.state.currentUser && (
              <NavLink 
                to='/login'
                className={({isActive}) => 'navbar-item' + (isActive ? 'is-active' : '')}>
                Войти
              </NavLink>
            )}
            {!this.state.currentUser && (
              <NavLink 
                to="/register"
                className={({isActive }) => "navbar-item" + (isActive ? 'is-active' : '')}>
                Зарегистрироваться
              </NavLink>
            )}
          </div>
          {this.state.currentUser && (
              <div className="navbar-end">
                <NavLink 
                  to="/logout"
                  className={({isActive}) => 'navbar-item' + (isActive ? 'is-active' : '')}>
                  Выйти
                </NavLink>
              </div>
            )}
        </div>
      </nav>
      <main className="content px-6 mt-6">
        <Routes>
          <Route path='/' element={
            <TodoList 
            list={this.state.data} 
            setDone={this.setDone} 
            setDelete={this.setDelete}/>
          } />
          <Route path='/add' element={
            <TodoAdd 
            setAdd={this.setAdd} currentUser={this.state.currentUser}/>
          }></Route>
          <Route 
            path='/:key'
            element={
              <TodoDetail getDeed={this.getDeed}/>
          }/>
           <Route 
            path='/register'
            element={
              <Register currentUser={this.state.currentUser}/>
          }/>
          <Route 
            path='/logout'
            element={
              <Logout currentUser={this.state.currentUser}/>
          }/>
          <Route 
            path='/login'
            element={
              <Login currentUser={this.state.currentUser}/>
          }/>
        </Routes>
      </main>
     </HashRouter>
    )
  }
}