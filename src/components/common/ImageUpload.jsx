import { useRef } from "react";

function ImageUpload(props) {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.click();
  }

  function handleFileChange(e) {
    let ImageAllFiles = e.target.files;

    if (!ImageAllFiles.length) {
      return;
    }

    let images = [];
    let previewImages = [];

    for (let i = 0; i < ImageAllFiles.length; i++) {
      let type = ImageAllFiles[i].name.split(".");
      images.push(ImageAllFiles[i]);
      previewImages.push(URL.createObjectURL(ImageAllFiles[i]));
    }

    // 👇️ reset file input
    e.target.value = null;

    let data = {
      images,
      previewImages,
    };

    props.imageUploadEmit(data);
  }

  return (
    <div
      className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-5 cursor-pointer"
      onClick={handleClick}
    >
      <div className="text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="flex text-sm leading-6 text-gray-600">
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            className="sr-only"
            accept="image/jpeg,image/png"
            ref={inputRef}
            onChange={handleFileChange}
          />
          <p className="pl-1"> Upload File</p>
        </div>
        <p className="text-xs leading-5 text-gray-600">PNG, JPG</p>
      </div>
    </div>
  );
}

export default ImageUpload;
