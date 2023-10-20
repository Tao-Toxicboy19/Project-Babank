import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TreeTable from '../../layout/TreeTable/TreeTable';
import { useDispatch, useSelector } from 'react-redux';
import { loadFTS } from '../../../store/slices/FTS.slice';
import { RootState } from '../../../store/store';
import { Card } from '@mui/material';
import Loading from '../../layout/Loading/Loading';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function FTSPage() {
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch<any>();
  const FTSReducer = useSelector((state: RootState) => state.FTS);

  React.useEffect(() => {
    dispatch(loadFTS())
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault()
    setValue(newValue);
  };

  return (
    <Card className='bg-[#fff]/75'>
      {FTSReducer.loading ? (
        <Loading />
      ) : (
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="จัดการทุ่นและเครน" {...a11yProps(0)} />
              <Tab label="ทุ่น" {...a11yProps(1)} />
              <Tab label="เครน" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <TreeTable FTSReducer={(FTSReducer.FTS)} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Item Two
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Item Three
          </CustomTabPanel>
        </Box>
      )}
    </Card>
  );
}