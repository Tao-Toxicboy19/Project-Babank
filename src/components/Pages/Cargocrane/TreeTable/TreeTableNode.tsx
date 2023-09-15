import React, { useState } from 'react'
import TreeNode from './TreeNode';
import { Grid } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Props = {}

export default function TreeTableNode({ node }: any) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNode = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Grid container spacing={1} columns={17}>
                <Grid item xs={2}>
                    <button onClick={toggleNode}>
                        {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </button>
                    {node.name}
                </Grid>
                <Grid item xs={2}>
                    {node.cargo_name}
                </Grid>
                <Grid item xs={3}>
                    {node.consumption_rate}
                </Grid>
                <Grid item xs={4}>
                    {node.work_rate}
                </Grid>
                <Grid item xs={4}>
                    {node.category}
                </Grid>
                <Grid item xs={2}>
                    {node.category}
                </Grid>
            </Grid>
            {/* <tr>
                <td>
                    <button onClick={toggleNode}>
                        {isOpen ? 'ปิด' : 'เปิด'}
                    </button>
                    {node.name}
                </td>
                <td>{node.cargo_name}</td>
                <td>{node.consumption_rate}</td>
                <td>{node.work_rate}</td>
                <td>{node.category}</td>
            </tr> */}
            {isOpen &&
                node.result2.map((subNode: any, index: any) => (
                    <TreeNode key={index} node={subNode} />
                ))}
        </>
    );
}