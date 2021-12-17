/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import amplitude from 'amplitude-js';

const getUTMData = () => {
  const utmTypes = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

  const { href, search } = window.location;

  const utmDataArray = utmTypes.map((query) => {
    const firstIndex = search.lastIndexOf(query);

    const lastIndex =
      search.indexOf('&', firstIndex) === -1 ? href.length : search.indexOf('&', firstIndex);

    const queryValue = search.slice(firstIndex + query.length + 1, lastIndex);
    const utmData = {};

    if (queryValue) {
      utmData[query] = queryValue;
    }

    return utmData;
  });

  return utmDataArray;
};

const setSeveralProperty = () => {
  for (const utmValue of getUTMData()) {
    // if the object is not an empty
    if (Object.keys(utmValue).length) amplitude.getInstance().setUserProperties(utmValue);
  }
};

export default async function myAmplitude(eventData) {
  // if (process.env.NEXT_PUBLIC_AMPLITUDE_ENABLED !== 'true') {
  //   return;
  // }

  if (Array.isArray(eventData)) {
    try {
      // eslint-disable-next-line guard-for-in
      for (const event of eventData) {
        event.platform = 'WEB';
        await amplitude.getInstance().logEvent(event.event_type, event);
        setSeveralProperty();
      }
    } catch (error) {
      console.log(error, 'amplitude.error()', 55555555);
      // TODO: add sentry
    }
  } else {
    const defaultEventData = [
      {
        platform: 'WEB',
        ...eventData,
      },
    ];

    try {
      await amplitude.getInstance().logEvent(eventData.event_type, defaultEventData);
      setSeveralProperty();
    } catch (error) {
      // TODO: add sentry
    }
  }
}

export const initAmplitude = async (fingerPrint, user = null) => {
  console.log('fingerPrint', fingerPrint);
  console.log('userId', user?._id);
  // if (process.env.NEXT_PUBLIC_AMPLITUDE_ENABLED !== 'true') {
  //   return;
  // }

  if (process.browser) {
    amplitude.getInstance().init(
      process.env.NEXT_PUBLIC_AMPLITUDE_KEY,
      user?._id,
      {
        includeUtm: true,
        deviceId: fingerPrint,
        platform: 'WEB',
        saveParamsReferrerOncePerSession: true,
      },
      () => {
        console.log('amp', amplitude.getInstance());
      }
    );
    amplitude.getInstance().setUserProperties(user);
    setSeveralProperty();
  }
};

export const setUser = async (user) => {
  // if (process.env.NEXT_PUBLIC_AMPLITUDE_ENABLED !== 'true') {
  //   return;
  // }
  if (process.browser) {
    await amplitude.getInstance().setUserId(user._id);
    await amplitude.getInstance().setUserProperties(user);
    setSeveralProperty();
  }
};
