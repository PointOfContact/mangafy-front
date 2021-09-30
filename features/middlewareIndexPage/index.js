import React from 'react';

import Landing from 'features/index';
import MangaView from 'features/mangaView';
import PropTypes from 'prop-types';

const MiddlewareIndexPage = ({ user, storyBoardId, mangaUrls, mangaStoryId, mangaStoryTitle }) =>
  !!storyBoardId ? (
    <MangaView
      user={user}
      storyBoardId={storyBoardId}
      mangaUrls={mangaUrls}
      mangaStoryId={mangaStoryId}
      mangaStoryTitle={mangaStoryTitle}
    />
  ) : (
    <Landing user={user} />
  );

MiddlewareIndexPage.propTypes = {
  user: PropTypes.object.isRequired,
  storyBoardId: PropTypes.string,
  mangaUrls: PropTypes.array,
  mangaStoryId: PropTypes.string,
  mangaStoryTitle: PropTypes.string,
};

MiddlewareIndexPage.defaultProps = {
  storyBoardId: '',
  mangaUrls: [],
  mangaStoryId: '',
  mangaStoryTitle: '',
};

export default MiddlewareIndexPage;
