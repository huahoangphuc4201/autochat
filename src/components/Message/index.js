import { memo, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Message.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import DotTyping from "../DotTyping";

const cx = classNames.bind(styles);

const Message = (props) => {
  const [pending, setPending] = useState(!props.editMode);

  useEffect(() => {
    if (pending) {
      setTimeout(() => {
        setPending(false);
      }, 1000);
    }
  }, [pending]);

  var message;

  if (pending) {
    if (props.person === "friend") {
      message = (
        <div style={{ display: "flex" }}>
          <img
            className={cx("left-avatar")}
            src={props.avatar}
            alt="avatar"
          ></img>
          <DotTyping />
        </div>
      );
    }
  } else if (props.person === "friend") {
    message = (
      <div className={cx("align-left")}>
        <img
          className={cx("left-avatar")}
          src={props.avatar}
          alt="avatar"
        ></img>
        <div className={cx("message-container", props.person)}>
          {props.children}
        </div>
        {!props.isDraft && props.editMode && (
          <div
            href="#"
            className={cx("btn-remove-message")}
            onClick={() => props.onRemoveMessage(props.index)}
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </div>
        )}
      </div>
    );
  } else {
    message = (
      <div className={cx("align-right")}>
        {!props.isDraft && props.editMode && (
          <div
            href="#"
            className={cx("btn-remove-message")}
            onClick={() => props.onRemoveMessage(props.index)}
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </div>
        )}
        <div className={cx("message-container", props.person)}>
          {props.children}
        </div>
      </div>
    );
  }

  return message;
};

export default memo(Message);
