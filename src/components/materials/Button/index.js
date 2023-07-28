import classNames from "classnames/bind";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

function Button({ className, children, onClick, primary, outline, props }) {
  if (primary) {
    outline = !primary;
  }
  return (
    <button
      className={`${className} ${cx("wrapper", { primary, outline })}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
