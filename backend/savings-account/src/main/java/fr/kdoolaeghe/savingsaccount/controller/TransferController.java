package fr.kdoolaeghe.savingsaccount.controller;

import fr.kdoolaeghe.savingsaccount.dto.TransferGetDto;
import fr.kdoolaeghe.savingsaccount.dto.TransferPostDto;
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
    public ResponseEntity<List<TransferGetDto>> getTransferList() {
        List<Transfer> transferList = transferService.getTransferList();

        List<TransferGetDto> transferDtoList = TransferMapper.toTransferListDto(transferList);
        return ResponseEntity.ok(transferDtoList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransferGetDto> getTransferById(@PathVariable Long id) {
        Transfer foundTransfer = transferService.getTransferById(id);
        if (foundTransfer == null) return ResponseEntity.notFound().build();

        TransferGetDto foundTransferDto = TransferMapper.toTransferDto(foundTransfer);
        return ResponseEntity.ok(foundTransferDto);
    }

    @PostMapping("")
    public ResponseEntity<TransferGetDto> createTransfer(@RequestBody TransferPostDto dto) {
        Transfer fromDto = TransferMapper.toTransfer(dto);

        Transfer createdTransfer = transferService.createTransfer(fromDto);
        if (createdTransfer == null) return ResponseEntity.badRequest().build();

        TransferGetDto createdTransferDto = TransferMapper.toTransferDto(createdTransfer);
        return ResponseEntity.ok(createdTransferDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<TransferGetDto> deleteTransfer(@PathVariable Long id) {
        boolean status = transferService.deleteTransferById(id);
        if (!status) return ResponseEntity.notFound().build();

        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<TransferGetDto> updateTransfer(@PathVariable Long id, @RequestBody TransferPostDto dto) {
        Transfer fromDto = TransferMapper.toTransfer(dto);
        fromDto.setId(id);

        Transfer updatedTransfer = transferService.updateTransfer(fromDto);
        if (updatedTransfer == null) return ResponseEntity.notFound().build();

        TransferGetDto updatedTransferDto = TransferMapper.toTransferDto(updatedTransfer);
        return ResponseEntity.ok(updatedTransferDto);
    }
}
