export let SedieLocator = {
    Title : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'game-header_title')])[2]`,
    RoundId : `//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'game-header_round')]`,
    Timer : `//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'countdown-timer')]/div/div`,
    WaitingTime : `//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'waiting-time-animation_waiting-time')]`,
    btnRebet : `//div[contains(@class,'game-list')]/div[2]//button[contains(@class,'game-header_rebet')]`,
    btnMenu : `(//div[contains(@class,'game-list')]/div[2]//button[contains(@class,'game-header_dropdown')])[1]`,
    btnHistory : `//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'game-header_dropdown-menu')]/button[1]`,
    btnGuide : `//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'game-header_dropdown-menu')]/button[2]`,
    btnClosePopup : "//div[contains(@class,'game-list')]/div[2]//span[contains(@class,'icon-close')]",
    lblLockBet : `//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'countdown-timer_no-more-bets')]`,
    lblMessage : `//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'notice_notice')]`,
    msgMinBet : "Tiền cược tối thiểu là ",
    msgMaxBet : "Tiền cược tối đa ở cửa này là ",
    msgMaxRound : "Tổng tiền cược tối đa ở phiên này là 2,000",
    Even : {
        Choice : `//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-options_bet-choice-even')]//div[contains(@class,'bet-option_bet-option')]`,
        Odds : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-option_odd')])[1]`,
        OwnBet : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-option_own-bet')])[1]`,
        // TotalBet : `(//div[contains(@class,'game-list')]/div[1]//div[contains(@class,'bet-option_total-bet')])[6]`,
        minMaxBet : [1,2000]
    },
    Odd : {
        Choice : `//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-options_bet-choice-odd')]//div[contains(@class,'bet-option_bet-option')]`,
        Odds : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-option_odd')])[2]`,
        OwnBet : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-option_own-bet')])[2]`,
        // TotalBet : `(//div[contains(@class,'game-list')]/div[1]//div[contains(@class,'bet-option_total-bet')])[7]`,
        minMaxBet : [1,2000]
    },
    Red4 : {
        Choice : `//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-options_bet-choice-red4')]//div[contains(@class,'bet-option_bet-option')]`,
        Odds : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-option_odd')])[6]`,
        OwnBet : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-option_own-bet')])[6]`,
        // TotalBet : `(//div[contains(@class,'game-list')]/div[1]//div[contains(@class,'bet-option_total-bet')])[1]`,
        minMaxBet : [1,500]
    },
    Red3 : {
        Choice : `//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-options_bet-choice-red3')]//div[contains(@class,'bet-option_bet-option')]`,
        Odds : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-option_odd')])[3]`,
        OwnBet : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-option_own-bet')])[3]`,
        // TotalBet : `(//div[contains(@class,'game-list')]/div[1]//div[contains(@class,'bet-option_total-bet')])[4]//div[contains(@class,'bet-option_bet-option')]`,
        minMaxBet : [1,2000]
    },
    Red2 : {
        Choice : `//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-options_bet-choice-red2')]//div[contains(@class,'bet-option_bet-option')]`,
        Odds : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-option_odd')])[4]`,
        OwnBet : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-option_own-bet')])[4]`,
        // TotalBet : `(//div[contains(@class,'bet-option_total-bet')])[2]`,
        minMaxBet : [1,2000]
    },
    White3 : {
        Choice : `//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-options_bet-choice-white3')]//div[contains(@class,'bet-option_bet-option')]`,
        Odds : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-option_odd')])[5]`,
        OwnBet : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-option_own-bet')])[5]`,
        // TotalBet : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-option_total-bet')])[5]`,
        minMaxBet : [1,2000]
    },
    White4 : {
        Choice : `//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-options_bet-choice-white4')]//div[contains(@class,'bet-option_bet-option')]`,
        Odds : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-option_odd')])[7]`,
        OwnBet : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-option_own-bet')])[7]`,
        // TotalBet : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-option_total-bet')])[3]`,
        minMaxBet : [1,500]
    },
    LastRoundHistory : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@id,'xocxoc')])[20]`,
    StatisticEven : `(//div[contains(@class,'game-list')]/div[2]//span[contains(@class,'statistic_number')])[1]`,
    StatisticOdd : `(//div[contains(@class,'game-list')]/div[2]//span[contains(@class,'statistic_number')])[2]`,
    StatisticScoreBoard : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'round-history_score-board')])[1]/div`,
    Odds : {
        Even : 1.96,
        Odd : 1.96,
        Red4 : 14.4,
        Red3 : 3.75,
        Red2 : 2.4,
        White3 : 3.75,
        White4 : 14.4
    },
    ToolTips : {
        lblRound : "//div[@class='tooltip-round']",
        lblResult : "//span[@class='tooltip-result']",
        lblRedDot : "//span[contains(@class,'mini-round-history_dot-odd')]/../span[2]",
        lblWhiteDot : "//span[contains(@class,'mini-round-history_dot-even')]/../span[2]"
    },
    VerifyText : {
        vi : {
            Title : "Xóc Đĩa",
            History : "Lịch sử",
            Guide : "Hướng dẫn",
            Even : "Chẵn",
            Odd : "Lẻ",
            Red4 : "4 Đỏ",
            Red3 : "3 Đỏ",
            Red2 : "2 Đỏ",
            White3 : "1 Đỏ",
            White4 : "4 Trắng",
            GuideContent : `Giới thiệuXóc Đĩa là trò chơi có nguồn gốc dân gian từ lâu đời. Trò chơi có luật và cách chơi rất đơn giản, chỉ gồm 1 bát úp, 1 đĩa và 4 đồng xu. Trong đó, 4 đồng xu được thiết kế 2 mặt đỏ và trắng. Người chơi sẽ đặt cược vào các lựa chọn (cửa) có sẵn. Kết quả thắng thua sẽ phụ thuộc vào số mặt đỏ hoặc trắng được lật của đồng xu sau khi xóc.Cách chơiNgười chơi chọn mệnh giá và nhấp vào lựa chọn bạn muốn đặt cược trước khi bát được mở. Nếu kết quả mở ra trùng với lựa chọn của bạn, người chơi sẽ thắng và ngược lại sẽ thua toàn bộ tiền cược nếu lựa chọn sai. Người chơi có thể đặt cược vào nhiều lựa chọn cùng lúc và không bị giới hạn số lần đặt cược. Tổng tiền cược tối đa cho 1 phiên là 2,000. Lưu ý, không thể hủy cược sau khi đặt.Lựa ChọnĐiều Kiện ThắngMô TảLẻ3 đỏ, 1 trắng1 đỏ, 3 trắngChẵn4 đỏ4 trắng2 đỏ, 2 trắng4 đỏ4 đỏ4 trắng4 trắng3 đỏ, 1 trắng3 đỏ, 1 trắng1 đỏ, 3 trắng1 đỏ, 3 trắng2 đỏ, 2 trắng2 đỏ, 2 trắngXu sẽ được xóc và kết quả cửa thắng sẽ được hiển thị khi hết thời gian đặt cược. Thời gian đặt cược cho mỗi phiên sẽ được hiển thị đếm ngược trên bàn chơi.Trả thưởngHệ thống sẽ tiến hành trả thưởng ngay khi phiên chơi có kết quả.Tỷ lệ trả thưởng đã bao gồm tiền cược.Lựa ChọnTrả ThưởngGiới Hạn Cược (Min - Max)Chẵn1:1.961 - 2,000Lẻ4 đỏ1:14.41 - 5004 trắng 3 đỏ, 1 trắng1:3.751 - 2,000 1 đỏ, 3 trắng 2 đỏ, 2 trắng1:2.41 - 2,000Bảng thống kê kết quả Kết QuảMô TảKý Hiệu4 đỏ44 trắng02 đỏ, 2 trắng23 đỏ, 1 trắng31 đỏ, 3 trắng1Các quy định trong gameCông ty có quyền hủy hoặc làm mất hiệu lực đối với mọi lượt cược trong trường hợp hệ thống xảy ra bất kỳ lỗi kỹ thuật nào, bao gồm nhưng không hạn chế bởi các lỗi về phần mềm, phần cứng hoặc mạng kết nối.Công ty có quyền hủy hoặc làm mất hiệu lực đối với mọi lượt cược khi nghi ngờ khách hàng có những hoạt động gian lận, tham gia lừa đảo, câu kết, rửa tiền hay các hoạt động bất hợp pháp khác.Công ty có quyền hủy hoặc làm mất hiệu lực mọi lượt cược khi có lỗi (thuộc về con người hay yếu tố khác) hoặc sự cố hệ thống dẫn đến việc sử dụng sai tỷ lệ trả thưởng.Tất cả các lượt cược vào các phiên cược đã được chấp nhận vẫn sẽ có hiệu lực ngay cả khi sau đó thành viên đăng xuất hoặc bị ngắt kết nối khỏi hệ thống game vì bất kỳ lý do gì.`
        }
    },
    History : {
        Title : "//div[contains(@class,'game-list')]/div[2]//h1",
        LastRound : "//table[@class='table text-center']/tbody/tr[1]/td[2]",
        LastResult : "//table[@class='table text-center']/tbody/tr[1]/td[3]",
        LastChoice : "//table[@class='table text-center']/tbody/tr[1]/td[4]",
        LastStake : "//table[@class='table text-center']/tbody/tr[1]/td[5]",
        LastWinLoss : "//table[@class='table text-center']/tbody/tr[1]/td[6]"
    },
    Guide : {
        Title : "//div[contains(@class,'game-list')]/div[2]//h1",
        Frame : { url : /.*guide.*/ },
        Text : "//ul[contains(@class,'game-guide')]",
    }
}