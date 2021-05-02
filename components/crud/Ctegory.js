import React, { useState, useEffect } from "react";
import { getCookie } from "../../actions/auth";
import { create, getCategories, removeCategory } from "../../actions/category";

const Category = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    categories: [],
    removed: false,
    reload: false,
  });

  const { name, error, success, categories, removed, reload } = values;
  const token = getCookie("token");

  useEffect(() => {
    loadCategories();
  }, [reload]);

  //   ******************** Component Functions **********************

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, categories: data });
      }
    });
  };

  const showCategories = () => {
    return categories.map((c, i) => {
      return (
        <button
        onDoubleClick={() => confirmDelete(c.slug)}
          title="Double Click To Remove"
          key={i}
          className="btn btn-outline-primary mr-1 ml-1 mt-3"
        >
          {c.name}
        </button>
      );
    });
  };

  const confirmDelete = (slug) => {
    let answer = window.confirm(
      "Are You Sure You want to Delete This Catetegory?"
    );
    if (answer) {
      deleteCategory(slug);
    }
  };

  const deleteCategory = (slug) => {
    removeCategory(slug, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({
          ...values,
          error: false,
          success: false,
          name: "",
          removed: !removed,
          reload: !reload,
        });
      }
    });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    create({ name }, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          error: false,
          success: true,
          name: "",
          removed: removed,
          reload: !reload,
        });
      }
    });
  };

  const handelChange = (e) => {
    setValues({
      ...values,
      name: e.target.value,
      error: false,
      success: false,
      removed: "",
    });
  };

  const showSuccess = () => {
    if (success) {
      return <p className="text-success">Category Is Created Successfully</p>;
    }
  };

  const showError = () => {
    if (error) {
      return <p className="text-danger">Category Already Exist !</p>;
    }
  };

  const showRemoved = () => {
    if (removed) {
      return <p className="text-danger">Category Is Removed !</p>;
    }
  };

  const handleMouseLeave = () => {
    setValues({ ...values, error: false, success: false, removed: "" });
  };

  // ****************************** Components ************************************
  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handelChange}
          value={name}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
  );

  return (
    <React.Fragment>
      {showSuccess()}
      {showError()}
      {showRemoved()}
      <div onMouseMove={handleMouseLeave}>
        {newCategoryForm()}
        {showCategories()}
      </div>
    </React.Fragment>
  );
};

export default Category;
