import React, { useEffect, useState } from 'react'
import CreateStory from './create-story'
import CreateType from './create-type'
import selectGenre from './select-genre'
import StartWithTheBasics from './start-with-the-basics'
import SignUp from './sign-up'
import SetupPayout from './setup-payout'
import ShareStory from './share-story'
import client from 'api/client'
import { useRouter } from 'next/router';
import { notification } from 'antd'
import { findStoryBoard } from 'api/storyBoardClient';
import mangaStoryAPI from 'features/mangaStory/mangaStoryAPI'

const defaultStoryInfo = {
    projectName: null,
    type: null,
    genres: [],
    seriesTitle: null,
    seriesDescription: null,
    paypal: null,
}

const CreateStoryStepper = ({genres, path, user, query, jwt}) => {

    const router = useRouter();
    const [link, setLink] = useState(null);
    const [step, setStep] = useState(Number.parseInt(query.step ? query.step : '0'));
    const [storyInfo, setStoryInfo] = useState(defaultStoryInfo);

    useEffect(() => {
        try {
            const data = JSON.parse(localStorage.getItem('newStoryInfo'));
            if (data) setStoryInfo(data)
            else setStoryInfo(defaultStoryInfo)
        } catch (err) {
            setStoryInfo(defaultStoryInfo)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('newStoryInfo', JSON.stringify(storyInfo));
    }, [storyInfo])

    useEffect(() => {
        setStep(Number.parseInt(query.step));
    }, [query.step]);

    function toNextStep() {
        const prevStep = step;
        let nextStep = prevStep;
        if (prevStep >= 6) nextStep = 6;
        if (user && prevStep === 3) nextStep = 5;
        else ++nextStep;
        router.push('/create-story/?step='+nextStep);
    }

    function toPrevStep() {
        const prevStep = step;
        let nextStep = prevStep;
        if (prevStep <= 0) nextStep = 0;
        if (user && prevStep === 5) nextStep = 3;
        else --nextStep;
        router.push('/create-story/?step='+nextStep);
    }

    function createStory() {
        client.service('/api/v2/manga-stories')
            .create(
                {
                    title: storyInfo.projectName,
                    projectType: storyInfo.type,
                    story: storyInfo.seriesTitle,
                    description: storyInfo.seriesDescription,
                    genresIds: storyInfo.genres,
                },
                {
                    headers: { Authorization: `Bearer ${jwt}` },
                    mode: 'no-cors'
                }
            )
            .then(async (createdStory) => {
                localStorage.removeItem('newStoryInfo');
                // Get storyBoard
                findStoryBoard(
                    user._id,
                    createdStory._id,
                    (storyBoard) => {
                        setLink('https://mangafy.club/manga-view/'+storyBoard?.data[0]._id)
                        // Publish first chapter
                        mangaStoryAPI.chapter.patch(
                            storyBoard?.data[0]?.chapters[0]?._id,
                            { published: true },
                            async (data) => {
                                console.log(data)
                                // Publish story and set paypalPublished
                                await client.service('/api/v2/manga-stories/').patch(
                                    createdStory._id,
                                    {
                                        payPalPublished: true,
                                        published: true,
                                        typeUrlView: 'Custom subdomain',
                                        viewUrlName: storyInfo.projectName.toLowerCase()
                                    },
                                    {
                                        headers: { Authorization: `Bearer ${jwt}` },
                                        mode: 'no-cors'
                                    }
                                );
                                // Set paypal
                                mangaStoryAPI.draft.saveUserDataByKey(storyInfo.paypal, user, () => {});
                                toNextStep();
                            },
                            () => {},
                            () => {}
                        );
                    },
                    (err) => {
                        notification.error({
                            placement: 'bottomLeft',
                            message: err.message
                        })
                    }
                );
            })
            .catch(err => {
                notification.error({
                    placement: 'bottomLeft',
                    message: err.message
                })
            })
    }

    let StepElement;
    switch (step) {
        case 0:
            StepElement = CreateStory
            break;

        case 1:
            StepElement = CreateType
            break;
    
        case 2:
            StepElement = selectGenre
            break;
    
        case 3:
            StepElement = StartWithTheBasics
            break;
    
        case 4:
            StepElement = SignUp
            break;
    
        case 5:
            StepElement = SetupPayout
            break;
    
        case 6:
            StepElement = ShareStory
            break;
    
        default:
            StepElement = CreateStory
            setStep(0)
            break;
    }

    return (
        <StepElement
            genres={genres.data}
            storyInfo={storyInfo}
            goNext={() => toNextStep()}
            goBack={() => toPrevStep()}
            setStoryInfo={(info) => setStoryInfo(info)}
            createStory={createStory}
            link={link}
        />
    )
}

export default CreateStoryStepper