import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import EditPanel from "../../components/EditPanel";
import SwitchTheme from "../../components/SwitchTheme";
import ChatBox from "../../components/ChatBox";
import { ChatBoxContextProvider } from "../../context/ChatBoxContext";

const cx = classNames.bind(styles);

const Home = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("avatar-container")}>
          <img className={cx("avatar")} src={"/logo192.png"} alt="avatar"></img>
        </div>
      </div>
      <div className={cx("body")}>
        <div className={cx("title")}>AutoChat</div>
        <ChatBoxContextProvider>
          <EditPanel />
          <ChatBox />
        </ChatBoxContextProvider>
      </div>
      <div className={cx("btn-switch-theme")}>
        <SwitchTheme />
      </div>
    </div>
  );
};

export default Home;
