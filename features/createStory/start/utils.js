function getGenerIdByName(genres, name) {
  // eslint-disable-next-line no-underscore-dangle
  return genres.find(({ value }) => value === name.toLocaleUpperCase())?._id;
}

function getDataByFeildName(data, name, genres) {
  const { choice, text, choices, file_url } = data.find(({ field }) => field?.ref === name);
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
    default:
      return null;
  }
}

function adaptData(data, genres) {
  return {
    introduce: getDataByFeildName(data, 'introduce'),
    description: getDataByFeildName(data, 'story'),
    story: getDataByFeildName(data, 'story'),
    title: getDataByFeildName(data, 'title'),
    searchingFor: getDataByFeildName(data, 'searchingFor'),
    compensationModel: getDataByFeildName(data, 'compensationModel'),
    preferredLanguage: 'English',
    genresIds: getDataByFeildName(data, 'genresIds', genres),
    // preferredLanguage: getDataByFeildName(data, 'preferredLanguage'),
    // image: getDataByFeildName(data, 'banner'),
    projectType: getDataByFeildName(data, 'projectType'),
  };
}

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export { adaptData, timeout };
