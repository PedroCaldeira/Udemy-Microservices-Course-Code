import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../lib/api/build-client';
import Header from '../components/header';
const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser}></Header>
      <Component {...{ ...pageProps, currentUser }} />
    </div>
  );
};
// TODO: Not use getInitialProps. Try to figure a way to get state accross application regarding authentication
// getStaticProps or getServerSideProps over getInitialProps (Deprecated)
// nextAuth?
AppComponent.getInitialProps = async (context) => {
  const client = buildClient(context.ctx);
  const { data } = await client
    .get('/api/users/currentuser')
    .catch((err) => console.log(err));
  let pageProps = {};
  if (context.Component.getInitialProps) {
    pageProps = await context.Component.getInitialProps(context.ctx);
  }
  return { pageProps, ...data };
};

export default AppComponent;
