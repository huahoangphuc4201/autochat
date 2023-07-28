import {
  SET_DRAFT_MESSAGE,
  ADD_EDITED_MESSAGE,
  SET_EDIT_MODE,
  SET_FRIEND_AVATAR,
  SET_FRIEND_NAME,
  SET_LAYOUT,
  SET_MESSAGE_INDEX,
  SET_ONLINE,
  ADD_PLAYED_MESSAGE,
  REMOVE_EDITED_MESSAGE,
  REMOVE_ALL_PLAYED_MESSAGES,
} from "./constants";

export const addEditedMessage = (payload) => {
  return { type: ADD_EDITED_MESSAGE, payload };
};
export const removeEditedMessage = (payload) => {
  return { type: REMOVE_EDITED_MESSAGE, payload };
};

export const addPlayedMessage = (payload) => {
  return { type: ADD_PLAYED_MESSAGE, payload };
};
export const removeAllPlayedMessages = () => {
  return { type: REMOVE_ALL_PLAYED_MESSAGES };
};

export const setMessageIndex = (payload) => {
  return { type: SET_MESSAGE_INDEX, payload };
};

export const setFriendAvatar = (payload) => {
  return { type: SET_FRIEND_AVATAR, payload };
};
export const setFriendName = (payload) => {
  return { type: SET_FRIEND_NAME, payload };
};
export const setEditMode = (payload) => {
  return { type: SET_EDIT_MODE, payload };
};
export const setDraftMessage = (payload) => {
  return { type: SET_DRAFT_MESSAGE, payload };
};
export const setLayout = (payload) => {
  return { type: SET_LAYOUT, payload };
};
export const setOnline = (payload) => {
  return { type: SET_ONLINE, payload };
};
