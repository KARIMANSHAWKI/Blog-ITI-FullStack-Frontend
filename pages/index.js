import Layout from '../components/Layout';
import Link from 'next/link'


const index = () => {
    return(
        <Layout>
            <h1>Home</h1>
            <Link href="/signup">
                <a>SignUp</a>
            </Link>
        </Layout>
    )
}

export default index;