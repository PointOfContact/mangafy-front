import Footer from 'components/footer';
import Header from 'components/header';
import Head from 'next/head';
import Link from 'next/link';

const Start = () => (
  <>
    <Head>
      <title>Start</title>
    </Head>
    <div className="sign_in_page_container">
      <Header />
      <main className="start_main">
        <div className="container">
          <div className="row collab_radio">
            <div className="col-lg-8">
              <div className="title_div">
                <div className="form_header_title">Welcome to MangaFY</div>
                <p className="title_text">
                  Thanks for your interest in MangaFY! Before we get started, we’d like to ask a few
                  questions to better understand your project needs.
                </p>
                <Link href="/create-a-story/looking-for">
                  <button id="startBtnId" type="primary" className="start_but">
                    Create a project!
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  </>
);

export default Start;
