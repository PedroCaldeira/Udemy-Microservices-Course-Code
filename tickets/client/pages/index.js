import buildClient from '../lib/api/build-client';
const Landing = ({ currentUser }) => {
  return currentUser ? (
    <h1>Hello, {currentUser.email}</h1>
  ) : (
    <h1>You are not signed in</h1>
  );
};

export default Landing;
