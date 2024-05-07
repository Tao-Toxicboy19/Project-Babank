export const titles = [
    'ชื่อทุ่น',
    'พิกัดเรือ',
    'ละติจูด',
    'ลองจิจูด',
    'วัน-เวลา มาถึง',
    'วัน-เวลา สิ้นสุด',
    'เวลาเตรียมความพร้อม',
    'ระยะทางเคลื่อนย้าย',
]

export const labels = [
    'รายรับจากรางวัล',
    'เวลารวมเสร็จหลังกำหนด',
    'เวลารวมเสร็จก่อนกำหนด',
    'ค่าเชื้อเพลิงรวมขนถ่าย',
    'ค่าเชื้อเพลิงรวมเคลื่อยย้าย',
    'รวมระยะทางเคลื่อนย้าย',
    'เวลารวมดำเนินการขนถ่าย',
    'เวลารวมเตรียมความพร้อม'
]

export const TitleOrder = [
    'ชื่อเรือ',
    'สถานะ',
    'ประเภทสินค้า',
    'ปริมาณสินค้า (ตัน)',
    'สถานะสินค้า',
    'วัน-เวลา มาถึง',
    'วัน-เวลา สิ้นสุด',
    'ละติจูด',
    'ลองจิจูด',
    'จำนวนระวาง',
    'จำนวนทุ่นเข้าสูงสุด',
    'ค่าปรับ (บาท/ชม)',
    'รางวัล (บาท/ชม)',
    'เวลาเริ่มจริง',
    'เวลาเสร็จจริง',
    'หมายเหตุ',
    'แก้ไข้'
]

export const monthNames = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']

export const TitleCargoCrane = [
    'ชื่อทุ่น',
    'ลำดับเครนที่',
    'ชื่อสินค้า',
    'สถานะสินค้า (ขาเข้า/ขาออก)',
    'อัตราการใช้น้ำมัน (ลิตร/ตัน)',
    'อัตราการขนถ่ายสินค้า (ตัน/ชม.)',
    'แก้ไข'
]

export const titleTreeTable = [
    'ชื่อเครน',
    'รายจ่าย',
    'ค่าเชื้อเพลิง',
    'ค่าเเรง',
    'ค่าปรับล่าช้า',
    'รางวัลรวม',
]

export const TitleCarrier = ["ชื่อเรือ", "ชื่อบริษัท", "ความจุสูงสุด (ตัน)", "จำนวนระวาง", "จำนวนทุ่นเข้าได้สูงสุด", "จำนวนเครนเข้าได้สูงสุด", "กว้าง", "ยาว", "เครน", "แก้ไข"]

export const TitleReportFTS = ["ชื่อทุ่น", "ชื่อเรือ", "วัน-เวลา มาถึง", "วัน-เวลา สิ้นสุด", "ปริมาณสินค้า (ตัน)"]
export const TitleReportCrane = ["ชื่อทุ่น", "ชื่อเรือ", "ระวาง", "วัน-เวลา มาถึง", "วัน-เวลา สิ้นสุด", "ปริมาณสินค้า (ตัน)", "ประเภทสินค้า"]

export const NETWORK_CONNECTION_MESSAGE =
    "Cannot connect to server, Please try again."

export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK"

// https://sched.floatingcraneservice.com/backend/api/cargo
// export const apiUrlV2 = import.meta.env.VITE_API_URL`
export const apiUrlV2 = "https://sched.floatingcraneservice.com/backend/api"
// export const apiUrlV2 = "http://crane.otpzlab.com:7070/api"
//  export const apiUrlV2 = "http://172.17.0.1:7070/api"
// import.meta.env.VITE_GOOGLE_MAPS_API_KEY
// file import 1 เส้น

// export const apiManagePlans = import.meta.env.VITE_API_PLAN
export const apiManagePlans = "https://sched.floatingcraneservice.com/route"
// export const apiManagePlans = "http://154.49.243.54:5012/"

export const SUCCESS = 'Successfully' 
export const Failure = 'ทุ่นซ้ำกัน'

export const TOKEN = 'token'

export const SAVE = 'เพิ่มข้อมูล'
export const EDIT = 'ยืนยัน'
export const CLOSE = 'กลับ'

export const server = {
    LOGIN_URL: `/backend/signin`,
    REGISTER_URL: `/backend/signup`,
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
    CARGOORDER_URL: `cargoorder`,
    REPORT_SOLUTION_URL: `report_solution`,
    REPORT_SOLUTION_CRANE_URL: `report_solution_crane`,
    MAINTAIN_CRAN_URL: `maintain_crane`,
    MAINTAIN_FTS_URL: `maintain_fts`,
    CRANESOLUTIONTABLEV2_URL: `cranesolutiontableV2`,
    UPDATESTATUS: `updatestatus`,
    SOLUTION_CARRIER_ORDER_URL: `solution_carrier_order`,
    SOLUTION_CARRIER_ORDER_SUM: `solution_carrier_order_sum`,
    ROLES_URL: `roles`,
    USERALL_URL: `userall`,
    USER_URL: `user`,
    EXPORTORDER: `exportorder`,
    IMPORTORDER: `importcsv`,
    crane_solutionV2: "crane_solutionV2"
}

// SELECT
//     solution_schedule.*,
//     fts.FTS_name,
//     carrier.*,
//     solution_crane_schedule.start_time,
//     solution_crane_schedule.due_time
// FROM
//     solution_schedule
// LEFT JOIN fts ON solution_schedule.FTS_id = fts.id
// LEFT JOIN carrier ON solution_schedule.carrier_id = carrier.cr_id
// LEFT JOIN solution_crane_schedule ON solution_schedule.solution_id = solution_crane_schedule.solution_id
// WHERE
//     solution_schedule.solution_id = 71;
