// components/LectureSettingsModal.jsx
'use client';
import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function LectureSettingsModal({ isOpen, onClose, onConfirm }) {
  const [lectureName, setLectureName] = useState('My Lecture');
  const [isPublic, setIsPublic] = useState(true);

  const handleConfirm = () => {
    onConfirm({ lectureName, isPublic });
    onClose();
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
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Public</span>
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleConfirm}>Confirm</Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
