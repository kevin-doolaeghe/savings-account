package fr.kdoolaeghe.savingsaccount.model;

public interface Balance {

    Transfer.TransferType getType();

    Double getAmount();

}
