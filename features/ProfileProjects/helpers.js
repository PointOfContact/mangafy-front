export function countPages(project) {
  let pagesCount = 0;
  project?.storyBoards?.data.forEach((sb) => {
    sb.chapters?.forEach((ch) => {
      pagesCount += ch.pages.length;
    });
  });
  return pagesCount;
}

export function getEditedDate(project) {
  const date = project?.storyBoards?.data[0]?.updatedAt;
  return date?.slice(0, 10);
}

export function getCreatedDate(project) {
  const date = project?.storyBoards?.data[0]?.createdAt;
  return date?.slice(0, 10);
}
