import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { listBlogWithTagsAndCategory } from "../../actions/blog";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import { withRouter } from "next/router";
import React , {useState} from "react";
import Card from "../../components/blog/Card";


const Blogs = ({ blogs, categories, tags, totalBlogs,blogsLimit,blogSkip, router }) => {

  const head = () => (
    <Head>
      <title>Programming blogs | {APP_NAME}</title>
      <meta
        name="description"
        content="Programming blogs and tutorials on react node next vue php laravel and web developoment"
      />

      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
      <meta
        property="og:title"
        content={`Latest web developoment tutorials | ${APP_NAME}`}
      />

      <meta
        property="og:description"
        content="Programming blogs and tutorials on react node next vue php laravel and web developoment"
      />

      <meta property="og:type" content="webiste" />
      <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta property="og:image" content={`${DOMAIN}/static/images/blog.jpg`} />
      <meta
        property="og:image:secure_url"
        content={`${DOMAIN}/static/images/blog.jpg`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );



  const [limit, setLimit] = useState(blogsLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([])

  const loadMore = () => {
    let toSkip = skip + limit;
    listBlogWithTagsAndCategory(toSkip, limit).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            setLoadedBlogs([...loadedBlogs, ...data.blogs]);
            setSize(data.size);
            setSkip(toSkip);
        }
    });
};

const loadMoreButton = () => {
  return (
      size > 0 &&
      size >= limit && (
          <button onClick={loadMore} className="btn btn-outline-primary btn-lg">
              Load more
          </button>
      )
  );
};

  const showBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <article>
          <Card blog={blog} />
        </article>
      );
    });
  };

  const showAllCategories = () => {
    return categories.map((c, i) => (
      <Link href={`/categories/${c.slug}`} key={i}>
        <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
      </Link>
    ));
  };

  const showAllTags = () => {
    return tags.map((t, i) => (
      <Link href={`/categories/${t.slug}`} key={i}>
        <a className="btn btn-outline-primary  mr-1 ml-1 mt-3">{t.name}</a>
      </Link>
    ));
  };

  const showLoadedBlogs = () => {
    return loadedBlogs.map((blog, i) => (
        <article key={i}>
            <Card blog={blog} />
        </article>
    ));
};

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <main>
          <div className="container-fluid">
            <header>
              <div className="col-md-12 pt-3">
                <h1 className="display-4 font-weight-bold text-center">
                  Programming blogs and tutorial
                </h1>
              </div>
              <section>
                <div className="pb-2 text-center">
                  {showAllCategories()}
                  <br />
                  {showAllTags()}
                </div>
              </section>
            </header>
          </div>
          <div className="container-fluid">{showBlogs()}</div>
          <div className="container-fluid">{showLoadedBlogs()}</div>
          <div className="text-center pt-5 pb-5">{loadMoreButton()}</div>
        </main>
      </Layout>
    </React.Fragment>
  );
};

Blogs.getInitialProps = () => {
  let limit = 2;
  let skip = 0
  return listBlogWithTagsAndCategory(skip,limit).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        totalBlogs: data.size,
        blogsLimit : limit,
        blogSkip: skip
      };
    }
  });
};

export default withRouter(Blogs);
