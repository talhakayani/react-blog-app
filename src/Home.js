import Blogs from './Blogs';
import useFetch from './useFetch';
const Home = () => {
  const {
    data: blogs,
    isPending,
    error,
  } = useFetch('http://localhost:8000/blogs');
  return (
    <div className="home">
      {error && <div>{error.message}</div>}
      {isPending && <div>Loading...</div>}
      {blogs && <Blogs blogs={blogs} title="Blogs" />}
    </div>
  );
};
export default Home;
