import { withAuthServerSideProps, withAuthComponent } from 'components/withAuth';
import Content from 'features/content';
import { store } from 'store';

export default withAuthComponent(Content);
export const getServerSideProps = withAuthServerSideProps(async (context, user = store.user) => {
  try {
    return {
      props: {
        user,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    console.log('Error: content.js', error);
    return { props: {} };
  }
});
