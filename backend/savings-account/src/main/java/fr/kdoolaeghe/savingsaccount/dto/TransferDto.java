package fr.kdoolaeghe.savingsaccount.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import fr.kdoolaeghe.savingsaccount.model.Transfer;
import lombok.*;

import java.util.Date;

@Data
@Builder
public class TransferDto {

    @JsonProperty("id")
    private Long id;

    @JsonProperty(value = "description", required = true)
    private String description;

    @JsonProperty(value = "date")
    private Date date;

    @JsonProperty(value = "amount", required = true)
    private Long amount;

    @JsonProperty(value = "type", required = true)
    private Transfer.TransferType type;

    @JsonProperty(value = "status", required = true)
    private Boolean status;

}
