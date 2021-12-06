import client from 'api/client';
import { withAuthServerSideProps, withAuthComponent } from 'components/withAuth';
import MangaView from 'features/mangaView';
import { store } from 'store';

export default withAuthComponent(MangaView);
export const getServerSideProps = withAuthServerSideProps(async (context, user = store.user) => {
  const res = await client.service(`/api/v2/manga-view`).get(context.params.pid, {
    query: {
      storyBoardId: context.params.pid,
    },
  });

  if (!res.chapters.length) {
    context.res.writeHead(301, {
      Location: `/manga-story/${res.mangaStoryId}`,
    });
    context.res.end();
  }

  try {
    return {
      props: {
        user,
        ...res,
      },
    };
  } catch (error) {
    console.log('Error: manga-view.js', error);

    return { props: {} };
  }
});
