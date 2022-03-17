package fr.kdoolaeghe.savingsaccount.mapper;

import fr.kdoolaeghe.savingsaccount.dto.BalanceSheetDto;
import fr.kdoolaeghe.savingsaccount.model.BalanceSheet;

import java.util.ArrayList;
import java.util.List;

public class BalanceSheetMapper {

    public static BalanceSheetDto toBalanceSheetDto(BalanceSheet balanceSheet) {
        return BalanceSheetDto.builder()
                .entries(toBalanceEntryListDto(balanceSheet.getEntries()))
                .total(balanceSheet.getTotal())
                .build();
    }

    public static BalanceSheetDto.BalanceEntryDto toBalanceEntryDto(BalanceSheet.BalanceEntry balanceEntry) {
        return BalanceSheetDto.BalanceEntryDto.builder()
                .type(balanceEntry.getType())
                .value(balanceEntry.getValue())
                .build();
    }

    public static List<BalanceSheetDto.BalanceEntryDto> toBalanceEntryListDto(List<BalanceSheet.BalanceEntry> balanceEntryList) {
        List<BalanceSheetDto.BalanceEntryDto> balanceEntryListDto = new ArrayList<>();
        for (BalanceSheet.BalanceEntry balanceEntry : balanceEntryList) {
            balanceEntryListDto.add(toBalanceEntryDto(balanceEntry));
        }
        return balanceEntryListDto;
    }
}
