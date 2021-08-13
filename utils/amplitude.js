import { v4 as uuidv4 } from 'uuid';

const Amplitude = require('amplitude');

export default function myAmplitude(eventData) {
  const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');
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
  return amplitude.track(defaultEventData);
}
