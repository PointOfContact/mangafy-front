const { default: axios } = require('axios');

const download = (urls, nameImage) => {
  const getIndexType = urls.indexOf('.', 18);
  let getFileType = '';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < urls.length; i++) {
    if (i >= getIndexType) {
      // eslint-disable-next-line no-unused-vars
      getFileType += urls[i];
    }
  }

  return axios({
    url: urls, // your url
    method: 'GET',
    responseType: 'blob', // important
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', nameImage + getFileType); // or any other extension
    document.body.appendChild(link);
    link.click();
  });
};

export default download;
