const Amplitude = require('amplitude');

export default function myAmplitude(eventData) {
  const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');

  const defaultEventData = [
    {
      platform: 'WEB',
      ...{ eventData },
    },
  ];
  return amplitude.track(defaultEventData);
}
