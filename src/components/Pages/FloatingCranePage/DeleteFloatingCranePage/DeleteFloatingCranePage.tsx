import React from 'react';

type Props = {
  id: number;
  onDelete: (id: number) => void;
};

export default function DeleteFloatingCranePage({ id, onDelete }: Props) {
  const handleDelete = () => {
    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (confirmed) {
      onDelete(id);
    }
  };
  

  return (
    <div>
      <button onClick={handleDelete} className="text-red-600">
        Delete
      </button>
    </div>
  );
}
