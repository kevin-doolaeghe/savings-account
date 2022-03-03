package fr.kdoolaeghe.savingsaccount.service;

import fr.kdoolaeghe.savingsaccount.model.Balance;
import fr.kdoolaeghe.savingsaccount.model.Transfer;
import fr.kdoolaeghe.savingsaccount.repository.TransferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransferService {

    @Autowired
    private TransferRepository transferRepository;

    public List<Transfer> getAllTransfers() {
        return transferRepository.findAll(Sort.by("date"));
    }

    public Transfer getTransferById(Long id) {
        Optional<Transfer> found = transferRepository.findById(id);
        return found.orElse(null);
    }

    public List<Balance> getBalanceSheet() {
        return transferRepository.getBalanceSheet();
    }

    public Transfer createTransfer(Transfer transfer) {
        Transfer found = getTransferById(transfer.getId() != null ? transfer.getId() : -1);
        if (found == null) return transferRepository.save(transfer);
        return null;
    }

    public boolean deleteTransferById(Long id) {
        Transfer found = getTransferById(id);
        if (found != null) {
            transferRepository.deleteById(found.getId());
            return true;
        }
        return false;
    }

    public Transfer updateTransfer(Transfer transfer) {
        Transfer found = getTransferById(transfer.getId());
        if (found != null) return transferRepository.save(transfer);
        return null;
    }

}
