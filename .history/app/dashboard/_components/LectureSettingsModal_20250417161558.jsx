'use client';
import { Dialog } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function LectureSettingsModal({ isOpen, onClose, onConfirm, loading }) {
  const [lectureName, setLectureName] = useState('My Lecture');
  const [isPublic, setIsPublic] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!loading) {
      setIsReady(true);
    }
  }, [loading]);

  const handleConfirm = () => {
    if (isReady) {
      onConfirm({ lectureName, isPublic });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white p-6 rounded-lg max-w-sm w-full shadow-lg space-y-4">
          <Dialog.Title className="text-lg font-bold">Lecture Settings</Dialog.Title>

          <div>
            <label className="block text-sm font-medium mb-1">Lecture Name</label>
            <input
              type="text"
              value={lectureName}
              onChange={(e) => setLectureName(e.target.value)}
              className="w-full border rounded px-3 py-2"
              disabled={!isReady}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Public</span>
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600"
              disabled={!isReady}
            />
          </div>

          {!isReady && (
            <div className="w-full space-y-1">
                <p className="text-sm text-gray-500">Generating summary...</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div className="bg-blue-500 h-2.5 animate-pulse w-3/4 rounded-full" />
                </div>
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button onClick={handleConfirm} disabled={!isReady}>
              Confirm
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
