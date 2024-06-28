import style from "./dropZone.module.css";
import PropTypes from "prop-types";
import { DocumentArrowUpIcon } from "@heroicons/react/24/outline";

export default function DropZone({
  onDrop,
  onDragOver,
  onClick,
  accept,
  showList,
}) {
  return (
    <div
      className={`${style.dropzone} ${showList ? style.shrink : ""}`}
      onDrop={onDrop}
      onClick={onClick}
      onDragOver={onDragOver}
    >
      <div className={style.dropZoneContent}>
        <div className={style.iconWrapper}>
          <DocumentArrowUpIcon className={style.icon} />
        </div>
        <p>Drag and drop files here or click to upload</p>
        <p className={style.fileTypes}>Supported file types: {accept}</p>
      </div>
    </div>
  );
}

DropZone.propTypes = {
  onDrop: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  accept: PropTypes.string,
  className: PropTypes.string,
  showList: PropTypes.bool,
};
