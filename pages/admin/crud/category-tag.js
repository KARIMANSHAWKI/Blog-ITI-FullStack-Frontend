import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/admin";

import Category from '../../../components/crud/Ctegory';
import Tag from '../../../components/crud/Tag';


const CategoryTag = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Manage Category</h2>
            </div>
            <div className="col-md-4">
               <Category />
            </div>
            <div className="col-md-8">
              <Tag />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default CategoryTag;
