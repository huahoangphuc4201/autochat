import {
  ADD_EDITED_MESSAGE,
  SET_MESSAGE_INDEX,
  ADD_PLAYED_MESSAGE,
  SET_DRAFT_MESSAGE,
  REMOVE_EDITED_MESSAGE,
  SET_EDIT_MODE,
  SET_FRIEND_AVATAR,
  SET_ONLINE,
  REMOVE_ALL_PLAYED_MESSAGES,
  SET_FRIEND_NAME,
  SET_LAYOUT,
} from "./constants";

const getEditedMessages = () => {
  let chatScript = localStorage.getItem("editedMessages");
  if (!chatScript || JSON.parse(chatScript).length === 0) {
    return [];
  }
  return JSON.parse(chatScript);
};

export const initState = {
  editedMessages: getEditedMessages(),
  playedMessages: [],
  messageIndex: 0,
  friendAvatar: "/logo192.png",
  friendName: "",
  editMode: true,
  draftMessage: undefined,
  layout: "Web",
  online: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_PLAYED_MESSAGE:
      return {
        ...state,
        playedMessages: [...state.playedMessages, action.payload],
      };
    case REMOVE_ALL_PLAYED_MESSAGES:
      return {
        ...state,
        playedMessages: [],
      };
    case SET_MESSAGE_INDEX:
      return {
        ...state,
        messageIndex: action.payload,
      };
    case ADD_EDITED_MESSAGE:
      return {
        ...state,
        editedMessages: [...state.editedMessages, action.payload],
      };
    case REMOVE_EDITED_MESSAGE:
      return {
        ...state,
        editedMessages: state.editedMessages.filter(
          (item, i) => i !== action.payload
        ),
      };
    case SET_DRAFT_MESSAGE:
      return {
        ...state,
        draftMessage: action.payload,
      };
    case SET_EDIT_MODE:
      return {
        ...state,
        editMode: action.payload,
      };
    case SET_FRIEND_AVATAR:
      return {
        ...state,
        friendAvatar: action.payload,
      };
    case SET_ONLINE:
      return {
        ...state,
        online: action.payload,
      };
    case SET_FRIEND_NAME:
      return {
        ...state,
        friendName: action.payload,
      };
    case SET_LAYOUT:
      return {
        ...state,
        layout: action.payload,
      };
    default:
      throw new Error("Invalid action.");
  }
};

export default reducer;
