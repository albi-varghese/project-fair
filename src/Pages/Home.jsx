import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link,useNavigate} from 'react-router-dom'
import ProjectCard from '../Components/ProjectCard'
import titleImage from '../assets/images/img 1.gif'
import {  ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  getHomeProjectAPI } from '../services/allAPI'
import PropTypes from 'prop-types';


function Home() {
  const[isLoggedIn,setIsLoggedIn]=useState(false)
  const navigate = useNavigate()
  const[allProjects,setAllProjects]=useState([])

  useEffect(()=>{
    getHomeProjects()
    if(sessionStorage.getItem("token")){
      setIsLoggedIn(true)
    }else{
      setIsLoggedIn(false)
    }
  },[])

  const handleProjectsPage=()=>{
    if(sessionStorage.getItem("token")){
      navigate('/projects')
    }else{
      toast.warning("Please login to explore more projects")
    }
  }

  const getHomeProjects=async()=>{
    //api call
    const result = await getHomeProjectAPI()
      console.log(result);
      if(result.status==200){
        setAllProjects(result.data)
      }else{
        console.log(result);
        
      }
  }

  console.log(allProjects);
  

  return (
    <>
    <div style={{height:"90vh",width:"100%"}} className='container-fluid rounded bg-primary'>
        <Row className="align-items-center p-4">
            <Col sm={12} md={6}>
            <h1 style={{fontSize:"80px"}} className='fw-bolder text-light mt-5'> <i className='fa-solid fa-list-check me-2'></i>Project-Fair</h1>
            <p className='text-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta distinctio non impedit itaque iure maiores optio, accusantium labore, illo sed a quis tempore unde nulla, iusto obcaecati quo expedita reprehenderit!</p>

            {
            isLoggedIn?
              <Link to={'/dashboard'} className='btn btn-warning'>Manage Your Projects</Link>:
              <Link to={'/login'} className='btn btn-warning'>Start to Explore</Link> 
            }

            </Col>

            <Col sm={12} md={6}>
            <img src={titleImage} width={"500px"} />
            </Col>

        </Row>

    </div>
    {/*allProjects*/}
    <div className='allProject mt-5'>
        <h1 className='text-center text-primary fw-bolder'>Explore Your Projects</h1>
        <marquee scrollAmount={25} >
        <Row>
          {
            allProjects.length>0?allProjects.map(project => (
              <Col sm={12} md={6} lg={4} key={project.id}>
                <ProjectCard project={project} />
              </Col>
            )):null
          }
        </Row>
        </marquee>
        
    </div>

    <div className="text-center">
      <p className='btn' onClick={handleProjectsPage}>View More Projects</p>
    </div>
    <ToastContainer theme="colored" autoClose={3000} position='top-center' />
    </>
  )
}
ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    // Add other fields as necessary
  }).isRequired,
};

export default Home
