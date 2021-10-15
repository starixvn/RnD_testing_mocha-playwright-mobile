export const BigSmallLocator = {
    Title : `(//div[contains(@class,'game-list')]/div[4]//div[contains(@class,'game-header_title')])[2]`,
    RoundId : `//div[contains(@class,'game-list')]/div[4]//div[contains(@class,'game-header_round')]`,
    Timer : `//div[contains(@class,'game-list')]/div[4]//div[contains(@class,'countdown-timer')]/div/div`,
    WaitingTime : `//div[contains(@class,'game-list')]/div[4]//div[contains(@class,'waiting-time-animation_waiting-time')]`,
    btnRebet : `//div[contains(@class,'game-list')]/div[4]//button[contains(@class,'game-header_rebet')]`,
    btnMenu : `(//div[contains(@class,'game-list')]/div[4]//button[contains(@class,'menu_dropdown')])`,
    btnHistory : `(//div[contains(@class,'game-list')]/div[4]//button[contains(@class,'dropdown-item')])[1]`,
    btnGuide : `(//div[contains(@class,'game-list')]/div[4]//button[contains(@class,'dropdown-item')])[2]`,
    btnClosePopup : "//div[contains(@class,'game-list')]/div[4]//span[contains(@class,'icon-close')]",
    lblLockBet : `//div[contains(@class,'game-list')]/div[4]//div[contains(@class,'locking-bet_mini-notice')]`,
    lblBalanceBettingPool : `//div[contains(@class,'game-list')]/div[4]//div[contains(@class,'balanced-betting-pool_balanced-betting-pool')]`,
    lblMessage : `//div[contains(@class,'game-list')]/div[4]//div[contains(@class,'notice_notice')]`,
    msgMinBet : "Tiền cược tối thiểu là ",
    msgMaxBet : "Tiền cược tối đa ở cửa này là ",
    msgMaxRound : "Tổng tiền cược tối đa ở phiên này là 2000",
    LastRoundHistory : `(//div[contains(@class,'game-list')]/div[4]//div[contains(@id,'taixiu')])[20]`,
    DotRoundHistory : `//div[@id='taixiu-`,
    StatisticBig : `(//div[contains(@class,'game-list')]/div[4]//span[contains(@class,'statistic_number')])[1]`,
    StatisticSmall : `(//div[contains(@class,'game-list')]/div[4]//span[contains(@class,'statistic_number')])[2]`,
    StatisticScoreBoard : `(//div[contains(@class,'game-list')]/div[4]//div[contains(@class,'round-history_score-board')])[1]/div`,
    History : {
        Title : "//div[contains(@class,'game-list')]/div[4]//h1",
        LastRound : "//table[@class='table text-center']/tbody/tr[1]/td[2]",
        LastResult : "//table[@class='table text-center']/tbody/tr[1]/td[3]",
        LastChoice : "//table[@class='table text-center']/tbody/tr[1]/td[4]",
        LastStake : "//table[@class='table text-center']/tbody/tr[1]/td[5]/div/div[1]",
        LastRefund : "//table[@class='table text-center']/tbody/tr[1]/td[5]/div/div[2]",
        LastWinLoss : "//table[@class='table text-center']/tbody/tr[1]/td[6]"
    },
    Guide : {
        Title : "//div[contains(@class,'game-list')]/div[1]//h1",
        Frame : { url : /.*guide.*/ },
        Text : "//ul[contains(@class,'game-guide')]",
    },
    ResultDice : {
        Dice1 : "//div[contains(@class,'game-list')]/div[4]//div[contains(@class,'big-small-result_result-1')]/img",
        Dice2 : "//div[contains(@class,'game-list')]/div[4]//div[contains(@class,'big-small-result_result-2')]/img",
        Dice3 : "//div[contains(@class,'game-list')]/div[4]//div[contains(@class,'big-small-result_result-3')]/img",
        Total : "//div[contains(@class,'game-list')]/div[4]//div[contains(@class,'big-small_total-points')]"
    },
    Odds : 1.96,
    Big : {
        Choice : `//div[contains(@class,'game-list')]/div[4]//div[contains(@class,'bet-options_big')]/..`,
        Odds : `//div[contains(@class,'game-list')]/div[4]//div[contains(@class,'bet-options_big')]/../div[contains(@class,'bet-option_odd')]`,
        OwnBet : `//div[contains(@class,'game-list')]/div[4]//div[contains(@class,'bet-options_big')]/../div[contains(@class,'bet-option_own-bet')]`,
        minMaxBet : [1,2000]
    },
    Small : {
        Choice : `//div[contains(@class,'game-list')]/div[4]//div[contains(@class,'bet-options_small')]/..`,
        Odds : `//div[contains(@class,'game-list')]/div[4]//div[contains(@class,'bet-options_small')]/../div[contains(@class,'bet-option_odd')]`,
        OwnBet : `//div[contains(@class,'game-list')]/div[4]//div[contains(@class,'bet-options_small')]/../div[contains(@class,'bet-option_own-bet')]`,
        minMaxBet : [1,2000]
    },
    ToolTips : {
        lblRound : "//div[@class='tooltip-round']",
        lblTitle : "//div[@class='tooltip-title']"
    },
    VerifyText : {
        vi : {
            Title : "Tài Xỉu",
            History : "Lịch sử",
            Guide : "Hướng dẫn",
            Big : "Tài",
            Small : "Xỉu",
            BalanceBettingPool : "Nhà cái cân cửa.",
            OneChoiceInARound : "Chỉ được cược 1 bên.",
            GuideContent : `Giới thiệuTài Xỉu là trò chơi đổ xúc xắc đơn giản, trò chơi sử dụng 3 viên xúc xắc (xí ngầu) 6 mặt và người chơi sẽ dự đoán xem kết quả là Tài hay Xỉu.Cách chơiNgười chơi dự đoán tổng điểm xúc xắc bằng cách chọn cửa Tài hoặc Xỉu cùng với mức cược mong muốn.Tài: tổng điểm 3 viên xúc xắc >= 11Xỉu: tổng điểm 3 viên xúc xắc <= 10Trong một phiên cược, người chơi chỉ được chọn 1 cửa duy nhất Tài hoặc Xỉu.Người chơi có thể tăng lượng tiền đặt cược bằng cách đặt thêm vào cùng 1 lựa chọn trước khi thời gian đặt cược kết thúc.Số tiền cược phải nằm trong khoảng từ 1 đến 2,000 cho một lần đặt cược và tổng tiền cược tối đa cho 1 phiên là 2,000Thời gian đặt cược cho mỗi phiên sẽ được hiển thị đếm ngược trên bàn chơi. Khi hết thời gian đặt cược, xúc xắc sẽ bắt đầu lắc và tổng điểm xúc xắc sẽ được hiển thị.Nhà cái cân cửa: trong trường hợp tiền đặt cược giữa 2 cửa chênh lệch nhau, số tiền chênh lệch sẽ được hoàn trả vào tài khoản người chơi đặt cược sau.Ví dụ: Người chơi A đặt 100 vào cửa Tài, người chơi B đặt 40 vào cửa Xỉu, người chơi C đặt 80 vào cửa Xỉu. Hệ thống sẽ tính toán cân bằng lượng tiền giữa 2 cửa và sẽ trả lại cho C (người chơi đặt cược sau) 20Trả thưởngHệ thống sẽ tiến hành trả thưởng ngay khi phiên chơi có kết quả.Tỷ lệ trả thưởng khi đặt vào Tài, Xỉu là 1 ăn 1.96Tỷ lệ trả thưởng đã bao gồm tiền cược.Các quy định trong gameCông ty có quyền hủy hoặc làm mất hiệu lực đối với mọi lượt cược trong trường hợp hệ thống xảy ra bất kỳ lỗi kỹ thuật nào, bao gồm nhưng không hạn chế bởi các lỗi về phần mềm, phần cứng hoặc mạng kết nối.Công ty có quyền hủy hoặc làm mất hiệu lực đối với mọi lượt cược khi nghi ngờ khách hàng có những hoạt động gian lận, tham gia lừa đảo, câu kết, rửa tiền hay các hoạt động bất hợp pháp khác.Công ty có quyền hủy hoặc làm mất hiệu lực mọi lượt cược khi có lỗi (thuộc về con người hay yếu tố khác) hoặc sự cố hệ thống dẫn đến việc sử dụng sai tỷ lệ trả thưởng.Tất cả các lượt cược vào các phiên cược đã được chấp nhận vẫn sẽ có hiệu lực ngay cả khi sau đó thành viên đăng xuất hoặc bị ngắt kết nối khỏi hệ thống game vì bất kỳ lý do gì.`
        }
    }
}