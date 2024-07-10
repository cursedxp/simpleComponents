import PropTypes from "prop-types";
import style from "./fileList.module.scss";
// import { StarIcon } from "@heroicons/react/24/solid";
import { useCallback } from "react";
import IconButton from "./iconButton";
import { TrashIcon } from "@heroicons/react/24/outline";
import UploadButton from "./uploadButton";

export default function FileList({ details, className, removeFile }) {
  const calculateFileSize = useCallback((size) => {
    if (size === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }, []);

  const shortenFileName = useCallback((name) => {
    if (name.length > 25) {
      return name.slice(0, 15) + "...";
    }
    return name;
  }, []);

  return (
    <div className={`${className}`}>
      <div className={style.header}>
        <div className={style.headerContext}>
          <h4>Files</h4>
          {/* <div className={style.headerInfo}>
            <StarIcon className={style.icon} />
            <span>Please select concept preview image</span>
          </div> */}
        </div>
        <UploadButton text={"Upload"} onUpload={""} />
      </div>
      <ul>
        {details.map((file, index) => (
          <li key={index}>
            <img src={file.preview} alt="" width={64} height={64} />
            <div className={style.fileInfo}>
              <p className={style.fileName}>{shortenFileName(file.name)}</p>
              <p className={style.fileSize}>{calculateFileSize(file.size)} </p>
            </div>
            <IconButton onClick={() => removeFile(index)}>
              <TrashIcon />
            </IconButton>
          </li>
        ))}
      </ul>
    </div>
  );
}

FileList.propTypes = {
  details: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string,
  removeFile: PropTypes.func.isRequired,
};
