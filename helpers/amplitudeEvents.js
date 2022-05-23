export const EVENTS = {
  SIGN_IN: 'SIGN_IN',
  O_AUTH: 'O_AUTH',
  O_AUTH_FACEBOOK: 'O_AUTH_FACEBOOK',
  O_AUTH_GOOGLE: 'O_AUTH_GOOGLE',

  SIGN_UP: 'REGISTRATION_EMAIL',
  CREATE_MANGA_STORY: 'CREATE_MANGA_STORY',
  CREATE_MANGA_STORY_GENRES_NEXT: 'CREATE_MANGA_STORY_GENRES_NEXT',
  CREATE_MANGA_STORY_LANGUAGES_NEXT: 'CREATE_MANGA_STORY_LANGUAGES_NEXT',
  CREATE_MANGA_STORY_LOOKING_FOR_NEXT: 'CREATE_MANGA_STORY_LOOKING_FOR_NEXT',
  CREATE_MANGA_STORY_MODEL_NEXT: 'CREATE_MANGA_STORY_MODEL_NEXT',
  CREATE_MANGA_STORY_DESCRIPTION_NEXT: 'CREATE_MANGA_STORY_DESCRIPTION_NEXT',
  CREATE_MANGA_STORY_TITLE_NEXT: 'CREATE_MANGA_STORY_TITLE_NEXT',
  CREATE_MANGA_STORY_STORY_NEXT: 'CREATE_MANGA_STORY_STORY_NEXT',
  PILOT_COMPLETED: 'PILOT_COMPLETED',
  CHARACTERS_COMPLETED: 'CHARACTERS_COMPLETED',
  PAGES_COMPLETED: 'PAGES_COMPLETED',
  PROJECT_CHAPTER: 'PROJECT_CHAPTER',
  TEMPLATES_COMPLETED: 'TEMPLATES_COMPLETED',
  PROJECT_UPLOADED: 'PROJECT_UPLOADED',
  PROJECT_PUBLISHED: 'PROJECT_PUBLISHED',
  PRINT_AND_SELL: 'PRINT_AND_SELL',
  PROTECT_AND_SELL: 'PROTECT_AND_SELL',
  MERCH_MAKER: 'MERCH_MAKER',
  SHORT_COMICS: 'SHORT_COMICS',
  ON_BOARDING: 'ON_BOARDING',

  // Profile
  UPDATE_FULL_NAME: 'UPDATE_FULL_NAME',
  ADDED_BIO: 'ADDED_BIO',
  ADDED_PHOTO: 'ADDED_PHOTO',
  ADDED_GENRES: 'ADDED_GENRES',
  SOCIAL_ACCOUNT: 'SOCIAL_ACCOUNT',
  ADDED_PORTFOLIO: 'ADDED_PORTFOLIO',
  ADDED_PORTFOLIO_PDF: 'ADDED_PORTFOLIO_PDF',
  ADDED_PORTFOLIO_TEXT: 'ADDED_PORTFOLIO_TEXT',
  COMMISION_CREATED: 'COMMISION_CREATED',
  COMMISION_DELETE: 'COMMISION_DELETE',
  COMMISION_EDIT: 'COMMISION_EDIT',
  COMMISION_SAVE: 'COMMISION_SAVE',
  ADDED_USER_TYPES: 'ADDED_USER_TYPES',
  CREATE_PROJECT_COMPLETE: 'CREATE_PROJECT_COMPLETE',
  DELETE_ACCOUNT: 'DELETE_ACCOUNT',
  UPDATE_USER_IN_MODAL: 'UPDATE_USER_IN_MODAL',
  MINI_JOB_OPEN_CREATE_MODAL: 'MINI_JOB_OPEN_CREATE_MODAL',
  MINI_JOB_OPEN_EDIT_MODAL: 'MINI_JOB_OPEN_EDIT_MODAL',
  CLOSE_UPDATE_USER_MODAL: 'CLOSE_UPDATE_USER_MODAL',

  // Project
  EDIT_PROJECT: 'EDIT_PROJECT',
  DELETE_PROJECT: 'DELETE_PROJECT',
  CREATE_PROJECT_START: 'CREATE_PROJECT_START',
  SHARED_PROJECT: 'SHARED_PROJECT',
  GO_TO_PRIVATE: 'GO_TO_PRIVATE',
  GO_TO_PUBLIC: 'GO_TO_PUBLIC',
  BUDGET_WHIT: 'BUDGET_WHIT',
  BUDGET_NO: 'BUDGET_NO',
  EDIT_PROJECT_LANGUAGE: 'EDIT_PROJECT_LANGUAGE',
  EDIT_PROJECT_TYPE: 'EDIT_PROJECT_TYPE',
  EDIT_PROJECT_TITLE: 'EDIT_PROJECT_TITLE',
  EDIT_PROJECT_STORY: 'EDIT_PROJECT_STORY',
  EDIT_PROJECT_GENRES: 'EDIT_PROJECT_GENRES',
  EDIT_PROJECT_PUBLISHED: 'EDIT_PROJECT_PUBLISHED',
  EDIT_PROJECT_DOMAIN: 'EDIT_PROJECT_DOMAIN',
  EDIT_PROJECT_PAY_PAL_PUBLISHED: 'EDIT_PROJECT_PAY_PAL_PUBLISHED',
  EDIT_PROJECT_PAY_PAL_EMAIL: 'EDIT_PROJECT_PAY_PAL_EMAIL',
  OPENED_MANGA_STORY: 'OPENED_MANGA_STORY',

  // Board
  CHANGE_BOARD_TITLE: 'CHANGE_BOARD_TITLE',
  CHANGE_BOARD_DESCRIPTION: 'CHANGE_BOARD_DESCRIPTION',
  CREATE_BOARD_CHARACTER: 'CREATE_BOARD_CHARACTER',
  CREATE_BOARD_TOOL: 'CREATE_BOARD_TOOL',
  CREATE_BOARD_BACKGROUND: 'CREATE_BOARD_BACKGROUND',
  ADDED_BOARD_PAGE: 'ADDED_BOARD_PAGE',
  CHANGE_BOARD_CHARACTER: 'CHANGE_BOARD_CHARACTER',
  DUPLICATE_BOARD_CHARACTER: 'DUPLICATE_BOARD_CHARACTER',
  DELETE_BOARD_CHARACTER: 'DELETE_BOARD_CHARACTER',
  CHANGE_BOARD_TOOL: 'CHANGE_BOARD_TOOL',
  DUPLICATE_BOARD_TOOL: 'DUPLICATE_BOARD_TOOL',
  DELETE_BOARD_TOOL: 'DELETE_BOARD_TOOL',
  CHANGE_BOARD_BACKGROUND: 'CHANGE_BOARD_BACKGROUND',
  DUPLICATE_BOARD_BACKGROUND: 'DUPLICATE_BOARD_BACKGROUND',
  DELETE_BOARD_BACKGROUND: 'DELETE_BOARD_BACKGROUND',

  // Task
  CHOOSED_TASK_ROLL_TYPE: 'CHOOSED_TASK_ROLL_TYPE',
  CHOOSED_TASK_COMMISSION_TYPE: 'CHOOSED_TASK_COMMISSION_TYPE',
  ADDED_TASK_DESCRIPTION: 'ADDED_TASK_DESCRIPTION',
  CHOOSED_TASK_TYPE: 'CHOOSED_TASK_TYPE',
  ADDED_TASK_PRICE: 'ADDED_TASK_PRICE',
  MINI_JOB_CREATED: 'MINI_JOB_CREATED',
  MINI_JOB_EDITED: 'MINI_JOB_EDITED',
  MINI_JOB_REMOVED: 'MINI_JOB_REMOVED',

  // Feed
  OPENED_POST: 'OPENED_POST',
  EDIT_POST: 'EDIT_POST',
  DELETE_POST: 'DELETE_POST',
  CREATE_NEW_POST: 'CREATE_NEW_POST',
  OPEN_CREATE_NEW_POST_MODAL: 'OPEN_CREATE_NEW_POST_MODAL',
  UNAUTHORIZED_CREATE_NEW_POST: 'UNAUTHORIZED_CREATE_NEW_POST',
  OPENED_ALL_COLLABORATION: 'OPENED_ALL_COLLABORATION',
  OPENED_ALL_PROFILES: 'OPENED_ALL_PROFILES',
  DAILY_WARM: 'DAILY_WARM',
  POST_MANGA: 'POST_MANGA',
  POST_TASK: 'POST_TASK',

  // Another user profile
  SHARED_MY_ACCOUNT: 'SHARED_MY_ACCOUNT',
  SHARED_ANOTHER_ACCOUNT: 'SHARED_ANOTHER_ACCOUNT',
  FOLLOW_ACCOUNT: 'FOLLOW_ACCOUNT',
  UNFOLLOW_ACCOUNT: 'UNFOLLOW_ACCOUNT',
  MESSAGED_ACCOUNT: 'MESSAGED_ACCOUNT',
  LIKE_PORTFOLIO: 'LIKE_PORTFOLIO',
  CHECKED_ACCOUNT_TABS: 'CHECKED_ACCOUNT_TABS',

  POST_COMMENT: 'POST_COMMENT',
  UNAUTHORIZED_POST_COMMENT: 'UNAUTHORIZED_POST_COMMENT',
  POST_LIKE: 'POST_LIKE',
  ADD_FEEDBACK: 'ADD_FEEDBACK',

  INVITE_SOMEONE: 'INVITE_SOMEONE',
  REQUEST_TO_JOIN: 'REQUEST_TO_JOIN',
  OPEN_MODAL_REQUEST_TO_JOIN: 'OPEN_MODAL_REQUEST_TO_JOIN',

  INVITE_ACCEPTED: 'INVITE_ACCEPTED',
  INVITE_REJECTED: 'INVITE_REJECTED',

  REQUEST_ACCEPTED: 'REQUEST_ACCEPTED',
  REQUEST_REJECTED: 'REQUEST_REJECTED',

  ADDED_COMMENT: 'ADDED_COMMENT',

  PUBLISH_MANGA_CAT: 'PUBLISH_MANGA_CAT',
  INVITE_MEMBER: 'INVITE_MEMBER',
  INVITE_MEMBER_LINK: 'INVITE_MEMBER_LINK',

  GET_MANGAFYD: 'GET_MANGAFYD',

  // View
  OPEN_VIEW_PAGE: 'OPEN_VIEW_PAGE',
  NEXT_VIEW_PAGE: 'NEXT_VIEW_PAGE',
  PREV_VIEW_PAGE: 'PREV_VIEW_PAGE',
  CHOOSE_VIEW_CHAPTER: 'CHOOSE_VIEW_CHAPTER',
  SHARE_VIEW_PAGE: 'SHARE_VIEW_PAGE',
  ADD_VIEW_COMMENT: 'ADD_VIEW_COMMENT',
  CREATE_VIEW_BUBBLE_TEA: 'CREATE_VIEW_BUBBLE_TEA',

  // Chapter
  PUBLISHED_CHAPTER: 'PUBLISHED_CHAPTER',
  DRAFT_CHAPTER: 'DRAFT_CHAPTER',
  ADDING_PAGES: 'ADDING_PAGES',
  CREATE_CHAPTER: 'CREATE_CHAPTER',
  ADD_CHAPTER_COVER: 'ADD_CHAPTER_COVER',
};
