package fr.kdoolaeghe.savingsaccount.service;

import fr.kdoolaeghe.savingsaccount.model.BalanceDataset;
import fr.kdoolaeghe.savingsaccount.model.BalanceSheet;
import fr.kdoolaeghe.savingsaccount.repository.TransferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BalanceService {

    @Autowired
    private TransferRepository transferRepository;

    public BalanceSheet getBalanceSheet() {
        return new BalanceSheet(transferRepository.getBalanceSheet(), transferRepository.getBalanceTotal());
    }

    public Double getBalanceByType(Long type) {
        return transferRepository.getBalanceByType(type);
    }

    public Double getBalanceTotal() {
        return transferRepository.getBalanceTotal();
    }

    public List<BalanceDataset> getBalanceDatasets() {
        return transferRepository.getBalanceDatasets();
    }
}
