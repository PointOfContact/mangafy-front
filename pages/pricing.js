import { withAuthServerSideProps, withAuthComponent } from 'components/withAuth';
import Pricing from 'features/pricing';
import { store } from 'store';

export default withAuthComponent(Pricing);
export const getServerSideProps = withAuthServerSideProps(async (context, user = store.user) => {
  try {
    return {
      props: {
        user,
        originUrl: `https://mangafy.club/profile/${user?._id}`,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    return { props: {} };
  }
});
