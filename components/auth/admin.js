import React, { useEffect } from 'react';
import Router  from 'next/router';
import { isAuth } from '../../actions/auth';

const Admin = ({children}) =>{
        useEffect(()=>{
            if(!isAuth()){
                Router.push('/signin')
            } else if (isAuth() && isAuth().role !== 1){

            }
        },[]);


    return <React.Fragment>{children}</React.Fragment>

}


export default Admin;