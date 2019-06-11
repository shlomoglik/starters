import m from 'mithril'
import Header from '../commons/Header/Header'
import Bottom from '../commons/Menus/BottomMenu'

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