
import Layout from '../components/Layout';
import SignInComponent from '../components/auth/SignInComponent'


const Signin = () => {
    return(
       <Layout>
           <h1 className="text-center">SignIn Page</h1>
           <div className="row">
               <div className="col-md-6 offset-md-3">
               <SignInComponent />
               </div>
           </div>
       </Layout>
    )
}

export default Signin;