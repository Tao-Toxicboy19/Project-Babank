export const titles = [
    'FTS_name',
    'location_name',
    'Latitude',
    'Longtitude',
    'Arrival Date Time',
    'Exit Date Time',
    'operation_time',
    'travel_here_Distance',
]

export const labels = [
    'รายรับจากรางวัล',
    'เวลารวมเสร็จหลังกำหนด',
    'เวลารวมเสร็จก่อนกำหนด',
    'ค่าเชื้อเพลิงรวมขนถ่าย',
    'ค่าเชื้อเพลิงรวมเคลื่อยย้าย',
    'ระยะรวมทางเคลื่อนย้าย',
    'เวลารวมดำเนินการขนถ่าย',
    'เวลารวมเตรียมความพร้อม'
];

export const TitleOrder = [
    'ชื่อเรือ',
    'ประเภทสินค้า',
    'ปริมาณสินค้า (ตัน)',
    'สถานะสินค้า (ขาเข้า/ขาออก)',
    'วัน-เวลา มาถึง',
    'วัน-เวลา สิ้นสุด',
    'ละติจูด',
    'ลองจิจูด',
    'จำนวนระวาง',
    'จำนวนทุ่นเข้าสูงสุด',
    'ค่าปรับ (บาท)',
    'รางวัล (บาท)',
    'แก้ไข้'
]

export const TitleCargoCrane = [
    'ชื่อทุ่น',
    'ลำดับเครนที่',
    'ชื่อสินค้า',
    'สถานะสินค้า (ขาเข้า/ขาออก)',
    'อัตราการขนถ่ายสินค้า (ตัน/ชม.)',
    'อัตราการใช้น้ำมัน (ลิตร/ตัน)',
    'แก้ไข'
]

export const NETWORK_CONNECTION_MESSAGE =
    "Cannot connect to server, Please try again.";

export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK";

// export const apiUrl = "http://localhost:5018/api";
export const apiUrlV2 = "http://crane.otpzlab.com:7070/api";

export const server = {
    LOGIN_URL: `login`,
    REGISTER_URL: `register`,
    FLOATING: `floating`,
    CARRIER: `carrier`,
    CARGO: `cargo`,
    CARGOCRANE: `cargocrane`,
    ORDER: `order`,
    CRANESOLUTIONTABLE: `cranesolutiontable`,
    FTSSOLUTION: `ftssolution`,
    CRANESOLUTION: `cranesolution`,
    CRANE: `crane`,
    SOLUTIONSCHEDULE: `solution_schedule`,
    CARGOORDER_URL: `cargoorder`
};

export const YES = "YES";
export const NO = "NO";
export const OK = "ok";
export const NOK = "nok";
export const TOKEN = "TOKEN";