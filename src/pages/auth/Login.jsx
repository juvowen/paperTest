import {supabase} from '../../config/supabaseClient'
import {useNavigate} from 'react-router-dom'

import { useState,useEffect } from "react";

const Login = () =>{
    const [email,setemail] = useState('')
    const [password,setPassword] = useState('')
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

    const SignUpUser = async() =>{
        setLoading(true)
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            })
            if(error){
                console.log(error)
            }else{
                console.log(data)
                navigate('/')
            }
            //console.log()

        } catch (error) {
            console.log('user credentials may be wrong',error)
        }finally{
            setLoading(false)
        }
    }


    if(loading){
        return <div> loading....</div>
    }

    return(
        <div>
            <input
                placeholder="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
            />

            <input
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={SignUpUser}>login</button>
        </div>
    );
}

export default Login