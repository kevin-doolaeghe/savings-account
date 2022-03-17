package fr.kdoolaeghe.savingsaccount.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.Date;

@Data
@Builder
public class TransferGetDto {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("description")
    private String description;

    @JsonProperty("date")
    private Date date;

    @JsonProperty("value")
    private Double value;

    @JsonProperty("type")
    private Long type;

    @JsonProperty("status")
    private Boolean status;

}
