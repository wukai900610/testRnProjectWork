import {combineReducers} from 'redux'
import homePage from './homePage'
import listPage from './listPage'
import gsListPage from './gsListPage'
import hhbListPage from './hhbListPage'

export default combineReducers({
  homePage,
  listPage,
  gsListPage,
  hhbListPage
})
