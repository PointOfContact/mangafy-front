/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import styles from './styles.module.scss';
import cn from 'classnames';
import { Col, Row, Carousel, Tabs, notification } from 'antd';
import client from 'api/client';
import Router, { useRouter } from 'next/router';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

const { TabPane } = Tabs;

import Footer from 'components/footer';
import FooterPolicy from 'components/footer-policy';
import FeedCreateButton from 'components/FeedCreateButton';

import HeaderNew from 'components/headerNew';
import Featured from 'components/featured';
import FilterNew from 'components/filterNew';
import Cherry from 'components/icon/new/Cherry';
import Flash from 'components/icon/new/Flash';
import CardsContainer from 'components/cardsContainer';
import Button from 'components/ui-new/Button';

import TaskCard from 'components/feedCards/TaskCard';
import PortfolioCard from 'components/feedCards/PortfolioCard';
import ShotCard from 'components/feedCards/ShotCard';
import PublishedCard from 'components/feedCards/PublishedCard';
import CreateShotModal from 'components/CreateShotModal';
import { removeShortStory } from 'components/gallery/utils';
import myAmplitude from 'utils/amplitude';
import { EVENTS } from 'helpers/amplitudeEvents';
import { SignInModal } from 'components/modals/SignInModal';
import { feedFilterTypes, projectTypes, userTypes } from 'helpers/constant';
import ModalCreateProject from 'components/modalCreateProject';
import FeedBanner from 'components/feedBanner';

const getFilterTypes = (genres) => ({
  // recent: [{ title: 'Search', inQuery: 'search' }],
  people: [
    { title: 'Search', inQuery: 'search' },
    { title: 'Genres', inQuery: 'genresIds', options: genres },
    {
      title: 'Role',
      inQuery: 'types',
      options: userTypes.map((type) => ({ title: type.value, value: type.key })),
    },
    {
      title: 'Sort by',
      inQuery: 'filter',
      options: [{ title: 'Recent', value: 'new' }],
    },
  ],
  shots: [
    { title: 'Search', inQuery: 'search' },
    {
      title: 'Sort by',
      inQuery: 'filter',
      options: [{ title: 'Recent', value: 'new' }],
    },
  ],
  tasks: [
    { title: 'Search', inQuery: 'search' },
    {
      title: 'Looking for',
      inQuery: 'types',
      options: userTypes.map((type) => ({ title: type.value, value: type.value })),
    },
    {
      title: 'Sort by',
      inQuery: 'filter',
      options: [{ title: 'Recent', value: 'new' }],
    },
  ],
  projects: [
    { title: 'Search', inQuery: 'search' },
    { title: 'Genres', inQuery: 'genresIds', options: genres },
    {
      title: 'Looking for',
      inQuery: 'searchingFor',
      options: userTypes.map((type) => ({ title: type.value, value: type.value })),
    },
    {
      title: 'Sort by',
      inQuery: 'filter',
      options: [{ title: 'Recent', value: 'new' }],
    },
  ],
  // ongoing: [{ title: 'Search', inQuery: 'search' }],
});

