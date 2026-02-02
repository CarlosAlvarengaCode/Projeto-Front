
import './App.css'
import { Link } from 'react-router-dom'
function Menu() {

  return (
    <>
   <nav className='Menu'>
    <ul>
      <li>
        <Link to ='/'>home</Link>
      </li>
        <li>
        <Link to='/about'>about</Link>
        </li>
        <li>
          <Link to='/posts'>Posts</Link>
      </li>
      <li>
        < Link to='/posts/10'>Posts 10</Link>
      </li>
    </ul>
   </nav>
     
    </>
  )
}

export default Menu