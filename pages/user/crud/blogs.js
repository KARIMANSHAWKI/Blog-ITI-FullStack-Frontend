import Layout from "../../../components/Layout";
import Private from "../../../components/auth/private";
import ReadBlogs from "../../../components/crud/ReadBlogs";
import {isAuth} from "../../../actions/auth"

const username = isAuth() && isAuth().username

const Blog = () => {
  return (
    <Layout>
      <Private>
        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Manage Blogs</h2>
            </div>
            <div className="col-md-12">
               <ReadBlogs username={username} />
            </div>
          
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default Blog;
