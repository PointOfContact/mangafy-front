import { load } from '@fingerprintjs/fingerprintjs';

const getDeviceId = (setDeviceId) => {
  load()
    .then((fpPromise) => fpPromise.get())
    .then((result) => {
      // This is the visitor identifier:
      const { visitorId } = result;
      setDeviceId(visitorId);
    });
};

export default getDeviceId;
