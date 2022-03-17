package fr.kdoolaeghe.savingsaccount.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import fr.kdoolaeghe.savingsaccount.model.BalanceEntry;
import lombok.*;

import java.util.List;

@Data
@Builder
public class BalanceSheetDto {

    @JsonProperty("entries")
    private List<BalanceEntry> entries;

    @JsonProperty("total")
    private Double total;

}
