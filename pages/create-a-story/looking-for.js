import { withAuthComponent, withAuthServerSideProps } from 'components/withAuth';
import LookingFor from 'features/createStory/lookingFor';
import { store } from 'store';

export default withAuthComponent(LookingFor);

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
