package fr.kdoolaeghe.savingsaccount.model;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BalanceSheet {

    private List<BalanceEntry> entries;

    private Double total;

    public interface BalanceEntry {

        Long getType();

        Double getValue();
    }
}
