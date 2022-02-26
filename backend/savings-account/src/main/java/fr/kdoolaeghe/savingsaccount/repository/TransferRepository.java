package fr.kdoolaeghe.savingsaccount.repository;

import fr.kdoolaeghe.savingsaccount.model.Transfer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransferRepository extends JpaRepository<Transfer, Long> {

}
