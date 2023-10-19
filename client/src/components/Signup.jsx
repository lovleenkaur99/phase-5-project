
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const SIGNUP_POST = { 
    "Content-Type" : "application/json",
    "Accept" : "application/json"
} 

const URL = "http://localhost:5555/api/v1"

function Signup(){ 

    const [currentUser, setCurrentUser] = useState("")

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

  // EVENTS //

    const handleChangeUsername = e => setUsername(e.target.value)
    const handleChangePassword = e => setPassword(e.target.value)

    async function trySignup() { 
        await fetch(URL + "/players", { 
            method : "POST",
            // headers : SIGNUP_POST,
            body : JSON.stringify({ 
                "username": username, 
                "password": password })
        })
        .then(res => res.json())
        .then(new_user => {
            setCurrentUser(new_user)
            alert(`Hi there, ${new_user.username}! Good to see you.`)
        })
        .catch(err => alert("Invalid signup!"))
    } 



    function handleSubmit(e) {
        e.preventDefault()
        trySignup()
        handleNavigate()
        } 
    
    function handleNavigate(){ 
        if (username == "" || password == "") { 
            return null 
        } 
        navigate('/category')
        
    }
    
    return ( 
        <div className="signup-display">

            <form className="form" onSubmit={handleSubmit} > 
                <label htmlFor="username">Username:</label><br/>
                <input type="text" username="username" onChange={handleChangeUsername} value={username} ></input><br/>
                <label htmlFor="password">Password:</label><br/>
                <input type="text" password="password" onChange={handleChangePassword} value={password}></input><br/>
                <button className="signup-button"  >Signup</button><br/>
                <button className="login-button" onClick={() => navigate("/login")}>Login</button>
            </form>
            
        </div>
    )
}

export default Signup
