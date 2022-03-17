package fr.kdoolaeghe.savingsaccount.repository;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

public class CustomizedTransferRepositoryImpl implements CustomizedTransferRepository {

    @PersistenceContext
    private EntityManager em;

    /*
        SET @sql=NULL;
        SELECT COALESCE((SELECT GROUP_CONCAT(DISTINCT CONCAT(
            'SUM(IF(t.type=',type,',value,0)) AS "type',type,'"'
        )) FROM transfers),'NULL') AS 'headers' INTO @sql;
        SET @sql=CONCAT(
            'SELECT t.date,',
            @sql,
            ',SUM(t.value) AS "total" FROM transfers t GROUP BY t.date ORDER BY t.date DESC'
        );
        SELECT @sql;
        PREPARE stmt FROM @sql;
        EXECUTE stmt;
    */
    @Override
    @SuppressWarnings("unchecked")
    public List<Object> getBalanceDatasets() {
        String headers = (String) em.createNativeQuery("SELECT GROUP_CONCAT(DISTINCT CONCAT(\n" +
                "'SUM(IF(t.type=',type,',value,0)) AS `type',type,'`')) FROM transfers").getSingleResult();
        if (headers != null)
            return em.createNativeQuery("SELECT t.date," + headers + ",SUM(t.value) AS 'total'\n" +
                    "FROM transfers t GROUP BY t.date ORDER BY t.date DESC").getResultList();
        else
            return new ArrayList<>();
    }
}
