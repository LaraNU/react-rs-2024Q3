import { Link } from 'react-router-dom';
import './MainPage.module.css';

const MainPage = () => {
  return (
    <>
      <h1>Main Page</h1>
      <ul>
        <li>
          <Link to="/uncontrolled-form">Uncontrolled Form</Link>
        </li>
        <li>
          <Link to="/react-hook-form">React Hook Form</Link>
        </li>
      </ul>
    </>
  );
};

export default MainPage;
