import { withAuthComponent, withAuthServerSideProps } from 'components/withAuth';
import Introduce from 'features/createStory/projectTitle';
import { store } from 'store';

export default withAuthComponent(Introduce);

export const getServerSideProps = withAuthServerSideProps(async (context, user = null) => {
  try {
    return {
      props: {
        user: user || store.user,
      },
    };
  } catch (error) {
    return { props: {} };
  }
});
