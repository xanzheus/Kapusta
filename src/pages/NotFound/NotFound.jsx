import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <section>
        <p style={{ textAlign: 'center' }}>Nothing to see here!</p>
        <p style={{ textAlign: 'center' }}>
          <Link to="/">Go to the home page</Link>
        </p>
      </section>
    </>
  );
};

export default NotFound;
