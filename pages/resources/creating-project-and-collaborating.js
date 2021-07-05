import { withAuthServerSideProps, withAuthComponent } from 'components/withAuth';
import CreatingProjectAndCollaborating from 'features/creatingProjectAndCollaborating';
import absoluteUrl from 'next-absolute-url';
import { store } from 'store';

export default withAuthComponent(CreatingProjectAndCollaborating);
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
