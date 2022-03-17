package fr.kdoolaeghe.savingsaccount.repository;

import fr.kdoolaeghe.savingsaccount.model.BalanceSheet;
import fr.kdoolaeghe.savingsaccount.model.Transfer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransferRepository extends JpaRepository<Transfer, Long>, CustomTransferRepository {

    @Query(value = "SELECT t.type,SUM(t.value) AS value FROM transfers t GROUP BY t.type", nativeQuery = true)
    List<BalanceSheet.BalanceEntry> getBalanceSheet();

    @Query(value = "SELECT COALESCE(SUM(t.value),0) FROM transfers t WHERE t.type=:type", nativeQuery = true)
    Double getBalanceByType(@Param("type") Long type);

    @Query(value = "SELECT COALESCE(SUM(t.value),0) FROM transfers t", nativeQuery = true)
    Double getBalanceTotal();
}
