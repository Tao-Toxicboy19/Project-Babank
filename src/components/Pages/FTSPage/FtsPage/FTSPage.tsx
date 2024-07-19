import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TreeTable from './TreeTable/TreeTable';
import { useSelector } from 'react-redux';
import { ftsAsync, ftsSelector } from '../../../../store/slices/FTS/ftsSlice';
import { Card } from '@mui/material';
import MainTainFts from '../../../layout/MainTain/MainTainFts/MainTainFts';
import Loading from '../../../layout/Loading/Loading';
import MainTainCranes from '../../../layout/MainTain/MainTainCranes/MainTainCranes';
import { useAppDispatch } from '../../../../store/store';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    </Box>
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
  const dispatch = useAppDispatch()
  const FTSReducer = useSelector(ftsSelector)

  React.useEffect(() => {
    dispatch(ftsAsync())
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault()
    setValue(newValue);
  };

  return (
    <Card className='bg-[#fff]/75 min-h-[90vh]'>
      {FTSReducer.loading ? (
        <Box>
          <Loading />
        </Box>
      ) : (
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="ข้อมูลทุนเเละเครน" {...a11yProps(0)} />
              <Tab label="ข้อมูลซ่อมบำรุงทุ่น" {...a11yProps(1)} />
              <Tab label="ข้อมูลซ่อมบำรุงเครน" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
          <TreeTable FTSReducer={(FTSReducer.result)} />

            {/* {FTSReducer.result.length === 0 ? (
              
            ) : (
              <Box>
                <TreeTable FTSReducer={(FTSReducer.result)} />
              </Box>
            )} */}

          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <MainTainFts />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <MainTainCranes />
          </CustomTabPanel>
        </Box >
      )
      }
    </Card >
  );
}