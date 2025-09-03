import { useState } from 'react';

export default function Controls({ 
  colors, 
  onColorsChange, 
  tMid, 
  onTMidChange, 
  onReset,
  onDownload,
  hasResult 
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Filter Controls</h3>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm text-brave-pink hover:text-brave-pink/80 font-medium"
        >
          {showAdvanced ? 'Hide' : 'Show'} Advanced
        </button>
      </div>

      {/* Mid-tone Control */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Mid-tone Position: {Math.round(tMid * 100)}%
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={tMid}
          onChange={(e) => onTMidChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>More Shadow</span>
          <span>More Highlight</span>
        </div>
      </div>

      {/* Advanced Controls */}
      {showAdvanced && (
        <div className="space-y-4 pt-4 border-t border-gray-200">
          <h4 className="font-medium text-gray-800">Custom Colors</h4>
          
          <div className="grid grid-cols-3 gap-4">
            {/* Shadow Color */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-600">
                Shadow (Resistance Blue)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={colors.shadow}
                  onChange={(e) => onColorsChange({ ...colors, shadow: e.target.value })}
                  className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={colors.shadow}
                  onChange={(e) => onColorsChange({ ...colors, shadow: e.target.value })}
                  className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded"
                />
              </div>
            </div>

            {/* Mid Color */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-600">
                Mid (Brave Pink)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={colors.mid}
                  onChange={(e) => onColorsChange({ ...colors, mid: e.target.value })}
                  className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={colors.mid}
                  onChange={(e) => onColorsChange({ ...colors, mid: e.target.value })}
                  className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded"
                />
              </div>
            </div>

            {/* Highlight Color */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-600">
                Highlight (Hero Green)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={colors.highlight}
                  onChange={(e) => onColorsChange({ ...colors, highlight: e.target.value })}
                  className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={colors.highlight}
                  onChange={(e) => onColorsChange({ ...colors, highlight: e.target.value })}
                  className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3 pt-4 border-t border-gray-200">
        <button
          onClick={onReset}
          className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Reset to Default
        </button>
        
        {hasResult && (
          <button
            onClick={onDownload}
            className="w-full px-4 py-3 text-sm font-medium text-white bg-brave-pink border border-transparent rounded-lg hover:bg-brave-pink/90 transition-colors"
          >
            📥 Download Result
          </button>
        )}
      </div>
    </div>
  );
}
