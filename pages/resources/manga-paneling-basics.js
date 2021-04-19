import { withAuthServerSideProps, withAuthComponent } from 'components/withAuth';
import MangaPanelingBasics from 'features/mangaPanelingBasics';
import absoluteUrl from 'next-absolute-url';
import { store } from 'store';

export default withAuthComponent(MangaPanelingBasics);
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
