import Layout from '../../components/Layout';
import Link from 'next/link'
import Private from '../../components/auth/admin';



const AdminINdex = () => {
    return(
        <Layout>
            <Private>  <h2>Admin Dashboard</h2></Private>
        </Layout>
    )
}

export default AdminINdex;