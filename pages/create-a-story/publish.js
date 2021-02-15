import client from 'api/client';
import { withAuthComponent, withAuthServerSideProps } from 'components/withAuth';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { store } from 'store';

function Home({ user }) {
  const publish = async () => {
    const mangaData = JSON.parse(localStorage.getItem('mangaStory'));
    const jwt = client.getCookie('feathers-jwt');
    import('api/restClient').then((m) => {
      const res = mangaData.image
        ? m.default.service('/api/v2/uploads').create(
            { uri: mangaData.image },
            {
              headers: { Authorization: `Bearer ${jwt}` },
            }
          )
        : Promise.resolve(null);
      res
        .then((response) => {
          const data = {
            story: mangaData.project_description,
            introduce: mangaData.project_story,
            description: mangaData.project_story,
            title: mangaData.introduce,
            searchingFor: mangaData.collaborators.map((c) => c.label),
            compensationModel: mangaData.compensation ? 'paid' : 'collaboration',
            country: mangaData.country,
            preferredLanguage: mangaData.prefered_language,
            price: mangaData.compensation,
            launchDate: mangaData.date_picker,
            genresIds: mangaData.manga_genres_obj.map((g) => g._id),
          };
          if (response) {
            data.image = response.id;
          }
          return m.default.service('/api/v2/manga-stories').create(data, {
            headers: { Authorization: `Bearer ${jwt}` },
          });
        })
        .then((res) => {
          localStorage.removeItem('mangaStory');
          Router.push(`/manga-story/${res._id}`);
        })
        .catch((err) => {
          console.log('err', err);
          Router.push(`/my-profile`);
        });
    });
  };
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="publish">
        <div className="container">
          <div className="row collab_radio">
            <div className="col-lg-8">
              <div className="title_div">
                <div className="logo_img_comp">
                  <img src="/img/logo.png" width="250" alt="" />
                </div>

                <p className="fin_text">Thanks for completing</p>
                <p className="fin_text">
                  Now <b>{user ? 'publish' : 'create your account'}</b>
                </p>
                {user ? (
                  <button id="publishBtnId" type="primary" onClick={publish} className="title_but">
                    Publish!
                  </button>
                ) : (
                  <Link href={user ? '/my-profile' : '/sign-up'}>
                    <button type="primary" className="title_but">
                      {user ? 'Publish!' : 'Create account!'}
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default withAuthComponent(Home);

export const getServerSideProps = withAuthServerSideProps(async (context, user = null) => {
  try {
    return {
      props: {
        user: user || store.user,
      },
    };
  } catch (error) {
    return { props: {} };
  }
});
