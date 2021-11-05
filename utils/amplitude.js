import { v4 as uuidv4 } from 'uuid';

const Amplitude = require('amplitude');

const amp = new Amplitude(process.env.NEXT_PUBLIC_AMPLITUDE_KEY);

export default async function myAmplitude(eventData) {
  if (process.env.NEXT_PUBLIC_AMPLITUDE_ENABLED !== 'true') {
    return;
  }

  if (Array.isArray(eventData)) {
    const res = eventData.map((e) => {
      if (!e.user_id) {
        delete e.user_id;
        delete e.user_properties;
        e.device_id = uuidv4();
      }

      return {
        platform: 'WEB',
        ...e,
      };
    });
    try {
      await amp.track(res);
    } catch (error) {
      // TODO: add sentry
    }
  } else {
    if (!eventData.user_id) {
      delete eventData.user_id;
      delete eventData.user_properties;
      eventData.device_id = uuidv4();
    }

    const defaultEventData = [
      {
        platform: 'WEB',
        ...eventData,
      },
    ];
    try {
      await amp.track(defaultEventData);
    } catch (error) {
      // TODO: add sentry
    }
  }
}
