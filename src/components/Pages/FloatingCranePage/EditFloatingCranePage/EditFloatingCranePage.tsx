import axios from 'axios';

type Props = {
  id: number; // Assuming you pass the ID of the item to be deleted as a prop
};

export default function EditFloatingCranePage({ id }: Props) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/deleteLocation/${id}`);
      console.log('Item deleted successfully');
      // You can also navigate or perform other actions after deletion if needed
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete Item</button>
    </div>
  );
}
