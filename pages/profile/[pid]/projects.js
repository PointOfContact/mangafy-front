import client from 'api/client';
import { withAuthComponent, withAuthServerSideProps } from 'components/withAuth';
import ProfileProjects from 'features/ProfileProjects';
import { store } from 'store';

export default withAuthComponent(ProfileProjects);

export const getServerSideProps = withAuthServerSideProps(async (context, user = null) => {
  try {
    const profile = await client.service('/api/v2/users').get(context.params.pid);
    return {
      props: {
        user: user || store.user,
        profile,
      },
    };
  } catch (error) {
    console.log('Error: profile.js', error);

    if (context.res) {
      context.res.writeHead(302, {
        Location: '/404',
      });
      context.res.end();
    }
  }
});
