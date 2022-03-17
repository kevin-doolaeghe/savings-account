package fr.kdoolaeghe.savingsaccount.controller;

import fr.kdoolaeghe.savingsaccount.dto.BalanceSheetDto;
import fr.kdoolaeghe.savingsaccount.dto.BalanceDatasetDto;
import fr.kdoolaeghe.savingsaccount.mapper.BalanceDatasetMapper;
import fr.kdoolaeghe.savingsaccount.mapper.BalanceSheetMapper;
import fr.kdoolaeghe.savingsaccount.model.BalanceDataset;
import fr.kdoolaeghe.savingsaccount.model.BalanceSheet;
import fr.kdoolaeghe.savingsaccount.service.BalanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/balance")
@RestController
@CrossOrigin(maxAge = 3600)
public class BalanceController {

    @Autowired
    private BalanceService balanceService;

    @GetMapping("")
    public ResponseEntity<BalanceSheetDto> getBalanceSheet() {
        BalanceSheet balanceSheet = balanceService.getBalanceSheet();

        BalanceSheetDto dto = BalanceSheetMapper.toBalanceSheetDto(balanceSheet);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/{type}")
    public ResponseEntity<Double> getBalanceByType(@PathVariable Long type) {
        return ResponseEntity.ok(balanceService.getBalanceByType(type));
    }

    @GetMapping("/total")
    public ResponseEntity<Double> getBalanceTotal() {
        return ResponseEntity.ok(balanceService.getBalanceTotal());
    }

    @GetMapping("/datasets")
    public ResponseEntity<List<BalanceDatasetDto>> getBalanceDatasets() {
        List<BalanceDataset> datasets = balanceService.getBalanceDatasets();

        List<BalanceDatasetDto> dto = BalanceDatasetMapper.toBalanceDatasetListDto(datasets);
        return ResponseEntity.ok(dto);
    }
}
