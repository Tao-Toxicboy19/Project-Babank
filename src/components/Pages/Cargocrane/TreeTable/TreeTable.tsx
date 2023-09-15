import React from 'react'
import TreeTableNode from './TreeTableNode';
import { Card, CardContent, Grid, Paper, Stack, Typography, styled } from '@mui/material';

type Props = {}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function TreeTable({ data }: any) {
    return (
        <Card>
            <CardContent>
                <Grid container spacing={1} columns={17}>
                    <Grid item xs={2}>
                        <Item>ชื่อทุ่น</Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item>ชื่อสินค้า</Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item>อัตราการใช้น้ำมัน (ลิตร/ตัน)</Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>อัตราการขนถ่ายสินค้า (ตัน/ชม.)</Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>สถานะสินค้า (ขาเข้า/ขาออก)</Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item>แก้ไข</Item>
                    </Grid>
                </Grid>
                {data.map((node: any, index: any) => (
                    <TreeTableNode key={index} node={node} />
                ))}
                {/* <table>
                    <thead>
                        <tr>
                            <th>ชื่อ</th>
                            <th>ชื่อสินค้า</th>
                            <th>อัตราการบริโภค</th>
                            <th>อัตราการทำงาน</th>
                            <th>หมวดหมู่</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table> */}
            </CardContent>
        </Card>
    );
}