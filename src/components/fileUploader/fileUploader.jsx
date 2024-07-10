import PropTypes from "prop-types";
import { useRef, useState, useEffect, useCallback } from "react";
import Dropzone from "./dropZone";
import style from "./fileUploader.module.scss";
import FileList from "./fileList";

export default function FileUploader({ accept = "*/*" }) {
  const fileInput = useRef(null);
  const [files, setFiles] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [showList, setShowList] = useState(false);
  const [previews, setPreviews] = useState([]);

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

  const cretePreviews = useCallback((files) => {
    return files.map((file) => ({
      name: file.name,
      size: file.size,
      preview: URL.createObjectURL(file),
    }));
  }, []);

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      const droppedFiles = Array.from(event.dataTransfer.files);
      const filesWithPreview = cretePreviews(droppedFiles);
      setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
      setPreviews((prevPreviews) => [...prevPreviews, ...filesWithPreview]);
    },
    [cretePreviews]
  );

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
  }, []);

  const handleClick = useCallback(() => {
    fileInput.current.click();
  }, []);

  const handleFileChange = useCallback(
    (event) => {
      const selectedFiles = Array.from(event.target.files);
      const filesWithPreview = cretePreviews(selectedFiles);
      setPreviews((prevPreviews) => [...prevPreviews, ...filesWithPreview]);
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    },
    [cretePreviews]
  );

  const removeFile = useCallback((index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
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
        details={previews}
        removeFile={removeFile}
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
