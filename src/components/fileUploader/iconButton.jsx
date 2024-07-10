import style from "./iconButton.module.scss";
import PropTypes from "prop-types";

export default function IconButton({ children, onClick }) {
  return (
    <div className={style.wrapper} onClick={onClick}>
      {children}
    </div>
  );
}
IconButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};
