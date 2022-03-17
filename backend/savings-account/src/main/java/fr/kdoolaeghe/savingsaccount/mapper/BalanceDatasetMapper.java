package fr.kdoolaeghe.savingsaccount.mapper;

import fr.kdoolaeghe.savingsaccount.dto.BalanceDatasetDto;
import fr.kdoolaeghe.savingsaccount.model.BalanceDataset;

import java.util.ArrayList;
import java.util.List;

public class BalanceDatasetMapper {

    public static BalanceDatasetDto toBalanceDatasetDto(BalanceDataset balanceDataset) {
        return BalanceDatasetDto.builder()
                .date(balanceDataset.getDate())
                .values(balanceDataset.getValues())
                .total(balanceDataset.getTotal())
                .build();
    }

    public static List<BalanceDatasetDto> toBalanceDatasetListDto(List<BalanceDataset> balanceDatasetList) {
        List<BalanceDatasetDto> balanceDatasetListDto = new ArrayList<>();
        for (BalanceDataset dataset : balanceDatasetList) {
            balanceDatasetListDto.add(toBalanceDatasetDto(dataset));
        }
        return balanceDatasetListDto;
    }
}
