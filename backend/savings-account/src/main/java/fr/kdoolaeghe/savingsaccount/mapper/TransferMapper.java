package fr.kdoolaeghe.savingsaccount.mapper;

import fr.kdoolaeghe.savingsaccount.dto.TransferDto;
import fr.kdoolaeghe.savingsaccount.model.Transfer;

import java.util.ArrayList;
import java.util.List;

public class TransferMapper {

    public static TransferDto toTransferDto(Transfer transfer) {
        return TransferDto.builder()
                .build();
    }

    public static List<TransferDto> toTransferDtoList(List<Transfer> transferList) {
        List<TransferDto> transferDtoList = new ArrayList<>();
        for (Transfer transfer : transferList) {
            transferDtoList.add(toTransferDto(transfer));
        }
        return transferDtoList;
    }

    public static Transfer toTransfer(TransferDto transferDto) {
        return Transfer.builder()
                .build();
    }

    public static List<Transfer> toTransferList(List<TransferDto> transferDtoList) {
        List<Transfer> transferList = new ArrayList<>();
        for (TransferDto transferDto : transferDtoList) {
            transferList.add(toTransfer(transferDto));
        }
        return transferList;
    }

}
