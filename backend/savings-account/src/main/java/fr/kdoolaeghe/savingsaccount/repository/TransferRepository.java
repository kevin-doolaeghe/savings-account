package fr.kdoolaeghe.savingsaccount.repository;

import fr.kdoolaeghe.savingsaccount.model.Balance;
import fr.kdoolaeghe.savingsaccount.model.Transfer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransferRepository extends JpaRepository<Transfer, Long> {

    @Query(value = "SELECT t.type AS type, SUM(t.amount) AS amount FROM transfers t GROUP BY t.type", nativeQuery = true)
    List<Balance> getBalanceSheet();

    @Query(value = "SELECT date,\n" +
            "SUM(IF(type = 0, amount, 0)) AS savings,\n" +
            "SUM(IF(type = 1, amount, 0)) AS pleasure,\n" +
            "SUM(IF(type = 2, amount, 0)) AS clothes,\n" +
            "SUM(IF(type = 3, amount, 0)) AS vehicle,\n" +
            "SUM(amount) AS total\n" +
            "FROM transfers GROUP BY date ORDER BY date ASC;", nativeQuery = true)
    List<Object> getBalanceDatasets();

}
