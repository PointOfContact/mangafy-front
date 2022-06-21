import React, { useEffect, useState } from 'react';
import CreateStory from './create-story';
import CreateType from './create-type';
import selectGenre from './select-genre';
import StartWithTheBasics from './start-with-the-basics';
import SignUp from './sign-up';
import SetupPayout from './setup-payout';
import ShareStory from './share-story';
import client from 'api/client';
import { LinkCreator } from 'utils/linkCreator';
import { useRouter } from 'next/router';
import { notification } from 'antd';
import { findStoryBoard } from 'api/storyBoardClient';
import mangaStoryAPI from 'features/mangaStory/mangaStoryAPI';

const defaultStoryInfo = {
  projectName: null,
  type: null,
  genres: [],
  seriesTitle: null,
  seriesDescription: null,
  paypal: null,
};

const CreateStoryStepper = ({ genres, path, user, query, jwt }) => {
  const router = useRouter();
  const [storyInfo, setStoryInfo] = useState({...router.query} || defaultStoryInfo);
  const [loading, setLoading] = useState(null);

  // useEffect(() => {
  //   if (!router.query?.step && (router.query?.step !== 0)) {
  //     pushQuery({...storyInfo, step: 0});
  //   }
  // }, []);

  useEffect(() => {
    pushQuery(storyInfo);
  }, [storyInfo.step]);

  useEffect(() => {
    setStoryInfo({...router.query})
    setLoading(null);
  }, [router.query]);

  const pushQuery = (query) => {
    router.push(
      LinkCreator.toQuery(query, router.pathname),
      LinkCreator.toQuery(query, router.pathname),
      { scroll: false }
    );
  };

  function toNextStep() {
    const prevStep = Number.parseInt(router.query?.step);
    let nextStep = prevStep;
    if (prevStep < 0) nextStep = 0;
    else if (prevStep >= 6) nextStep = 6;
    else if (user && prevStep === 3) nextStep = 5;
    else ++nextStep;
    console.log(prevStep, nextStep)
    // router.push('/create-story/?step=' + nextStep);
    setStoryInfo({...storyInfo, step: nextStep || 1})
    setLoading('next');
  }

  function toPrevStep() {
    const prevStep = Number.parseInt(router.query?.step) || -1;
    let nextStep = prevStep;
    if (prevStep > 6) nextStep = 6;
    else if (prevStep <= 0) nextStep = 0;
    else if (user && prevStep === 5) nextStep = 3;
    else --nextStep;
    setStoryInfo({...storyInfo, step: nextStep})
    setLoading('prev');
  }

  function createStory() {
    setLoading('next');
    client
      .service('/api/v2/manga-stories')
      .create(
        {
          title: storyInfo.projectName,
          projectType: storyInfo.type,
          story: storyInfo.seriesTitle,
          description: storyInfo.seriesDescription,
          genresIds: Array.isArray(storyInfo.genres) ? storyInfo.genres : (storyInfo.genres ? [storyInfo.genres] : []),
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
          mode: 'no-cors',
        }
      )
      .then(async (createdStory) => {
        localStorage.removeItem('newStoryInfo');
        // Get storyBoard
        findStoryBoard(
          user._id,
          createdStory._id,
          (storyBoard) => {
            // Then publish first chapter
            mangaStoryAPI.chapter.patch(
              storyBoard?.data[0]?.chapters[0]?._id,
              { published: true },
              async (data) => {
                try {
                  // Then publish story, set subdomain and set paypalPublished
                  await client.service('/api/v2/manga-stories/').patch(
                    createdStory._id,
                    {
                      payPalPublished: true,
                      published: true,
                      typeUrlView: 'Custom subdomain',
                      viewUrlName: storyInfo.projectName,
                    },
                    {
                      headers: { Authorization: `Bearer ${jwt}` },
                      mode: 'no-cors',
                    }
                  );
                  // Then set paypal email
                  if (storyInfo.paypal) mangaStoryAPI.draft.saveUserDataByKey(storyInfo.paypal, user, () => {});
                  // setLink('https://' + storyInfo.projectName + '.mangafy.club/');
                  // setCreatorLink('/manga-story/' + createdStory._id);
                  setLoading('next');
                  pushQuery({step: 6, link: ('https://' + storyInfo.projectName + '.mangafy.club/'), creatorlink: ('/manga-story/' + createdStory._id)});
                } catch (err) {
                  setLoading(null)
                  notification.error({
                    placement: 'bottomLeft',
                    message: err.message,
                  });
                }
              },
              () => {},
              () => {}
            );
          },
          (err) => {
            notification.error({
              placement: 'bottomLeft',
              message: err.message,
            });
          }
        );
      })
      .catch((err) => {
        setLoading(null);
        notification.error({
          placement: 'bottomLeft',
          message: err.message,
        });
      });
  }

  let StepElement;
  switch (Number.parseInt(router.query?.step)) {
    case 0:
      StepElement = CreateStory;
      break;

    case 1:
      StepElement = CreateType;
      break;

    case 2:
      StepElement = selectGenre;
      break;

    case 3:
      StepElement = StartWithTheBasics;
      break;

    case 4:
      StepElement = SignUp;
      break;

    case 5:
      StepElement = SetupPayout;
      break;

    case 6:
      StepElement = ShareStory;
      break;

    default:
      StepElement = CreateStory;
      break;
  }

  return (
    <StepElement
      genres={genres?.data}
      storyInfo={storyInfo}
      goNext={() => toNextStep()}
      goBack={() => toPrevStep()}
      setStoryInfo={(info) => setStoryInfo(info)}
      createStory={createStory}
      loading={loading}
      setLoading={(value) => setLoading(value)}
    />
  );
};

export default CreateStoryStepper;
