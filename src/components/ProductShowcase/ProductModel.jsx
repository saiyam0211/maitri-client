// src/components/ProductShowcase/ProductModel.jsx
import React, { useEffect, useRef } from 'react';
import { ThreeViewer } from './ThreeViewer';

const ProductModel = ({ modelPath, isCentered }) => {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && !viewerRef.current) {
      // Initialize the viewer
      viewerRef.current = new ThreeViewer(
        containerRef.current,
        modelPath,
        isCentered
      );
    }

    // Cleanup function
    return () => {
      if (viewerRef.current) {
        viewerRef.current.dispose();
        viewerRef.current = null;
      }
    };
  }, [modelPath, isCentered]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full backdrop-blur-sm rounded-2xl overflow-hidden relative"
    />
  );
};

export default ProductModel;