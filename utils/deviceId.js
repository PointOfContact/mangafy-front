import { load } from '@fingerprintjs/fingerprintjs';

const getDeviceId = async (setDeviceId) => {
  const fpPromise = await load();
  const result = await fpPromise.get();
  const { visitorId } = result;
  setDeviceId(visitorId);
  return visitorId;
};

export default getDeviceId;
