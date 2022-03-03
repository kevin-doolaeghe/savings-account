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

}
