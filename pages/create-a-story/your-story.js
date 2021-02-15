import { withAuthComponent, withAuthServerSideProps } from 'components/withAuth';
import ProjectStory from 'features/createStory/yourStory';
import { store } from 'store';

export default withAuthComponent(ProjectStory);

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
