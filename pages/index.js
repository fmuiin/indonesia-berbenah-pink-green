import { useState, useRef, useCallback } from 'react';
import Head from 'next/head';
import UploadDropzone from '../components/UploadDropzone';
import ImagePreview from '../components/ImagePreview';
import Controls from '../components/Controls';
import { processImageWithTritone, DEFAULT_COLORS } from '../utils/tritone';

export default function Home() {
  const [originalSrc, setOriginalSrc] = useState(null);
  const [processedSrc, setProcessedSrc] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [colors, setColors] = useState(DEFAULT_COLORS);
  const [tMid, setTMid] = useState(1.0);
  
  const canvasRef = useRef(null);

  const handleFileSelect = useCallback(async (file) => {
    if (!file) return;

    setIsProcessing(true);
    setOriginalSrc(null);
    setProcessedSrc(null);

    try {
      // Create object URL for preview
      const objectUrl = URL.createObjectURL(file);
      setOriginalSrc(objectUrl);

      // Process image
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = objectUrl;

      img.onload = () => {
        try {
          const resultDataUrl = processImageWithTritone(img, colors, tMid);
          setProcessedSrc(resultDataUrl);
        } catch (error) {
          console.error('Error processing image:', error);
          alert('Error processing image. Please try again.');
        } finally {
          setIsProcessing(false);
        }
      };

      img.onerror = () => {
        console.error('Error loading image');
        alert('Error loading image. Please try a different file.');
        setIsProcessing(false);
      };
    } catch (error) {
      console.error('Error handling file:', error);
      alert('Error handling file. Please try again.');
      setIsProcessing(false);
    }
  }, [colors, tMid]);

  const handleColorsChange = useCallback((newColors) => {
    setColors(newColors);
    if (originalSrc) {
      // Reprocess with new colors
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = originalSrc;
      
      img.onload = () => {
        try {
          const resultDataUrl = processImageWithTritone(img, newColors, tMid);
          setProcessedSrc(resultDataUrl);
        } catch (error) {
          console.error('Error reprocessing image:', error);
        }
      };
    }
  }, [originalSrc, tMid]);

  const handleTMidChange = useCallback((newTMid) => {
    setTMid(newTMid);
    if (originalSrc) {
      // Reprocess with new mid-tone position
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = originalSrc;
      
      img.onload = () => {
        try {
          const resultDataUrl = processImageWithTritone(img, colors, newTMid);
          setProcessedSrc(resultDataUrl);
        } catch (error) {
          console.error('Error reprocessing image:', error);
        }
      };
    }
  }, [originalSrc, colors]);

  const handleReset = useCallback(() => {
    setColors(DEFAULT_COLORS);
    setTMid(1.0);
    if (originalSrc) {
      // Reprocess with default settings
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = originalSrc;
      
      img.onload = () => {
        try {
          const resultDataUrl = processImageWithTritone(img, DEFAULT_COLORS, 1.0);
          setProcessedSrc(resultDataUrl);
        } catch (error) {
          console.error('Error reprocessing image:', error);
        }
      };
    }
  }, [originalSrc]);

  const handleDownload = useCallback(() => {
    if (processedSrc) {
      // Convert data URL to blob for better mobile compatibility
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            // Create blob URL
            const blobUrl = URL.createObjectURL(blob);
            
            // Method 1: Try direct download with blob
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = 'brave-pink-hero-green-filter.png';
            link.style.display = 'none';
            
            // Add to DOM, click, then remove
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Clean up blob URL after a delay
            setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
            
            // Show success message only on mobile devices
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                            window.innerWidth <= 768 || 
                            ('ontouchstart' in window);
            
            if (isMobile) {
              setTimeout(() => {
                alert('Download berhasil! Jika tidak muncul, coba long press pada gambar hasil dan pilih "Save to Photos"');
              }, 500);
            }
          } else {
            // Fallback: Show instructions
            alert('Download tidak tersedia. Silakan:\n\n1. Long press pada gambar hasil\n2. Pilih "Save to Photos" atau "Download"');
          }
        }, 'image/png', 0.9);
      };
      
      img.src = processedSrc;
    }
  }, [processedSrc]);

  return (
    <>
      <Head>
        <title>Brave Pink & Hero Green Filter</title>
        <meta name="description" content="Transform your photos with meaningful colors - Brave Pink, Hero Green, and Resistance Blue" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Brave Pink & Hero Green Filter
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Transform your photos with meaningful colors that represent courage, hope, and resistance. 
              Pink symbolizes the bravery of standing up for what you believe in, while green represents 
              the strength that grows from loss and the hope for a better future.
            </p>
          </div>

          {/* Upload Section */}
          <div className="mb-8">
            <UploadDropzone 
              onFileSelect={handleFileSelect}
              isProcessing={isProcessing}
            />
          </div>

          {/* Image Preview */}
          {(originalSrc || processedSrc) && (
            <div className="mb-8">
              <ImagePreview 
                originalSrc={originalSrc}
                processedSrc={processedSrc}
                isProcessing={isProcessing}
              />
            </div>
          )}

          {/* Controls */}
          <div className="max-w-4xl mx-auto">
            <Controls
              colors={colors}
              onColorsChange={handleColorsChange}
              tMid={tMid}
              onTMidChange={handleTMidChange}
              onReset={handleReset}
              onDownload={handleDownload}
              hasResult={!!processedSrc}
            />
          </div>

          {/* Mobile Instructions */}
          <div className="mt-8 max-w-4xl mx-auto">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-yellow-800 mb-2">📱 Cara Download di HP:</h4>
              <div className="text-sm text-yellow-700 space-y-1">
                <p>1. Klik tombol "Download Result" di atas</p>
                <p>2. Jika tidak berhasil, <strong>long press</strong> pada gambar hasil</p>
                <p>3. Pilih "Save to Photos" atau "Download"</p>
                <p>4. Atau screenshot halaman ini</p>
              </div>
            </div>
          </div>

          {/* Color Legend */}
          <div className="mt-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Color Meanings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div 
                    className="w-16 h-16 rounded-full mx-auto mb-3 shadow-lg"
                    style={{ backgroundColor: '#E44C99' }}
                  ></div>
                  <h4 className="font-semibold text-gray-800 mb-2">Brave Pink</h4>
                  <p className="text-sm text-gray-600">
                    Symbolizes courage and the right of all people to speak up for what they believe in
                  </p>
                </div>
                <div className="text-center">
                  <div 
                    className="w-16 h-16 rounded-full mx-auto mb-3 shadow-lg"
                    style={{ backgroundColor: '#01A923' }}
                  ></div>
                  <h4 className="font-semibold text-gray-800 mb-2">Hero Green</h4>
                  <p className="text-sm text-gray-600">
                    Represents hope and strength that grows from loss, inspired by resilience
                  </p>
                </div>
                <div className="text-center">
                  <div 
                    className="w-16 h-16 rounded-full mx-auto mb-3 shadow-lg"
                    style={{ backgroundColor: '#0D1E91' }}
                  ></div>
                  <h4 className="font-semibold text-gray-800 mb-2">Resistance Blue</h4>
                  <p className="text-sm text-gray-600">
                    Stands for the collective strength and determination in the face of challenges
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
