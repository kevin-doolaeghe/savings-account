package fr.kdoolaeghe.savingsaccount.repository;

import fr.kdoolaeghe.savingsaccount.model.BalanceDataset;

import javax.persistence.*;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class CustomTransferRepositoryImpl implements CustomTransferRepository {

    @PersistenceContext
    private EntityManager em;

    /*
        SET @sql=NULL;
        SELECT GROUP_CONCAT(DISTINCT CONCAT(
            'SUM(IF(t.type=',type,',t.value,0))'
        ) SEPARATOR ',",",') INTO @sql FROM transfers;
        SET @sql=CONCAT(
            'SELECT t.date,CONCAT("[",',
            @sql,
            ',"]") AS "values",SUM(t.value) AS "total" FROM transfers t GROUP BY t.date ORDER BY t.date DESC'
        );
        SELECT @sql;
        PREPARE stmt FROM @sql;
        EXECUTE stmt;
    */
    @Override
    @SuppressWarnings("unchecked")
    public List<BalanceDataset> getBalanceDatasets() {
        String headers = (String) em.createNativeQuery("SELECT GROUP_CONCAT(DISTINCT CONCAT('SUM(IF(t.type='," +
                "type,',value,0))') SEPARATOR ',\",\",') FROM transfers").getSingleResult();
        if (headers == null) return new ArrayList<>();
        List<Tuple> tuples = em.createNativeQuery("SELECT t.date,CONCAT(" + headers + "),SUM(t.value)\n" +
                "FROM transfers t GROUP BY t.date ORDER BY t.date DESC", Tuple.class).getResultList();
        return tuples.stream().map(tuple -> {
            List<Double> values = Stream
                    .of(new String((byte[]) tuple.get(1), StandardCharsets.UTF_8).split(","))
                    .map(Double::parseDouble)
                    .collect(Collectors.toList());
            return new BalanceDataset(tuple.get(0, Date.class), values, tuple.get(2, Double.class));
        }).collect(Collectors.toList());
    }
}
