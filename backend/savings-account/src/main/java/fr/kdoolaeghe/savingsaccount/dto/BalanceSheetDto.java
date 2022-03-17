package fr.kdoolaeghe.savingsaccount.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Data
@Builder
public class BalanceSheetDto {

    @JsonProperty("entries")
    private List<BalanceEntryDto> entries;

    @JsonProperty("total")
    private Double total;

    @Data
    @Builder
    public static class BalanceEntryDto {

        private Long type;

        private Double value;
    }
}
