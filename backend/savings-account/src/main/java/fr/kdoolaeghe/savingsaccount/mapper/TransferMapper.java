package fr.kdoolaeghe.savingsaccount.mapper;

import fr.kdoolaeghe.savingsaccount.dto.TransferGetDto;
import fr.kdoolaeghe.savingsaccount.dto.TransferPostDto;
import fr.kdoolaeghe.savingsaccount.model.Transfer;

import java.util.ArrayList;
import java.util.List;

public class TransferMapper {

    public static TransferGetDto toTransferDto(Transfer transfer) {
        return TransferGetDto.builder()
                .id(transfer.getId())
                .description(transfer.getDescription())
                .date(transfer.getDate())
                .value(transfer.getValue())
                .type(transfer.getType())
                .status(transfer.getStatus())
                .build();
    }

    public static List<TransferGetDto> toTransferListDto(List<Transfer> transferList) {
        List<TransferGetDto> transferListDto = new ArrayList<>();
        for (Transfer transfer : transferList) {
            transferListDto.add(toTransferDto(transfer));
        }
        return transferListDto;
    }

    public static Transfer toTransfer(TransferPostDto transferDto) {
        return Transfer.builder()
                .id(Long.MIN_VALUE)
                .description(transferDto.getDescription())
                .date(transferDto.getDate())
                .value(transferDto.getValue())
                .type(transferDto.getType())
                .status(transferDto.getStatus())
                .build();
    }
}
