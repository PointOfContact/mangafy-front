function getGenerIdByName(genres, name) {
  // eslint-disable-next-line no-underscore-dangle
  return genres.find(({ value }) => value === name.toLocaleUpperCase())?._id;
}

function getDataByFieldName(data, name, genres) {
  const { choice, text, choices, file_url, email } =
    data.find(({ field }) => field?.ref === name) || {};

  switch (name) {
    case 'searchingFor':
      return choices?.labels;
    case 'projectType':
      return choice?.label;
    case 'compensationModel':
      // eslint-disable-next-line no-constant-condition
      return [choice?.label] === 'Freewill collaboration and ready to share'
        ? 'collaboration'
        : 'paid';
    case 'genresIds':
      return choices?.labels?.map((label) => getGenerIdByName(genres, label));
    case 'title':
      return text;
    case 'introduce':
      return text;
    case 'banner':
      return file_url;
    case 'story':
      return text;
    case 'preferredLanguage':
      return choice?.label;
    case 'payPalEmail':
      return email;
    default:
      return null;
  }
}

function adaptData(data, genres) {
  return {
    mangaStory: {
      introduce: getDataByFieldName(data, 'introduce'),
      description: getDataByFieldName(data, 'story'),
      story: getDataByFieldName(data, 'story'),
      title: getDataByFieldName(data, 'title'),
      searchingFor: getDataByFieldName(data, 'searchingFor'),
      compensationModel: getDataByFieldName(data, 'compensationModel'),
      preferredLanguage: 'English',
      genresIds: getDataByFieldName(data, 'genresIds', genres),
      // preferredLanguage: getDataByFieldName(data, 'preferredLanguage'),
      // image: getDataByFieldName(data, 'banner'),
      projectType: getDataByFieldName(data, 'projectType'),
    },
    user: {
      payPalEmail: getDataByFieldName(data, 'payPalEmail'),
    },
  };
}

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export { adaptData, timeout };
