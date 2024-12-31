import { useContext, useState } from 'react'
import { Form } from 'react-bootstrap'
import PropTypes from 'prop-types';
import {  Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../services/allAPI';
import { TokenAuthContext } from '../ContextAPI/TokenAuth';

function Auth({register}) {
    const {isAuthorized,setIsAuthorized}=useContext(TokenAuthContext)
    const isRegisterForm=register ? true:false
    const navigate=useNavigate()
    const [userData,setUserData]=useState({
        username:"",email:"",password:""
    })

    const handleRegister=async(e)=>{
        e.preventDefault()
        const{username,email,password}=userData

        if(!username || !email || !password){
            toast.info("Please fill the missing fields")
        }else{
            const result = await registerAPI(userData)
            console.log(result);
            if(result.status==200){
                toast.success(`${result.data.username} has successfully registered`)
                navigate('/login')
                setUserData({username:"",email:"",password:""})
            }else{
                toast.warning(result.response.data)
            }
            
        }
    }

    const handleLogin=async(e)=>{
        e.preventDefault()
        const {email,password}=userData
        if( !email || !password){
            toast.info("Please fill missing fields")
        }else{
            try{
                const result = await loginAPI({email,password})
                if(result.status==200){
                    sessionStorage.setItem("username",result.data.existingUser.username)
                    sessionStorage.setItem("token",result.data.token)
                    setIsAuthorized(true)
                    navigate('/')
                    setUserData({username:"",email:"",password:""})
                }else{
                    toast.warning(result.response.data)
                }
            }catch(err){
                console.log(err);
                
            }
        }
    }

    console.log(userData);

return (
    <>
    <div className="d-flex justify-content-center align-items-center">
        <div className="w-75 container">
            <Link to={'/'} style={{textDecoration:'none',color:'blue',fontWeight:"bolder"}}><i class='fa-solid fa-arrow-left me-2'></i>Back to Home</Link>
            <div className="card shadow p-5 bg-primary">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <img src="https://airproductionservice.com/wp-content/uploads/2021/05/Login.jpg" alt="" width={"100%"} className='rounded-start'/>
                    </div>

                    <div className="col-lg-6">
                        <div className="d-flex align-items-center flex-column">
                            <h1 className='fw-bolder text-light mt-2'><i className='fa-solid fa-list-check me-2'></i>Project-Fair</h1>
                            <h5 className='text-light fw-bolder text-center'>
                                {
                                    isRegisterForm?'Sign-Up to your Account':'Login to your Account'
                                }
                            </h5>
                            <Form className='text-lighter w-180'>
                                {
                                    isRegisterForm&&<Form.Group className="mb-3" controlId="exampleForm.ControlInputName">
                                    <Form.Control type="text" placeholder="Enter your name" onChange={e=>setUserData({...userData,username:e.target.value})} value={userData.username} />
                                    </Form.Group>
                                }
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInputemail">
                                    <Form.Control type="email" placeholder="Enter your email" onChange={e=>setUserData({...userData,email:e.target.value})} value={userData.email} />
                                    </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInputpswd">
                                    <Form.Control type="password" placeholder="Enter your password" onChange={e=>setUserData({...userData,password:e.target.value})} value={userData.password} />
                                    </Form.Group>

                                    {
                                        isRegisterForm?
                                        <div className="mt-3">
                                            <button className='btn btn-warning text-light' onClick={handleRegister}>Register</button>
                                            <p>Already have an Account?Click here to <Link to={'/login'} style={{textDecoration:"none",color:"light green"}}>Login</Link></p>
                                        </div>:
                                        <div className="mt-3">
                                            <button className='btn btn-success text-light' onClick={handleLogin}>Login</button>
                                            <p>New User? Click here to <Link to={'/register'} style={{textDecoration:"none",color:"red"}}>Register</Link></p>
                                        </div>

                                    }
                            
                            </Form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <ToastContainer theme='colored' autoClose={3000} />
    </>
  )
}
Auth.propTypes = {
    register: PropTypes.bool.isRequired,
};

export default Auth
