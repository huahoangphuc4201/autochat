import { memo, useContext, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./EditPanel.module.scss";
import Button from "../materials/Button";
import { ChatBoxContext } from "../../context/ChatBoxContext";
import {
  addEditedMessage,
  removeAllPlayedMessages,
  setDraftMessage,
  setEditMode,
  setFriendAvatar,
  setLayout,
  setMessageIndex,
  setOnline,
} from "../../context/ChatBoxContext/actions";
import useLocalStorage from "../../hooks/useLocalStorage";
import { PlayIcon, SendIcon, StopIcon } from "../../assets/icons";

const cx = classNames.bind(styles);

const EditPanel = () => {
  const [message, setMessage] = useState({
    person: "friend",
    content: "",
  });

  const [_, setEditedMessages] = useLocalStorage("editedMessages", []);

  const chatBoxContext = useContext(ChatBoxContext);
  const { editMode, layout, editedMessages } = chatBoxContext.states;

  const imageRef = useRef();
  const inputMessageRef = useRef();

  const handleChangeOnline = (online) => {
    chatBoxContext.dispatch(setOnline(online));
  };

  const handleChangeMessage = (messageContent) => {
    setMessage({ ...message, content: messageContent });
    chatBoxContext.dispatch(
      setDraftMessage({ ...message, content: messageContent })
    );
  };

  const handleChangePerson = (personType) => {
    setMessage({ ...message, person: personType });
    chatBoxContext.dispatch(
      setDraftMessage({ ...message, person: personType })
    );
  };

  const handleAddMessage = () => {
    if (message.content.length > 0) {
      chatBoxContext.dispatch(addEditedMessage(message));
      chatBoxContext.dispatch(setDraftMessage(undefined));
      setEditedMessages(() => [...editedMessages, message]);
    }
    setMessage({ ...message, content: "" });
    inputMessageRef.current.focus();
  };

  const handleChangeEditedMode = (isEditMode) => {
    if (!isEditMode) {
      if (chatBoxContext.states.editedMessages.length === 0) {
        return;
      } else {
        chatBoxContext.dispatch(setEditMode(isEditMode));
      }
    } else {
      chatBoxContext.dispatch(setEditMode(isEditMode));
      chatBoxContext.dispatch(removeAllPlayedMessages());
      chatBoxContext.dispatch(setMessageIndex(0));
    }
  };

  const handleChangeFriendAvatar = (imageURL) => {
    chatBoxContext.dispatch(setFriendAvatar(imageURL));
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("quick-action-panel")}>
        <div className={cx("input-avatar")}>
          <label className={cx("btn-browse")} htmlFor="input-avatar">
            Chọn tệp
          </label>
          <span>
            {imageRef.current && imageRef.current.files[0]
              ? imageRef.current.files[0].name
              : "Không có file nào được chọn"}
          </span>
          <input
            style={{ display: "none" }}
            id="input-avatar"
            ref={imageRef}
            type="file"
            onChange={(e) =>
              handleChangeFriendAvatar(URL.createObjectURL(e.target.files[0]))
            }
          />
        </div>
        <div className={cx("layouts")}>
          <div>
            <input
              type="radio"
              name="layout"
              value="Web"
              checked={layout === "Web"}
              onChange={(e) =>
                chatBoxContext.dispatch(setLayout(e.target.value))
              }
            />
            <label>Web</label>
          </div>
          <div>
            <input
              type="radio"
              name="layout"
              value="App"
              checked={layout === "App"}
              onChange={(e) =>
                chatBoxContext.dispatch(setLayout(e.target.value))
              }
            />
            <label>App</label>
          </div>
        </div>
        <div className={cx("options")}>
          <div>
            <input
              type="checkbox"
              onChange={(e) => handleChangeOnline(!e.target.checked)}
            />
            <label>Offline</label>
          </div>
          <div>
            <input type="checkbox" />
            <label>Profile</label>
          </div>
        </div>
      </div>
      <div className={cx("edit-panel")}>
        <div className={cx("message-wrapper")}>
          <input
            ref={inputMessageRef}
            type="text"
            className={cx("input-message")}
            onChange={(e) => handleChangeMessage(e.target.value)}
            placeholder="Aa"
            value={message.content}
            onKeyDown={(e) => e.key === "Enter" && handleAddMessage()}
          />
          <div className={cx("btn-add")} onClick={() => handleAddMessage()}>
            <SendIcon w="28px" h="28px" />
          </div>
        </div>
        <div className={cx("person")}>
          <Button
            primary={message.person === "friend"}
            outline
            className={cx("btn")}
            onClick={() => handleChangePerson("friend")}
          >
            Friend
          </Button>
          <Button
            primary={message.person === "me"}
            outline
            className={cx("btn")}
            onClick={() => handleChangePerson("me")}
          >
            Me
          </Button>
        </div>
        {editMode ? (
          <Button
            outline
            className={cx("btn-action")}
            title="Play"
            onClick={() => handleChangeEditedMode(false)}
          >
            <PlayIcon w="12px" h="16px"></PlayIcon>
          </Button>
        ) : (
          <Button
            primary
            className={cx("btn-action")}
            title="Cancel"
            onClick={() => handleChangeEditedMode(true)}
          >
            <StopIcon w="14px" h="14px" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default memo(EditPanel);
