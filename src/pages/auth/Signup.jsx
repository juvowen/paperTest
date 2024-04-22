import {supabase} from '../../config/supabaseClient'
import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
//create new user
const Signup = () =>{
    //const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name,setName] = useState('')
    //const [user,setUser] = useState('')
    //const [session,setSession] = useState(null)
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()


    useEffect(()=>{
        checkIfUser()
    },[])

    const checkIfUser = async() =>{
        setLoading(true)
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if(user){
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    const SignUpWithEmailPassword = async() =>{
        setLoading(true)
        try {
            const {data,error} = await supabase.auth.signUp({
                email : email,
                password : password,
                options:{
                    data:{
                        name:name,
                        avatar_url:'nanasc'
                    }
                }
            })
            if(error){
                console.log(error)
            }else{
                console.log(data)
                navigate('/')
            }   
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }



    return(
        <div>
            <input
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
            />
            
            <input
                type='text'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
            />
            
            <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='full name'
            />

            <button onClick={SignUpWithEmailPassword}>Sign Up</button>
        </div>
    );
}

export default Signup