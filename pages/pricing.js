import { withAuthServerSideProps, withAuthComponent } from 'components/withAuth';
import Pricing from 'features/pricing';
import absoluteUrl from 'next-absolute-url';
import { store } from 'store';

export default withAuthComponent(Pricing);
export const getServerSideProps = withAuthServerSideProps(async (context, user = store.user) => {
  const { origin } = absoluteUrl(context.req);
  try {
    return {
      props: {
        user,
        originUrl: `${origin}/profile/${user?._id}`,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    return { props: {} };
  }
});
