import React from 'react';

import Landing from 'features/index';
import MangaView from 'features/mangaView';
import PropTypes from 'prop-types';

const MiddlewareIndexPage = ({ user, storyBoardId, mangaUrls, mangaStoryTitle }) =>
  !!storyBoardId ? (
    <MangaView
      user={user}
      storyBoardId={storyBoardId}
      mangaUrls={mangaUrls}
      mangaStoryTitle={mangaStoryTitle}
    />
  ) : (
    <Landing user={user} />
  );

MiddlewareIndexPage.propTypes = {
  user: PropTypes.object.isRequired,
  storyBoardId: PropTypes.string,
  mangaUrls: PropTypes.array,
  mangaStoryTitle: PropTypes.string,
};

MiddlewareIndexPage.defaultProps = {
  storyBoardId: '',
  mangaUrls: [],
  mangaStoryTitle: '',
};

export default MiddlewareIndexPage;
