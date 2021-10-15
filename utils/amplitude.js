import { v4 as uuidv4 } from 'uuid';

const Amplitude = require('amplitude');

const amp = new Amplitude(process.env.NEXT_PUBLIC_AMPLITUDE_KEY);

export default async function myAmplitude(eventData) {
  if (process.env.NEXT_PUBLIC_AMPLITUDE_ENABLED !== 'true') {
    return;
  }
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
