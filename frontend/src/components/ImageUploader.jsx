import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import heic2any from "heic2any";

function ImageUploader({ value, onChange, required = false }) {
  const [preview, setPreview] = useState(value || "");
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (file) => {
    if (!file) return;

    const isValidImage = file.type.startsWith("image/") || file.name.match(/\.(heic|heif)$/i);
    
    if (!isValidImage) {
      alert("Please select a valid image file (PNG, JPG, GIF, HEIC)");
      return;
    }

    try {
      let fileToProcess = file;

      // Check if file is HEIC/HEIF and convert to JPEG
      if (file.name.match(/\.(heic|heif)$/i) || file.type === "image/heic" || file.type === "image/heif") {
        setIsConverting(true);
        console.log("Converting HEIC to JPEG...");
        
        // Convert HEIC to JPEG blob
        const convertedBlob = await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 1
        });

        // Handle array of blobs (heic2any can return array)
        const blob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
        
        // Create a new File object from the blob
        fileToProcess = new File([blob], file.name.replace(/\.(heic|heif)$/i, ".jpg"), {
          type: "image/jpeg"
        });
        
        console.log("HEIC conversion successful");
        setIsConverting(false);
      }

      // Read the file (original or converted) as base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onChange(reader.result);
      };
      reader.readAsDataURL(fileToProcess);
      
    } catch (error) {
      console.error("Error processing image:", error);
      setIsConverting(false);
      alert("Failed to process image. Please try a different file.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleRemove = () => {
    setPreview("");
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.heic,.heif"
        onChange={handleFileInputChange}
        className="hidden"
        required={required && !preview}
      />

      {isConverting ? (
        <div className="w-full aspect-[3/2] rounded-2xl border-2 border-dashed border-[#E5E7EB] bg-[#F9FAFB] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-[#E5E7EB] border-t-[#0A0A0A] rounded-full animate-spin"></div>
            <p className="text-sm text-[#0A0A0A] font-medium">Converting HEIC image...</p>
            <p className="text-xs text-[#9CA3AF]">This may take a moment</p>
          </div>
        </div>
      ) : preview ? (
        <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden border border-[#E5E7EB] bg-[#F9FAFB]">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-[#F9FAFB] transition-colors border border-[#E5E7EB] cursor-pointer"
            title="Remove image"
          >
            <X className="w-4 h-4 text-[#0A0A0A]" />
          </button>
        </div>
      ) : (
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`w-full aspect-[3/2] rounded-2xl border-2 border-dashed transition-all cursor-pointer ${
            isDragging
              ? "border-[#0A0A0A] bg-[#F9FAFB]"
              : "border-[#E5E7EB] bg-white hover:bg-[#F9FAFB]"
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
            <div className={`p-4 rounded-full transition-colors ${
              isDragging ? "bg-[#0A0A0A]" : "bg-[#F9FAFB]"
            }`}>
              {isDragging ? (
                <Upload className="w-8 h-8 text-white" />
              ) : (
                <ImageIcon className="w-8 h-8 text-[#9CA3AF]" />
              )}
            </div>
            <div>
              <p className="text-sm text-[#0A0A0A] font-medium mb-1">
                {isDragging ? "Drop image here" : "Click to upload or drag and drop"}
              </p>
              <p className="text-xs text-[#9CA3AF]">
                PNG, JPG, GIF, HEIC up to 10MB
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;