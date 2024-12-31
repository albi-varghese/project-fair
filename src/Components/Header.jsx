import { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { TokenAuthContext } from '../ContextAPI/TokenAuth'


function Header({insideDashboard}) {
  const navigate = useNavigate()
  const{isAuthorized,setIsAuthorized}=useContext(TokenAuthContext)

  const logOut=()=>{
    sessionStorage.removeItem("username")
    sessionStorage.removeItem("link")
    setIsAuthorized(false)
    navigate('/')
  }

  return (
    <>
    <Navbar className="bg-primary">
        <Container>
          <Navbar.Brand >
            <Link to={'/'} style={{textDecoration:"none",color:"white"}}><i className='fa-solid fa-list-check me-2'></i>Project-Fair</Link>
          </Navbar.Brand>
          {insideDashboard && <button onClick={logOut} className='btn btn-warning rounded'>Logout</button>}
        </Container>
      </Navbar>
      
    </>
  )
}

export default Header
