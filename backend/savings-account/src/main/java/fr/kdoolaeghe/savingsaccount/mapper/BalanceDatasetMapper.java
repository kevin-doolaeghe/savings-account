package fr.kdoolaeghe.savingsaccount.mapper;

import fr.kdoolaeghe.savingsaccount.dto.BalanceSheetDto;
import fr.kdoolaeghe.savingsaccount.model.BalanceSheet;

public class BalanceSheetMapper {

    public static BalanceSheetDto toBalanceSheetDto(BalanceSheet balanceSheet) {
        return BalanceSheetDto.builder()
                .entries(balanceSheet.getEntries())
                .total(balanceSheet.getTotal())
                .build();
    }

}
