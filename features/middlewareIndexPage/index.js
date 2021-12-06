import React from 'react';

import Landing from 'features/index';
import MangaView from 'features/mangaView';
import PropTypes from 'prop-types';

const MiddlewareIndexPage = ({
  user,
  storyBoardId,
  mangaUrls,
  mangaStoryId,
  mangaStoryTitle,
  chapters,
  userData,
  participants,
  getNameViewUrl,
}) =>
  !!storyBoardId ? (
    <MangaView
      user={user}
      storyBoardId={storyBoardId}
      mangaUrls={mangaUrls}
      mangaStoryId={mangaStoryId}
      mangaStoryTitle={mangaStoryTitle}
      chapters={chapters}
      userData={userData}
      participants={participants}
      getNameViewUrl={getNameViewUrl}
    />
  ) : (
    <Landing user={user} />
  );

MiddlewareIndexPage.propTypes = {
  user: PropTypes.object,
  storyBoardId: PropTypes.string,
  mangaUrls: PropTypes.array,
  mangaStoryId: PropTypes.string,
  mangaStoryTitle: PropTypes.string,
  chapters: PropTypes.array,
  userData: PropTypes.array,
  participants: PropTypes.array,
  getNameViewUrl: PropTypes.string,
};

MiddlewareIndexPage.defaultProps = {
  user: {},
  storyBoardId: '',
  mangaUrls: [],
  mangaStoryId: '',
  mangaStoryTitle: '',
  chapters: [],
  userData: [],
  participants: [],
  getNameViewUrl: '',
};

export default MiddlewareIndexPage;
