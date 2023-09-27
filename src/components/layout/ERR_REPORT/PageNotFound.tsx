// NotFound.tsx
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import WarningIcon from '@mui/icons-material/Warning';

function NotFound() {
	return (
		<>
			<Card className='flex justify-center mx-auto items-center max-w-[500px]'>
				<CardContent>
					<Box className="xm-auto m-5">
						<Box className="mt-5">
							<Typography className='text-2xl'><WarningIcon className='text-red-500' /> ERR 404.</Typography>
						</Box>
						<Box className="mt-5">
							<Typography>404: ไม่พบหน้านี้ใน Path direction ดังกล่าวในเซิฟเวอร์</Typography>
						</Box>
						<Box className="mt-5">
							<Typography>โปรดตรวจสอบ URL ของท่าว่าถูกต้องหรือไม่</Typography>
						</Box>
						<Box className="mt-5">
							<Button fullWidth startIcon={<ArrowBackIosIcon />} className='bg-emerald-600 hover:bg-emerald-800' variant="contained">กลับไปหน้าหลัก</Button>
						</Box>
					</Box>
				</CardContent>
			</Card>
		</>
	)
}

export default NotFound;
