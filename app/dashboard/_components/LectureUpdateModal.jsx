'use client';

import { Dialog } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function LectureUpdateModal({
  isOpen,
  onClose,
  onConfirm,
  initialLecture,
}) {
  const [lectureName, setLectureName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    if (initialLecture) {
      setLectureName(initialLecture.summaryTitle || '');
      setDescription(initialLecture.summaryDescription || '');
      setIsPublic(Boolean(initialLecture.isPublic));
    }
  }, [initialLecture]);

  const handleConfirm = async () => {
    const updatedLecture = {
      summaryId: initialLecture.id,
      summaryTitle: lectureName,
      summaryDescription: description,
      isPublic,
    };
  
    try {
      const response = await fetch('/api/updatelecture', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedLecture),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to update the lecture');
        return;
      }
  
      // 🚀 Force a page reload to get the latest data
      window.location.reload();
    } catch (error) {
      console.error('Error updating lecture:', error);
      alert('An error occurred while updating the lecture.');
    }
  };
  

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white p-6 rounded-lg max-w-sm w-full shadow-lg space-y-4">
          <Dialog.Title className="text-lg font-bold">
            Edit Lecture Settings
          </Dialog.Title>

          <div>
            <label className="block text-sm font-medium mb-1">
              Lecture Name
            </label>
            <input
              type="text"
              value={lectureName}
              onChange={(e) => setLectureName(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Lecture Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded px-3 py-2"
              rows={3}
              placeholder="Optional description of the lecture..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Visibility</label>
            <div className="flex gap-2">
              {['Public', 'Private'].map((label) => {
                const value = label === 'Public';
                const active = isPublic === value;
                return (
                  <button
                    key={label}
                    type="button"
                    className={`px-4 py-2 rounded-lg border text-sm font-medium ${
                      active
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => setIsPublic(value)}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="button" onClick={handleConfirm}>
              Confirm
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
