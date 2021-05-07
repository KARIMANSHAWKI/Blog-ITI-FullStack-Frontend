import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { singleBlog } from "../../actions/blog";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import React, { useState } from "react";
import moment from "moment";
import renderHTML from 'react-render-html';

const SingleBlog = ({ blog }) => {
  const showCategories = (blog) =>
    blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
      </Link>
    ));

  const showTags = (blog) =>
    blog.tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
      </Link>
    ));

  return (
    <React.Fragment>
      <Layout>
        <main>
          <article>
            <div className="container-fluid">
              <section>
                <div className="row" style={{ marginTop: "-30px" }}>
                  <img
                    src={`${API}/api/blog/photo/${blog.slug}`}
                    alt={blog.title}
                    className="img img-fluid featured-image"
                  />
                </div>
              </section>

              <section>
                <p className="lead pt-3 mark">
                  Written by {blog.postedBy.name} | Published{" "}
                  {moment(blog.updatedAt).fromNow()}
                </p>

                <div className="pb-3">
                  {showCategories(blog)}
                  {showTags(blog)}
                </div>
              </section>
            </div>

            <div className="container">
                <section>
                    <div className="col-md-12 lead">{renderHTML(blog.body)}</div>
                </section>
            </div>

            <div className="container pt-3">
                <h4 className="text-center pt-5 pb-5 h2"> Related Blogs</h4>
                <hr/>
                <p>show related blogs</p>
            </div>

            <div className="container pt-3">
                <p>show comments</p>
            </div>
          </article>
        </main>
      </Layout>
    </React.Fragment>
  );
};

SingleBlog.getInitialProps = ({ query }) => {
  return singleBlog(query.slug).then((data) => {
    if (data.error) {
      console.log(error);
    } else {
      return { blog: data };
    }
  });
};

export default SingleBlog;
