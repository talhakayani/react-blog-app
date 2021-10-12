import { useHistory, useParams } from 'react-router';
import useFetch from './useFetch';
const BlogDetails = () => {
  const { id } = useParams();
  const history = useHistory();

  const handleDelete = () => {
    fetch(`http://localhost:8000/blogs/${id}`, {
      method: 'DELETE',
    }).then(() => {
      history.push('/');
    });
  };

  const {
    data: blog,
    error,
    isPending,
  } = useFetch(`http://localhost:8000/blogs/${id}`);
  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <p>{error}</p>}
      {blog && (
        <article>
          <h1>{blog.title}</h1>
          <p>{blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={handleDelete}>Delete Blog</button>
        </article>
      )}
    </div>
  );
};
export default BlogDetails;
