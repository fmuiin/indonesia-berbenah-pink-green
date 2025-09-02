export default function ImagePreview({ originalSrc, processedSrc, isProcessing }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Original Image */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">Original</h3>
        <div className="relative">
          {originalSrc ? (
            <img
              src={originalSrc}
              alt="Original"
              className="w-full h-auto rounded-lg shadow-lg border border-gray-200"
            />
          ) : (
            <div className="w-full h-64 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              <span className="text-gray-500">No image uploaded</span>
            </div>
          )}
        </div>
      </div>

      {/* Processed Image */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">Brave Pink & Hero Green Filter</h3>
        <div className="relative">
          {processedSrc ? (
            <div className="relative">
              <img
                src={processedSrc}
                alt="Processed with tritone filter"
                className="w-full h-auto rounded-lg shadow-lg border border-gray-200"
              />
              {isProcessing && (
                <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                  <div className="bg-white rounded-lg p-4 flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-brave-pink"></div>
                    <span className="text-sm text-gray-700">Processing...</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-64 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              <span className="text-gray-500">Upload an image to see the result</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
