package fr.kdoolaeghe.savingsaccount.model;

import java.util.Date;

public interface IBalanceDataset {

    Date getDate();

    String getValues();

    Double getTotal();

}
