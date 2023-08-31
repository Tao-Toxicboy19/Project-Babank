import { useParams } from "react-router-dom";

type Props = {};

export default function EditCarrierPage({}: Props) {
  const { id } = useParams<{ id: any }>();
  return <div>EditCarrierPage{id}</div>;
}
