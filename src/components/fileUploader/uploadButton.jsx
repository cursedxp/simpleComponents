import PropTypes from "prop-types";
import style from "./uploadButton.module.scss";
import { ArrowUpIcon } from "@heroicons/react/24/outline";
export default function UploadButton({ onUpload, text }) {
  return (
    <button onClick={onUpload}>
      <ArrowUpIcon className={style.icon} />
      {text}
    </button>
  );
}

UploadButton.propTypes = {
  onUpload: PropTypes.func.isRequired,
  text: PropTypes.string,
};
