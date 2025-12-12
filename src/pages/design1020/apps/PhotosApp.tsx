import React from 'react';
import { type Photo } from '../types';

interface PhotosAppProps {
  photos: Photo[];
}

export const PhotosApp: React.FC<PhotosAppProps> = ({ photos }) => {
  return (
    <div className="h-full bg-black text-green-500 font-mono p-4 overflow-y-auto">
        <h2 className="text-center border-b border-green-500 pb-2 mb-4">/var/www/hidden_images</h2>
        <div className="grid grid-cols-2 gap-4">
            {photos.map(photo => (
                <div key={photo.id} className="group relative">
                    <img src={photo.url} alt={photo.caption} className="border-2 border-green-900 group-hover:border-green-400 transition-colors w-full h-32 object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-xs p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                        {photo.caption}
                    </div>
                </div>
            ))}
        </div>
        <div className="mt-4 text-center text-xs animate-pulse">
            {'>'} END OF STREAM_
        </div>
    </div>
  );
};
