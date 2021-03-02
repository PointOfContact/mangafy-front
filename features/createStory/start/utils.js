function getGenerIdByName(genres, name) {
  // eslint-disable-next-line no-underscore-dangle
  return genres.find(({ value }) => value === name.toLocaleUpperCase())?._id;
}

function getDataByFeildName(data, name, genres) {
  const { choice, text, choices } = data.find(({ field }) => field.ref === name);
  switch (name) {
    case 'searchingFor':
      return choices.labels;
    case 'compensationModel':
      // eslint-disable-next-line no-constant-condition
      return [choice.label] === 'Freewill collaboration and ready to share'
        ? 'collaboration'
        : 'paid';
    case 'genresIds':
      return choices.labels.map((label) => getGenerIdByName(genres, label));
    case 'title':
      return text;
    case 'introduce':
      return text;
    case 'story':
      return text;
    case 'preferredLanguage':
      return choice.label;
    default:
      return null;
  }
}

function adaptData(data, genres) {
  return {
    introduce: getDataByFeildName(data, 'introduce'),
    description: getDataByFeildName(data, 'introduce'),
    story: getDataByFeildName(data, 'story'),
    title: getDataByFeildName(data, 'title'),
    searchingFor: getDataByFeildName(data, 'searchingFor'),
    compensationModel: getDataByFeildName(data, 'compensationModel'),
    preferredLanguage: getDataByFeildName(data, 'preferredLanguage'),
    genresIds: getDataByFeildName(data, 'genresIds', genres),
  };
}

export { adaptData };
