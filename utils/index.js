import { editGallery, viewManga } from 'components/gallery/utils';
import API from 'features/mangaStory/mangaStoryAPI';
import getDeviceId from './deviceId';

const logickView = async (user, data, id, key) => {
  const userId = user?._id || (await getDeviceId(() => {}));
  const existUser = data?.viewerId.some((value) => String(value) === String(userId));
  const view = data?.view + 1;
  const changeData = { view };
  changeData[key] = id;
  if (!existUser) changeData.viewerId = [...data?.viewerId, userId];
  return changeData;
};

export const viewShot = async (user, data) => {
  const changeData = await logickView(user, data, data.authorId, 'authorId');
  editGallery(data._id, changeData);
};

export const viewMangaFun = async (user, data, mangaStoryId) => {
  const changeData = await logickView(user, data, mangaStoryId, 'mangaStoryId');
  viewManga(data._id, changeData);
};

export const viewChapterFun = async (user, data) => {
  const userId = user?._id || (await getDeviceId(() => {}));
  const existUser = data?.viewDeviceUnique.some((value) => String(value) === String(userId));
  const view = data?.view + 1;
  const changeData = { view, storyBoardId: data?.storyBoardId };
  if (!existUser) changeData.viewDeviceUnique = [...data?.viewDeviceUnique, userId];
  API.chapter.patch(data._id, changeData);
};
