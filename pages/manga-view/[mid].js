import client from 'api/client';
import { withAuthServerSideProps, withAuthComponent } from 'components/withAuth';
import MangaView from 'features/shotPage/MangaView';
import { store } from 'store';

export default withAuthComponent(MangaView);
export const getServerSideProps = withAuthServerSideProps(async (context, user = store.user) => {
  let manga = null;
  let authors = null;
  let comments = null;

  try {
    manga = await client.service(`/api/v2/manga-view`).get(context.params.mid, {
      query: {
        storyBoardId: context.params.mid,
      },
    });

    if (context.query.chapter > manga.chapters.length || !manga.chapters.length) {
      context.res.writeHead(302, {
        Location: '/404',
      });
      context.res.end();
    }

    // const jwt = client.getCookie('feathers-jwt');
    // comments = await client.service('/api/v2/comment-chapter').find({
    //   query: {
    //     chapterId: context.query.chapter - 1 || 0,
    //     $sort: { createdAt: -1 },
    //     $limit: 1000,
    //   },
    //   headers: { Authorization: `Bearer ${jwt}` },
    //   mode: 'no-cors',
    // });

    authors = await Promise.all(
      manga.userData.map((item) => client.service('/api/v2/users').get(item._id))
    );
    authors?.forEach((item) => {
      item.isFollowed = item.likedUsers?.includes(user?._id);
    });
  } catch (error) {
    console.log('Error: manga-view.js', error);
  }

  return {
    props: {
      user,
      serverSideAuthors: authors,
      serverSideChapter: context.query.chapter || 1,
      serverSideManga: manga,
      serverSideComments: comments || { data: [] },
    },
  };
});
