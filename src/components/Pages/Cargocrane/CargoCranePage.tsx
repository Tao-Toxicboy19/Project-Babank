import axios from 'axios';
import { useEffect, useState } from 'react'
import TreeTable from './TreeTable/TreeTable';

type Props = {}

export default function CargoCranePage({ }: Props) {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   axios.get('http://localhost:5018/api/cargocrane')
  //     .then(data => setData(data.data.result1))
  //     .catch(error => console.error(error));
  // }, []);

  return (
    <div className="App">
      <h1>Tree Table</h1>
      <TreeTable data={data} />
    </div>
  );
}