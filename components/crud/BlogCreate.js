import { Link } from "next/link";
import { useEffect, useState } from "react";
import { Router } from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { createBlog } from "../../actions/blog";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../node_modules/react-quill/dist/quill.snow.css";
// **************************************************************** //

const BlogCreate = ({ router }) => {

  const blogFormLS = () => {
    if(typeof window === 'undefined'){
      return false;
    }

    if(localStorage.getItem('blog')){
      return JSON.parse(localStorage.getItem('blog'));
    }else {
      return false;
    }
  }

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [checked, setChecked] = useState([]);  //Categories
  const [checkedTag, setCheckedTag] = useState([]);  //Tags

  

  const [body, setBody] = useState(blogFormLS());
  const [values, setValues] = useState({
    error: "",
    sizeError: "",
    success: "",
    formData: "",
    title: "",
    hidePublishButton: false,
  });

  const token = getCookie('token')

  const {
    error,
    sizeError,
    success,
    formData,
    title,
    hidePublishButton,
  } = values;

  useEffect(()=>{

    setValues({ ...values, formData: new FormData() });
    initCategories()
    initTags()

  },router)

  // ************* get tags and categories from backend *********** //
  const initCategories = () =>{
    getCategories().then(data =>{
      if(data.error){
        setValues({...values, error: data.error})
      } else{
        setCategories(data)
      }
    })
  }

  const initTags = () =>{
    getTags().then(data =>{
      if(data.error){
        setValues({...values, error: data.error})
      } else{
        setTags(data)
      }
    })
  }

  // ****************************** Blog Form Functions **************************** 
  const publishBlog = (e) => {
    e.preventDefault();

    createBlog(formData, token).then((data)=>{
      if(data.error){
        setValues({...values, error : data.error})
      } else {
        setValues({ ...values, title: ' ', error: '', success: `A new blog titled "${data.title}" is created` });
        setBody('');
        setCategories([]);
        setTags([])
      }
    })
  };


  const handleChange = (name) => (e) => {
    const value = name === 'photo'? e.target.files[0] : e.target.value;
    formData.set(name, value)
    setValues({...values, [name]: value, formData, error: ''})

  };

  const handleBody = (e) => {
    setBody(e);
    formData.set('body', e);
    if(typeof window !== undefined){
      localStorage.setItem('blog', JSON.stringify(e))

    }
  };
  // ********************* Craete Categories And Tag Menue ***********//
  const handlToggle = c => () =>{
    setValues({...values, error: ''});
    const clickedCategory = checked.indexOf(c);
    const all = [...checked];

    if(clickedCategory === -1){
      all.push(c)
    } else {
      all.splice(clickedCategory, 1)
    }

    console.log(all);
    setChecked(all);
    formData.set('categories', all)
  }

  const handlToggleTag = t => () =>{
    setValues({...values, error: ''});
    const clickedTag = checked.indexOf(t);
    const all = [...checkedTag];

    if(clickedTag === -1){
      all.push(t)
    } else {
      all.splice(clickedTag, 1)
    }

    console.log(all);
    setCheckedTag(all);
    formData.set('tags', all)
  }

  const showCategories = () => {
    return (
        categories &&
        categories.map((c, i) => (
            <li key={i} className="list-unstyled">
                <input onChange={handlToggle(c._id)} type="checkbox" className="mr-2" />
                <label className="form-check-label">{c.name}</label>
            </li>
        ))
    );
};
  const showTags = () => {
    return(
      tags && 
      tags.map((t, i)=> (
        <li key={i} className="list-unstyled">
              <input onChange={handlToggleTag(t._id)} type="checkbox" className="mr-2" />
              <label className="form-check-label">{t.name}</label>
        </li>
      ))
    );
}
  

  // ********************** Blog Form ************************ //
  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className="form-group">
          <label className="text-muted">Title</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange("title")}
          />
        </div>

        <div className="form-group">
          <ReactQuill
             modules={BlogCreate.modules}
             formats={BlogCreate.formats}
            value={body}
            placeholder="Write something amazing ....."
            onChange={handleBody}
          />
        </div>

        <div>
          <button type="submit" className="btn btn-primary">
            Publish
          </button>
        </div>
      </form>
    );
  };

  // ***************************** Main Component ***************************
  return(
    <div className="container">
      <div className="row">

      <div className="col-md-8">
          <ul>{createBlogForm()}</ul>
      </div>

      <div className="col-md-4">
        <div>
            <h5>Featured Image</h5>
             <hr />

             <small style={{display : 'block'}} className="text-muted">Max Size : 1mb</small>
             <label className="btn btn-outline-info">Upload featured image
                   <input onChange={handleChange('photo')} type="file"  accept="image/*" hidden />
            </label>
        </div>
        <div>
            <h5>Categories</h5>
            <hr />
             <ul style={{maxHeight: '200px', overflowY:'scroll'}}>{showCategories()}</ul>
            
        </div>

         <div>
         <h5>Tags</h5>
         <hr />
         <ul style={{maxHeight: '200px', overflowY:'scroll'}}> {showTags()}</ul>
         </div>

      </div>
      </div>
      
     

    </div>
  )
};

BlogCreate.modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        ['clean'],
        ['code-block']
    ]
};

BlogCreate.formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'code-block'
];


export default withRouter(BlogCreate);