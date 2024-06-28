import PropTypes from "prop-types";
import { useRef, useState, useEffect, useCallback } from "react";
import Dropzone from "./dropZone";
import style from "./fileUploader.module.css";
import FileList from "./fileList";

export default function FileUploader({ accept = "*/*" }) {
  const fileInput = useRef(null);
  const [files, setFiles] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (files.length > 0) {
      setShowList(true);
    } else {
      setShowList(false);
    }
  }, [files]);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  }, []);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
  }, []);

  const handleClick = useCallback(() => {
    fileInput.current.click();
  }, []);

  const handleFileChange = useCallback((event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  }, []);

  return (
    <div className={`${style.fileUploader} ${loaded ? style.loaded : ""}`}>
      <Dropzone
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleClick}
        accept={accept}
        showList={showList}
      />
      <FileList
        files={files}
        className={`${style.fileList} ${showList ? style.show : ""}`}
      />
      <input
        ref={fileInput}
        type="file"
        accept={accept}
        multiple
        className={style.uploaderInput}
        onChange={handleFileChange}
      />
    </div>
  );
}

FileUploader.propTypes = {
  accept: PropTypes.string,
};
