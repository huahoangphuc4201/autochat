import classNames from "classnames/bind";
import styles from "./DotTyping.module.scss";

const cx = classNames.bind(styles);

const DotTyping = () => {
  return (
    <div className={cx("typing")}>
      <div className={cx("typing__dot")}></div>
      <div className={cx("typing__dot")}></div>
      <div className={cx("typing__dot")}></div>
    </div>
  );
};

export default DotTyping;