const FeedNew = (props) => {
  const [cardsElements, setCardsElements] = useState([]);
  const [shouldFetchCards, setShouldFetchCards] = useState(false);
  const [endOfCardsReached, setEndOfCardsReached] = useState(false);
  const [postType, setPostType] = useState(null);
  const [error, setError] = useState(null);
  const [shotModalVisible, setShotModalVisible] = useState(false);
  const [projectModalVisible, setProjectModalVisible] = useState(false);
  const [signInModalVisible, setSignInModalVisible] = useState(false);
  const [shotToEdit, setShotToEdit] = useState(null);
  const [activeFilters, setActiveFilters] = useState({});
  const [screenWidth, setScreenWidth] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { jwt, user, posts, genres } = props;
  const router = useRouter();
  // const defaultActiveTab = router.query?.tab || 'recent';
  const defaultActiveTab = router.query?.tab || 'projects';
  function onWindowResize() {
    setScreenWidth(window.innerWidth);
  }
  const filterTypes = getFilterTypes(genres);

  useEffect(async () => {
    if (!(posts && posts.length > 0)) {
      const posts = await getCards(10, 0, defaultActiveTab);
      setCardsElements(makeCardsElements(posts));
    }

    window.addEventListener('resize', onWindowResize);
    setScreenWidth(window.innerWidth);
    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  useEffect(async () => {
    let isLastRequest = [true];
    if (shouldFetchCards) {
      getFeedData(isLastRequest, false);
      // updateCards(cardsElements, isLastRequest, false, postType);
    }
    return () => {
      isLastRequest[0] = false;
    };
  }, [shouldFetchCards]);

  const createDefaultSelectedOptions = (ifDataString, query, choosedData, val) => {
    const data = {
      inQuery: val,
      isDisabled: false,
      isSelected: true,
    };
    switch (val) {
      case 'genresIds':
        if (ifDataString) {
          data.title = query.genresType;
          data.value = query[val];
          choosedData.push(data);
        } else {
          query[val].forEach((item, i) => {
            data.title = query.genresType[i];
            data.value = item;
            choosedData.push({ ...data });
          });
        }
        break;
      case 'searchingFor':
        if (ifDataString) {
          data.value = query[val];
          data.title = query[val];
          choosedData.push(data);
        } else {
          query[val].forEach((item, i) => {
            data.value = item;
            data.title = item;
            choosedData.push({ ...data });
          });
        }
        break;
      case 'filter':
        data.title = 'Recent';
        data.value = query[val];
        choosedData.push({ ...data });
        break;
      case 'search':
        data.title = query.genresType;
        data.value = query[val];
        choosedData.push({ ...data });
        break;
      case 'types':
        if (ifDataString) {
          data.title = query[val];
          data.value = query[val];
          choosedData.push(data);
        } else {
          query[val].forEach((item, i) => {
            data.title = item;
            data.value = item;
            choosedData.push({ ...data });
          });
        }
        break;
    }
    return data;
  };

  const setDefaultChoosedFilterData = () => {
    const query = Router.router.state.query;
    const choosedData = [];
    feedFilterTypes.forEach((val) => {
      if (query[val]) {
        const ifDataString = typeof query[val] === 'string';
        const data = createDefaultSelectedOptions(ifDataString, query, choosedData, val);
      }
    });
    setSelectedOptions(choosedData);
  };

  useEffect(() => {
    let type = null;
    switch (defaultActiveTab) {
      case 'people':
        type = 'Profile';
        break;

      case 'shots':
        type = 'Portfolio';
        break;

      case 'tasks':
        type = 'Task';
        break;

      case 'projects':
        type = 'Project';
        break;
      // case 'ongoing':
      //   type = 'Ongoing';
      //   break;
    }
    clearCardsElements();
    setPostType(type);
    setActiveFilters({});
    setDefaultChoosedFilterData();
  }, [defaultActiveTab]);

  const changeURL = () => {
    const tab = Router.router?.state?.query?.tab;
    const path = `/feed?tab=${tab || 'projects'}`;
    selectedOptions.forEach((val) => {
      path += `&${val.inQuery}=${val.value}`;
      if (val.inQuery === 'genresIds') path += `&genresType=${val.title}`;
    });
    Router.push(path, undefined, { shallow: true });
  };

  const createQuery = (postQuery, asPath, feedFilterTypes) => {
    feedFilterTypes.forEach((val) => {
      const ifFilterExist = asPath.indexOf(val);
      if (ifFilterExist >= 0) {
        const query = Router.router.state.query;
        postQuery[val] = query[val];
      }
    });
  };

  const addPostTypeInQuery = (postQuery, asPath, feedFilterTypes) => {
    createQuery(postQuery, asPath, feedFilterTypes);
    switch (Router.router.state.query?.tab) {
      case 'projects':
        postQuery.postType = 'Project';
        break;
      case 'tasks':
        postQuery.postType = 'Task';
        break;
      case 'shots':
        postQuery.postType = 'Portfolio';
        break;
      case 'people':
        postQuery.postType = 'Profile';
        break;
    }
  };

  const getFeedData = (isLastRequest, shouldCleanCards) => {
    const asPath = Router.router.state.asPath;
    const ifComedBack = feedFilterTypes.some((val) => asPath.includes(val));
    if (!ifComedBack) {
      updateCards(cardsElements, isLastRequest, shouldCleanCards, postType);
    } else {
      let postQuery = {
        genresIds: [],
        searchingFor: [],
        types: [],
      };
      addPostTypeInQuery(postQuery, asPath, feedFilterTypes);
      client
        .service('/api/v2/posts')
        .find({ query: postQuery })
        .then((res) => {
          const newItems = makeCardsElements(res?.data);
          setCardsElements(newItems);
        });
    }
    changeURL();
  };

  useEffect(() => {
    let isLastRequest = [true];
    getFeedData(isLastRequest, true);
    return () => {
      isLastRequest[0] = false;
    };
  }, [postType, activeFilters]);

  function onPageEnd() {
    setShouldFetchCards(true);
  }

  function clearCardsElements() {
    setCardsElements([]);
  }

  async function updateCards(cards, isLastRequest, shouldCleanCards, type) {
    setError(null);
    try {
      const newCards = await getCards(10, shouldCleanCards ? 0 : cards.length, type);
      const newCardsElements = makeCardsElements(newCards);
      if (newCardsElements.length === 0) setError('There is no cards for this filters');
      if (!newCardsElements[newCardsElements.length - 1]) setEndOfCardsReached(true);
      if (!isLastRequest[0]) {
        return;
      }

      setCardsElements((oldCardsElements) => {
        setShouldFetchCards(false);
        setEndOfCardsReached(newCards?.length > 0 ? false : true);
        if (shouldCleanCards) {
          return newCardsElements;
        } else {
          return [...oldCardsElements, ...newCardsElements];
        }
      });
    } catch (error) {
      setError('Something went wrong');
      setEndOfCardsReached(true);
      console.log(error);
    }
  }

  async function getCards(limit = 10, skip = 0, postType) {
    const query = {
      $limit: limit,
      // $sort: {
      //   createdAt: -1,
      // },
      $skip: skip,
      ...activeFilters,
    };
    if (postType) query.postType = postType;

    try {
      const posts = await client.service('/api/v2/posts').find({
        query,
      });

      return posts.data;
    } catch (error) {
      console.log(error);
    }
  }

  function editShot(shot) {
    setShotToEdit(shot);
    setShotModalVisible(true);
  }

  function deleteShot(_id) {
    removeShortStory(
      _id,
      (res) => {
        myAmplitude(EVENTS.DELETE_SHOT);
        updateCards(cardsElements, [true], true, postType);
        notification.success({
          message: 'Shot deleted successfully!',
          placement: 'bottomLeft',
        });
      },
      (err) => {
        if (err.code === 404) {
          myAmplitude(EVENTS.DELETE_SHOT);
          updateCards(cardsElements, [true], true, postType);
          notification.success({
            message: 'Shot deleted successfully!',
            placement: 'bottomLeft',
          });
        } else {
          notification.error({
            message: err.message,
            placement: 'bottomLeft',
          });
        }
      }
    );
  }

  function makeCardsElements(newCards = []) {
    return newCards.map((card) => {
      if (card.postType === 'Task' || card.postType === 'Collab')
        return <TaskCard key={card._id} card={card} user={user} />;
      // else if (card.postType === 'Project' || card.postType === 'Ongoing')
      else if (card.postType === 'Project')
        return <PublishedCard key={card._id} card={card} user={user} />;
      else if (card.postType === 'Portfolio')
        return (
          <ShotCard
            key={card.image?._id || card._id}
            card={card}
            user={user}
            editShot={editShot}
            deleteShot={deleteShot}
            setShowSignInModal={(visible) => setSignInModalVisible(visible)}
          />
        );
      else if (card.postType === 'Profile')
        return (
          <PortfolioCard
            key={card._id}
            card={card}
            user={user}
            setShowLoginModal={(visible) => setSignInModalVisible(visible)}
          />
        );
    });
  }

  const tabsOnChange = (activeKey) => {
    Router.push(`/feed?tab=${activeKey}`, undefined, { shallow: true });
  };

  return (
    <>
      <SignInModal
        title={'Like this post?'}
        visible={signInModalVisible}
        setVisible={setSignInModalVisible}
      />
      <CreateShotModal
        isVisible={shotModalVisible}
        setIsVisible={setShotModalVisible}
        shotToEdit={shotToEdit}
        setSelectedGallery={setShotToEdit}
        onUpload={() => {
          updateCards(cardsElements, [true], true, postType);
        }}
      />
      <ModalCreateProject
        createProjectModal={projectModalVisible}
        showCreateProjectModal={setProjectModalVisible}
        user={user}
      />
      <NextSeo
        title={'MangaFY – From story buidling to a full digital release.'}
        description={
          'The digital hub designed to help you produce your very owm comic or manga. From story buidling to a full digital release.'
        }
        canonical={'https://www.mangafy.club'}
        openGraph={{
          url: 'https://www.mangafy.club',
          title: 'Start your Graphic Novel Journey and Get Creative with MangaFY',
          description:
            'The digital hub designed to help you produce your very owm comic or manga. From story buidling to a full digital release.',
          site_name: 'MangaFY',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <div className={styles.pageContent}>
        <HeaderNew user={user} />
        <div className={styles.feed}>
          <Row className={styles.feedContent}>
            {!user && <FeedBanner className={styles.feed__banner} project={bannerProject} />}
            <div className={styles.feed__info}>
              <h1 className={styles.feed__title}>Explore the MangaFY - collaboration platform</h1>
              <div className={styles.feed__description}>
                A constructive and inclusive platform for webtoon and webcomics creators. MangaFY is
                a space for webcomics creators.
              </div>
            </div>
            <Col span={24} className={styles.filter}>
              <Tabs
                tabBarGutter={30}
                className={styles.filter__tabs}
                defaultActiveKey={defaultActiveTab}
                activeKey={defaultActiveTab}
                tabPosition="top"
                moreIcon={null}
                onChange={tabsOnChange}>
                {/* <TabPane tab="Recent" key="recent"/> */}
                <TabPane tab="Projects" key="projects" />
                <TabPane tab="Shots" key="shots" />
                {/* <TabPane tab="Ongoing" key="ongoing"/> */}
                <TabPane tab="Tasks" key="tasks" />
                <TabPane tab="People" key="people" />
              </Tabs>
              <FilterNew
                activeTab={defaultActiveTab}
                onChange={(filters) => setActiveFilters(createFiltersQuery(filters))}
                filters={filterTypes[defaultActiveTab]}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
              />
              <CardsContainer
                cardsElements={cardsElements}
                error={error}
                columns={screenWidth >= 1000 ? 3 : screenWidth >= 700 ? 2 : 1}
                user={user}
                activeTab={defaultActiveTab}
                onPageEnd={onPageEnd}
                shouldFetchCards={shouldFetchCards}
                openCreateShotModal={() => setShotModalVisible(true)}
                openCreateProjectModal={() => setProjectModalVisible(true)}
              />
            </Col>
          </Row>
        </div>
        <FooterPolicy />
      </div>
    </>
  );
};

export default FeedNew;

function createFiltersQuery(selectedFilters) {
  const query = {};
  if (!selectedFilters || selectedFilters.length === 0) return query;
  selectedFilters.forEach((filter) => {
    if (query[filter.inQuery]) {
      query[filter.inQuery].push(filter.value);
    } else {
      query[filter.inQuery] = [filter.value];
    }
  });
  // If filter contains only one value, turn it into a string
  Object.keys(query).forEach((key) => {
    if (query[key].length === 1) query[key] = query[key][0];
  });
  return query;
}
