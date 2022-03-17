package fr.kdoolaeghe.savingsaccount.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.Date;
import java.util.List;

@Data
@Builder
public class BalanceDataset {

    @JsonProperty("date")
    private Date date;

    @JsonProperty("values")
    private List<Double> values;

    @JsonProperty("total")
    private Double total;

}
