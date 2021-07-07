import { withAuthServerSideProps, withAuthComponent } from 'components/withAuth';
import IncludeYourPortfolio from 'features/includeYourPortfolio';
import absoluteUrl from 'next-absolute-url';
import { store } from 'store';

export default withAuthComponent(IncludeYourPortfolio);
export const getServerSideProps = withAuthServerSideProps(async (context, user = store.user) => {
  const { origin } = absoluteUrl(context.req);
  try {
    return {
      props: {
        user,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    return { props: {} };
  }
});
