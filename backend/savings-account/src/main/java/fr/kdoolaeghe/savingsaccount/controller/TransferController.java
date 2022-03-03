package fr.kdoolaeghe.savingsaccount.controller;

import fr.kdoolaeghe.savingsaccount.dto.TransferGetDto;
import fr.kdoolaeghe.savingsaccount.dto.TransferPostDto;
import fr.kdoolaeghe.savingsaccount.mapper.TransferMapper;
import fr.kdoolaeghe.savingsaccount.model.Balance;
import fr.kdoolaeghe.savingsaccount.model.Transfer;
import fr.kdoolaeghe.savingsaccount.service.TransferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/transfers")
@RestController
@CrossOrigin(maxAge = 3600)
public class TransferController {

    @Autowired
    private TransferService transferService;

    @GetMapping("")
    public ResponseEntity<List<TransferGetDto>> getAllTransfers() {
        List<Transfer> transferList = transferService.getAllTransfers();

        List<TransferGetDto> transferDtoList = TransferMapper.toTransferDtoList(transferList);
        return ResponseEntity.ok(transferDtoList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransferGetDto> getTransferById(@PathVariable Long id) {
        Transfer transfer = transferService.getTransferById(id);
        if (transfer == null) return ResponseEntity.notFound().build();

        TransferGetDto transferDto = TransferMapper.toTransferDto(transfer);
        return ResponseEntity.ok(transferDto);
    }

    @GetMapping("/balance")
    public ResponseEntity<List<Balance>> getBalanceSheet() {
        return ResponseEntity.ok(transferService.getBalanceSheet());
    }

    @PostMapping("")
    public ResponseEntity<TransferGetDto> createTransfer(@RequestBody TransferPostDto transferDto) {
        Transfer fromDto = TransferMapper.toTransfer(transferDto);

        Transfer createdTransfer = transferService.createTransfer(fromDto);
        if (createdTransfer == null) return ResponseEntity.badRequest().build();

        TransferGetDto createdTransferGetDto = TransferMapper.toTransferDto(createdTransfer);
        return ResponseEntity.ok(createdTransferGetDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<TransferGetDto> deleteTransfer(@PathVariable Long id) {
        boolean status = transferService.deleteTransferById(id);
        if (!status) return ResponseEntity.notFound().build();

        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<TransferGetDto> updateTransfer(@PathVariable Long id, @RequestBody TransferPostDto transferDto) {
        Transfer fromDto = TransferMapper.toTransfer(transferDto);
        fromDto.setId(id);

        Transfer updatedTransfer = transferService.updateTransfer(fromDto);
        if (updatedTransfer == null) return ResponseEntity.notFound().build();

        TransferGetDto updatedTransferDto = TransferMapper.toTransferDto(updatedTransfer);
        return ResponseEntity.ok(updatedTransferDto);
    }

}
