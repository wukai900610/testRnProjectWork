import {combineReducers} from 'redux'
import homePage from './homePage'
import listPage from './listPage'
import gsListPage from './gsListPage'

export default combineReducers({
  homePage,
  listPage,
  gsListPage
})
