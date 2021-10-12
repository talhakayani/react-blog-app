import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('Talha');
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handelSubmit = e => {
    e.preventDefault();
    setIsPending(true);
    const blog = { title, body, author };
    fetch('http://localhost:8000/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog),
    }).then(() => {
      setIsPending(false);
      console.log('New Blog Added');
      history.push('/');
    });
    console.log(blog);
  };

  return (
    <div className="create">
      <h2>Adding New Blog</h2>
      <form onSubmit={handelSubmit}>
        <label>Blog title:</label>
        <input
          type="text"
          value={title}
          onChange={e => {
            setTitle(e.target.value);
          }}
          required
        ></input>
        <label>Blog Body:</label>
        <textarea
          required
          value={body}
          onChange={e => setBody(e.target.value)}
        ></textarea>
        <label>Blog Author:</label>
        <select value={author} onChange={e => setAuthor(e.target.value)}>
          <option value="talha">Talha</option>
          <option value="hamza">Hamza</option>
          <option value="rizwan">Rizwan</option>
        </select>
        {!isPending && <button>Add Blog</button>}
        {isPending && <button disabled>Adding blog...</button>}
      </form>
    </div>
  );
};
export default Create;
