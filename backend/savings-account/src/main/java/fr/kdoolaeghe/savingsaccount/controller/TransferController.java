package fr.kdoolaeghe.savingsaccount.controller;

import fr.kdoolaeghe.savingsaccount.dto.TransferDto;
import fr.kdoolaeghe.savingsaccount.mapper.TransferMapper;
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
    public ResponseEntity<List<TransferDto>> getAllTransfers() {
        List<Transfer> transferList = transferService.getAllTransfers();

        List<TransferDto> transferDtoList = TransferMapper.toTransferDtoList(transferList);
        return ResponseEntity.ok(transferDtoList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransferDto> getTransferById(@PathVariable Long id) {
        Transfer transfer = transferService.getTransferById(id);
        if (transfer == null) return ResponseEntity.notFound().build();

        TransferDto transferDto = TransferMapper.toTransferDto(transfer);
        return ResponseEntity.ok(transferDto);
    }

    @PostMapping("")
    public ResponseEntity<TransferDto> createTransfer(@RequestBody TransferDto transferDto) {
        Transfer fromDto = TransferMapper.toTransfer(transferDto);

        Transfer createdTransfer = transferService.createTransfer(fromDto);
        if (createdTransfer == null) return ResponseEntity.badRequest().build();

        TransferDto createdTransferDto = TransferMapper.toTransferDto(createdTransfer);
        return ResponseEntity.ok(createdTransferDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<TransferDto> deleteTransfer(@PathVariable Long id) {
        boolean status = transferService.deleteTransferById(id);
        if (!status) return ResponseEntity.badRequest().build();

        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<TransferDto> updateTransfer(@PathVariable Long id, @RequestBody TransferDto transferDto) {
        Transfer fromDto = TransferMapper.toTransfer(transferDto);
        fromDto.setId(id);

        Transfer updatedTransfer = transferService.updateTransfer(fromDto);
        if (updatedTransfer == null) return ResponseEntity.notFound().build();

        TransferDto updatedTransferDto = TransferMapper.toTransferDto(updatedTransfer);
        return ResponseEntity.ok(updatedTransferDto);
    }

}
