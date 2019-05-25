import m from 'mithril'
import Header from '../Header/Header'
import Bottom from '../commons/BottomMenu'
import Search from './Search'

module.exports = {
    view: (vnode) => {
      return (
        <div class="container--search">
          <Header title="חיפוש"/>
          {/* <main class="mySearch">
               <Search/> 
          </main> */}
          <Bottom /> 
        </div>
      )
    }
}