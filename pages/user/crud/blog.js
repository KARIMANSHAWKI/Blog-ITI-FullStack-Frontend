import Layout from "../../../components/Layout";
import BlogCreate from "../../../components/crud/BlogCreate";
import Private from '../../../components/auth/private';



const CeateBlog = () => {
  return (
    <Layout>
      <Private>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Create Blog</h2>
            </div>
            <div className="col-md-12">
               <BlogCreate />
            </div>
          
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default CeateBlog;
