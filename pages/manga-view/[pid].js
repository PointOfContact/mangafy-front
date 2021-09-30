import client from 'api/client';
import { withAuthServerSideProps, withAuthComponent } from 'components/withAuth';
import MangaView from 'features/mangaView';
import { store } from 'store';

export default withAuthComponent(MangaView);
export const getServerSideProps = withAuthServerSideProps(async (context, user = store.user) => {
  const res = await client.service('/api/v2/story-boards').get(context.params.pid);
  const resMangaStory = await client.service('/api/v2/manga-stories').get(res.mangaStoryId);

  try {
    return {
      props: {
        user,
        storyBoardId: context.params.pid,
        mangaUrls: res.mangaUrls,
        mangaStoryId: resMangaStory._id,
        mangaStoryTitle: resMangaStory.title,
      },
    };
  } catch (error) {
    console.log('Error: manga-view.js', error);

    return { props: {} };
  }
});
