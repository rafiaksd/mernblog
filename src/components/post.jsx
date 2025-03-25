import { Link } from 'react-router-dom';

export default function Post({ _id, title, summary, createdAt, author }) {
  return (
    <div className="post">
      <div className="content">
        <Link to={`/post/${_id}`}>
          <h2 className="post-title">{title}</h2>
        </Link>
        <p className="info">
          {/* Check if author exists before accessing username */}
          <a className="author">{author ? author.username : 'Unknown Author'}</a>
          <time>{new Date(createdAt).toLocaleDateString()}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}
