import client from 'api/client';
import { withAuthServerSideProps, withAuthComponent } from 'components/withAuth';
import MangaView from 'features/mangaView';
import { store } from 'store';

export default withAuthComponent(MangaView);
export const getServerSideProps = withAuthServerSideProps(async (context, user = store.user) => {
  const res = await client.service('/api/v2/story-boards').get(context.params.pid);
  try {
    return {
      props: {
        user,
        storyBoardId: context.params.pid,
        mangaUrls: res.mangaUrls,
      },
    };
  } catch (error) {
    console.log('Error: manga-view.js', error);

    return { props: {} };
  }
});
