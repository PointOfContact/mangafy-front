const wrapUrls = (text) => {
  // eslint-disable-next-line no-useless-escape
  const url_pattern =
    // eslint-disable-next-line no-useless-escape
    /(http|ftp|https|www):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/gi;
  return text.replace(url_pattern, (url) => {
    const href = url_pattern.test(url) ? url : `http://${url}`;
    return `<a href="${href}" target="_blank">${url}</a>`;
  });
};

export default wrapUrls;
