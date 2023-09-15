import { Grid } from "@mui/material";


export default function TreeNode({ node }: any) {
    return (
        <Grid container xs={2}>
            <Grid sx={{ marginX: 4 }}>{node.name}</Grid>
        </Grid>
    );
}