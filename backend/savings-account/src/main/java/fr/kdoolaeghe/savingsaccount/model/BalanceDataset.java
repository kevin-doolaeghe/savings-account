package fr.kdoolaeghe.savingsaccount.model;

import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BalanceDataset {

    private Date date;

    private List<Double> values;

    private Double total;
}
