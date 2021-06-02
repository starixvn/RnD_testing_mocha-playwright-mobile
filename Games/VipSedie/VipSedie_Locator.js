export let VipSedieLocator = {
    Title : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'game-header_title')])[2]`,
    RoundId : `//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'game-header_round')]`,
    Timer : `//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'countdown-timer')]/div/div`,
    WaitingTime : `//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'waiting-time-animation_waiting-time')]`,
    btnRebet : `//div[contains(@class,'game-list')]/div[2]//button[contains(@class,'game-header_rebet')]`,
    btnMenu : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'game-header_dropdown')])[1]`,
    btnHistory : `//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'game-header_dropdown-menu')]/button[1]`,
    btnResult : `//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'game-header_dropdown-menu')]/button[2]`,
    btnGuide : `//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'game-header_dropdown-menu')]/button[3]`,
    lblLockBet : `//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'locking-bet_mini-notice')]`,
    lblMessage : `//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'notice_notice')]`,
    msgMinBet : "Tiền cược tối thiểu là ",
    msgMaxBet : "Tiền cược tối đa ở cửa này là ",
    Even : {
        Choice : `//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-options_bet-choice-even')]`,
        Odds : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-option_odd')])[6]`,
        OwnBet : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-option_own-bet')])[6]`,
        TotalBet : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-option_total-bet')])[6]`,
        minMaxBet : [10,3000]
    },
    Odd : {
        Choice : `//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-options_bet-choice-odd')]`,
        Odds : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-option_odd')])[7]`,
        OwnBet : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-option_own-bet')])[7]`,
        TotalBet : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-option_total-bet')])[7]`,
        minMaxBet : [10,3000]
    },
    Red4 : {
        Choice : `//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-options_bet-choice-red4')]`,
        Odds : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-option_odd')])[1]`,
        OwnBet : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-option_own-bet')])[1]`,
        TotalBet : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-option_total-bet')])[1]`,
        minMaxBet : [10,500]
    },
    Red3 : {
        Choice : `//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-options_bet-choice-red3')]`,
        Odds : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-option_odd')])[4]`,
        OwnBet : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-option_own-bet')])[4]`,
        TotalBet : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-option_total-bet')])[4]`,
        minMaxBet : [10,3000]
    },
    Red2 : {
        Choice : `//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-options_bet-choice-red2')]`,
        Odds : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-option_odd')])[2]`,
        OwnBet : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-option_own-bet')])[2]`,
        TotalBet : `(//div[contains(@class,'bet-option_total-bet')])[2]`,
        minMaxBet : [10,3000]
    },
    White3 : {
        Choice : `//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-options_bet-choice-white3')]`,
        Odds : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-option_odd')])[5]`,
        OwnBet : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-option_own-bet')])[5]`,
        TotalBet : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-option_total-bet')])[5]`,
        minMaxBet : [10,3000]
    },
    White4 : {
        Choice : `//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-options_bet-choice-white4')]`,
        Odds : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-option_odd')])[3]`,
        OwnBet : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-option_own-bet')])[3]`,
        TotalBet : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'bet-option_total-bet')])[3]`,
        minMaxBet : [10,500]
    },
    LastRoundHistory : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@id,'vipsedie')])[20]`,
    StatisticEven : `(//div[contains(@class,'game-list')]/div[2]//span[contains(@class,'statistic_number')])[1]`,
    StatisticOdd : `(//div[contains(@class,'game-list')]/div[2]//span[contains(@class,'statistic_number')])[2]`,
    StatisticWhite4 : `(//div[contains(@class,'game-list')]/div[2]//span[contains(@class,'statistic_number')])[3]`,
    StatisticWhite3 : `(//div[contains(@class,'game-list')]/div[2]//span[contains(@class,'statistic_number')])[4]`,
    StatisticRed2 : `(//div[contains(@class,'game-list')]/div[2]//span[contains(@class,'statistic_number')])[5]`,
    StatisticRed3 : `(//div[contains(@class,'game-list')]/div[2]//span[contains(@class,'statistic_number')])[6]`,
    StatisticRed4 : `(//div[contains(@class,'game-list')]/div[2]//span[contains(@class,'statistic_number')])[7]`,
    StatisticScoreBoard : `(//div[contains(@class,'game-list')]/div[2]//div[contains(@class,'round-history_score-board')])[1]/div`,
    Odds : {
        Even : 1.96,
        Odd : 1.96,
        Red4 : 14.4,
        Red3 : 3.75,
        Red2 : 2.4,
        White3 : 3.75,
        White4 : 14.4
    }
}