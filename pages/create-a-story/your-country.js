import { withAuthComponent, withAuthServerSideProps } from 'components/withAuth';
import Country from 'features/createStory/yourCountry';
import { store } from 'store';

export default withAuthComponent(Country);

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
