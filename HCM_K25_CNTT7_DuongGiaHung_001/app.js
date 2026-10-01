let currentBookingCode = '';
let isBookingValid = false;
let totalRevenue = 0;
let totalBookings = 0;

let isRunning = true;
while(isRunning){
    console.log("=================================================");
    console.log("=======HỆ THỐNG BÁN VÉ RẠP MOONLIGHT CINEMA======");
    console.log("=================================================");
    console.log("1. Nhập và kiểm chuẩn mã đặt vé");
    console.log("2. Tính tiền vé xem phim");
    console.log("3. Thẩm định số seri may mắn");
    console.log("0. Thoát chương trình");
    console.log("=================================================");

    let choiceinput = prompt("Nhập lựa chọn của bạn (0-3):");
    if (choiceinput === null){
        console.log("Lỗi:Không được bỏ trống. Vui lòng chọn từ (0-3)");
        continue; 
    }
    
    let choice = choiceinput.trim().toUpperCase();
    switch(choice){
        case "1":
            currentBookingCode = '';
            isBookingValid = false;

            let inputchoice = prompt("Nhập mã vé:");
            
            if (inputchoice === null || inputchoice.trim() === ""){
                console.log("Chưa nhập mã đặt vé");
                break;
            }
            inputchoice = inputchoice.trim().toUpperCase();
            if (inputchoice.length < 6 ){
                console.log("Chưa nhập đủ kí tự (tối thiểu 6)");
                break;
            }
            if (!inputchoice.startsWith("CIN-")){ 
                console.log("Sai kí tự mẫu (CIN-)");
                break;
            }
            if(inputchoice.includes(" ")){
                console.log("Lỗi có khoảng trắng ở giữa các kí tự");
                break;
            }
            currentBookingCode = inputchoice; 
            isBookingValid = true;
            console.log("Nhập mã đặt vé thành công");
            console.log("Mã vé: " + currentBookingCode);
            break;

        case "2":
            if(!isBookingValid){
                console.log("Vui lòng chọn 1 để nhập mã đặt vé hợp lệ trước");
                break;
            }
            let ticketCount = 0;
            while (true) {
                let inputCount = prompt("Nhập số lượng vé:");
                if (inputCount === null) {
                    ticketCount = null; 
                    break;
                }
                ticketCount = Number(inputCount);
                if (inputCount.trim() === "" || isNaN(ticketCount) || ticketCount <= 0 || !Number.isInteger(ticketCount)) {
                    console.log("Lỗi:Phải nhập số nguyên lớn hơn 0.");
                } else {
                    break;
                }
            }
            if (ticketCount === null) {
                console.log("Bạn đã hủy tính tiền");
                break;
            }
            let pricePerTicket = 0;
            while (true) {
                let inputPrice = prompt("Nhập giá mỗi vé:");
                if (inputPrice === null) {
                    pricePerTicket = null;
                    break;
                }
                pricePerTicket = Number(inputPrice);
                if (inputPrice.trim() === "" || isNaN(pricePerTicket) || pricePerTicket <= 0 || !Number.isInteger(pricePerTicket)) {
                    console.log("Lỗi: Phải nhập số nguyên lớn hơn 0");
                } else {
                    break;
                }
            }
            if (pricePerTicket === null) {
                console.log("Bạn đã hủy tính tiền");
                break;
            }
            let baseCost = ticketCount * pricePerTicket;
            let discount = 0;
            if (ticketCount >= 4) {
                discount = Math.round(baseCost * 0.1); 
            }
            let fee = Math.round((baseCost - discount) * 0.08); 
            let total = (baseCost - discount) + fee; 

            console.log("======HÓA ĐƠN=======");
            console.log("Mã đặt vé: " + currentBookingCode);
            console.log("Số vé: " + ticketCount);
            console.log("Chi phí cơ sở: " + baseCost);
            console.log("Tiền giảm giá: " + discount);
            console.log("Phí dịch vụ đặt vé: " + fee);
            console.log("Tổng thanh toán: " + total);

            totalRevenue = totalRevenue + total;
            totalBookings = totalBookings + 1;
            currentBookingCode = '';
            isBookingValid = false;
            break;
        case "3":
            let seri = prompt("Nhập số seri may mắn:");
            if (seri === null) break;
            
            seri = seri.trim();
            if (seri.length < 2 || isNaN(seri) || seri === "" || Number(seri) === 0) {
                console.log("Số seri không hợp lệ");
                break;
            }
            let reversedSeri = "";
            for(let i = seri.length - 1; i >= 0; i--){
                reversedSeri += seri[i];
            }
            let sum = 0;
            for(let i = 0; i < seri.length; i++){
                sum += Number(seri[i]);
            }
            let isPalindrome = (seri === reversedSeri);
            let isDivisible = (sum % 9 === 0);

            console.log("Mã gốc: " + seri);
            console.log("Đảo ngược: " + reversedSeri);
            console.log("Tổng: " + sum);

            if (isPalindrome && isDivisible) console.log("Giải Đặc biệt");
            else if (isPalindrome && !isDivisible) console.log("Giải Nhất");
            else if (!isPalindrome && isDivisible) console.log("Giải Nhì");
            else console.log("Không trúng thưởng");
            break;

        case "0":
            console.log("Thoát chương trình");
            console.log("Tổng số đơn: " + totalBookings);
            console.log("Doanh thu ca: " + totalRevenue);
            isRunning = false; 
            break;
            
        default:
            console.log("Lựa chọn không hợp lệ. Vui lòng nhập từ (0-3).");
            break;
    }
}