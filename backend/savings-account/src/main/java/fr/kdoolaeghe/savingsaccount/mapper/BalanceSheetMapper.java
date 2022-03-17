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

    public static List<TransferGetDto> toTransferDtoList(List<Transfer> transferList) {
        List<TransferGetDto> transferDtoList = new ArrayList<>();
        for (Transfer transfer : transferList) {
            transferDtoList.add(toTransferDto(transfer));
        }
        return transferDtoList;
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

    public static List<Transfer> toTransferList(List<TransferPostDto> transferDtoList) {
        List<Transfer> transferList = new ArrayList<>();
        for (TransferPostDto dto : transferDtoList) {
            transferList.add(toTransfer(dto));
        }
        return transferList;
    }




}
