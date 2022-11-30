import { withAuthServerSideProps, withAuthComponent } from 'components/withAuth';
import Profile from 'features/profile';
import { store } from 'store';
import { LinkCreator } from 'utils/linkCreator';

export default withAuthComponent(Profile);
export const getServerSideProps = withAuthServerSideProps(async (context, user = store.user) => {
  const { query } = context;
  if (user) {
    context.res.writeHead(302, {
      Location: LinkCreator.toQuery({ ...query }, `/profile/${user?._id}`),
    });
  } else {
    context.res.writeHead(302, {
      Location: LinkCreator.toQuery({ ...query }, `/sign-in`),
    });
  }
  context.res.end();
  return {
    props: {
      user,
    },
  };
});
