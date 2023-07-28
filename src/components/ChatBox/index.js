import classNames from "classnames/bind";
import { memo, useCallback, useContext, useEffect } from "react";
import { ChatBoxContext } from "../../context/ChatBoxContext";
import {
  addPlayedMessage,
  removeEditedMessage,
  setFriendName,
  setMessageIndex,
} from "../../context/ChatBoxContext/actions";
import Message from "../Message";
import styles from "./ChatBox.module.scss";
import useLocalStorage from "../../hooks/useLocalStorage";

const cx = classNames.bind(styles);

function ChatBox() {
  const chatBoxContext = useContext(ChatBoxContext);
  const [_, setEditedMessages] = useLocalStorage("editedMessages", []);
  const {
    editedMessages,
    playedMessages,
    messageIndex,
    friendAvatar,
    friendName,
    editMode,
    draftMessage,
    layout,
    online,
  } = chatBoxContext.states;

  useEffect(() => {
    if (!editMode) {
      const intervalId = setInterval(() => {
        if (messageIndex === editedMessages.length) {
          clearInterval(intervalId);
        } else {
          chatBoxContext.dispatch(
            addPlayedMessage(editedMessages[messageIndex])
          );
          chatBoxContext.dispatch(setMessageIndex(messageIndex + 1));
        }
      }, 2000);

      return () => clearInterval(intervalId);
    }
  }, [messageIndex, editedMessages, editMode, chatBoxContext]);

  const handleRemoveMessage = useCallback(
    (index) => {
      chatBoxContext.dispatch(removeEditedMessage(index));
      setEditedMessages(() => editedMessages.filter((item, i) => i !== index));
    },
    [chatBoxContext, editedMessages, setEditedMessages]
  );

  return (
    <div className={cx("chat-container")}>
      <div className={cx("chat-pannel")}>
        <div className={cx("chat-header")}>
          <div className={cx("friend-avatar")}>
            <img className={cx("avatar")} src={friendAvatar} alt="avatar"></img>
            {online && <div className={cx("state-badge")}></div>}
          </div>
          <div className={cx("friend")}>
            <input
              className={cx("friend-name")}
              type="text"
              placeholder="Enter friend's name"
              value={friendName}
              onChange={(e) =>
                chatBoxContext.dispatch(setFriendName(e.target.value))
              }
            />
            {online && <div className={cx("friend-state")}>Đang hoạt động</div>}
          </div>
        </div>
        <div className={cx("chat-body")}>
          {!editMode &&
            playedMessages.length > 0 &&
            playedMessages.map((message, index) => (
              <Message
                editMode={editMode}
                person={message.person}
                avatar={friendAvatar}
                key={index}
                index={index}
                onRemoveMessage={handleRemoveMessage}
              >
                {message.content}
              </Message>
            ))}
          {editMode &&
            editedMessages.length > 0 &&
            editedMessages.map((message, index) => (
              <Message
                editMode={editMode}
                person={message.person}
                avatar={friendAvatar}
                key={index}
                index={index}
                onRemoveMessage={handleRemoveMessage}
              >
                {message.content}
              </Message>
            ))}
          {editMode && draftMessage && draftMessage.content.length > 0 && (
            <Message
              editMode={editMode}
              person={draftMessage.person}
              avatar={friendAvatar}
              isDraft={true}
            >
              {draftMessage.content}
            </Message>
          )}
        </div>
        <div className={cx("chat-footer")}></div>
      </div>
    </div>
  );
}

export default memo(ChatBox);
