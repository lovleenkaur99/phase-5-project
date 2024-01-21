import { useNavigate } from "react-router-dom"
import { useState } from "react"


function Login(){ 
    
    const URL = "http://localhost:5555/api/v1"
    

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

  // EVENTS //

    const [existingUser, setExistingUser] =useState("")

    const handleChangeUsername = e => setUsername(e.target.value)
    const handleChangePassword = e => setPassword(e.target.value)

    async function tryLogin() { 
        await fetch(URL + "/players", { 
            method : "POST",
            // headers : SIGNUP_POST,
            body : JSON.stringify({ 
                "username": username, 
                "password": password })
        })
        .then(res => res.json())
        .then(new_user => {
            setExistingUser(new_user)
            alert(`Hi there, ${new_user.username}! Good to see you.`)
        })
        .catch(err => alert("Invalid login!"))
    } 



    function handleLogin(e) {
        e.preventDefault()
        tryLogin()
        handleNavigate()
        } 

    function handleNavigate(){ 
        if (username == "" || password == "") { 
            return null 
        } 
        navigate('/category')
    }
    

    const navigate = useNavigate()
    return ( 
        <div className="login-display">
            <form onSubmit={handleLogin}>
                <label htmlFor="username">Username:</label><br/>
                <input type="text" username="username" onChange={handleChangeUsername}></input><br/>
                <label htmlFor="password">Password:</label><br/>
                <input type="password" password="password" onChange={handleChangePassword} ></input><br/>
                <button className="login-button2" >Login</button><br/>
                <button className="logout" onClick={() => navigate("/")}>Logout</button>
            </form>
        </div>
    )
}

export default Login