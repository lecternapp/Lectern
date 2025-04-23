import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function LectureSettingsModal({ isOpen, onClose, onConfirm }) {
  const [lectureName, setLectureName] = useState('My Lecture');
  const [isPublic, setIsPublic] = useState(true);
  const [description, setDescription] = useState('');

  const handleConfirm = () => {
    onConfirm({ lectureName, isPublic, description });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white p-6 rounded-lg max-w-sm w-full shadow-lg space-y-4">
          <Dialog.Title className="text-lg font-bold">Lecture Settings</Dialog.Title>

          {/* Lecture Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Lecture Name</label>
            <input
              type="text"
              value={lectureName}
              onChange={(e) => setLectureName(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Lecture Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Lecture Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded px-3 py-2"
              rows={3}
              placeholder="Optional description of the lecture..."
            />
          </div>

          {/* Public/Private Toggle */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Visibility</label>
            <div className="flex gap-2">
              <button
                type="button"
                className={`px-4 py-2 rounded-lg border text-sm font-medium ${
                  isPublic ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
                }`}
                onClick={() => setIsPublic(true)}
              >
                Public
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-lg border text-sm font-medium ${
                  !isPublic ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
                }`}
                onClick={() => setIsPublic(false)}
              >
                Private
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleConfirm}>Confirm</Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
