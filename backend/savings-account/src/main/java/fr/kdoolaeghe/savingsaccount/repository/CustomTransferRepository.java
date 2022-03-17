package fr.kdoolaeghe.savingsaccount.repository;

import fr.kdoolaeghe.savingsaccount.model.BalanceDataset;

import java.util.List;

public interface CustomTransferRepository {

    List<BalanceDataset> getBalanceDatasets();
}
