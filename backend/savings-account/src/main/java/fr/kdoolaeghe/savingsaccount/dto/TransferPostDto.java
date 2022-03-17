package fr.kdoolaeghe.savingsaccount.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class TransferPostDto {

    @JsonProperty(value = "description", required = true)
    private String description;

    @JsonProperty(value = "date", required = true)
    private Date date;

    @JsonProperty(value = "value", required = true)
    private Double value;

    @JsonProperty(value = "type", required = true)
    private Long type;

    @JsonProperty(value = "status", required = true)
    private Boolean status;

}
