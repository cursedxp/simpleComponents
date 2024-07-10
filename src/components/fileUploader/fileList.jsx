import PropTypes from "prop-types";
import style from "./fileList.module.scss";
import { StarIcon } from "@heroicons/react/24/solid";

export default function FileList({ files, className }) {
  return (
    <div className={`${className}`}>
      <div className={style.header}>
        <div className={style.headerContext}>
          <h4>Files</h4>
          <div className={style.headerInfo}>
            <StarIcon className={style.icon} />
            <span>Please select concept preview image</span>
          </div>
        </div>
      </div>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <img
              src="https://images.unsplash.com/photo-1533779283484-8ad4940aa3a8"
              alt=""
              width={64}
              height={64}
            />
            <div className={style.fileInfo}>
              <p className={style.fileName}>{file.name}</p>
              <p className={style.fileSize}>File size 12Mb </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

FileList.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string,
};
