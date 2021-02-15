import { withAuthComponent, withAuthServerSideProps } from 'components/withAuth';
import ProjectDescription from 'features/createStory/projectDescription';
import { store } from 'store';

export default withAuthComponent(ProjectDescription);

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
