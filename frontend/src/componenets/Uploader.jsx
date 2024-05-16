import { FiUpload } from "react-icons/fi";

const Uploader = ({ onChange, name, multiple }) => {
  return (
    <div className="w-full overflow-hidden cursor-pointer">
      <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey h-12 w-[100%] cursor-pointer">
        <label htmlFor={name}>
          <div className="flex items-center justify-center mt-2 gap-4">
            <h1 className="cursor-pointer">Upload Image</h1>
            <h1 className="cursor-pointer">
              <FiUpload />
            </h1>
          </div>
          <input
            type="file"
            name={name}
            id={name}
            onChange={onChange}
            accept=".png, .jpg, .jpeg"
            hidden
            {...(multiple && { multiple: true })}
          />
        </label>
      </div>
    </div>
  );
};

export default Uploader;
