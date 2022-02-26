package fr.kdoolaeghe.savingsaccount.model;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "transfers")
public class Transfer {

    public enum TransferType {
        SAVINGS,
        PLEASURE,
        VEHICLE,
        CLOTHES
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "description", nullable = false, length = 100)
    private String description;

    @Column(name = "date")
    private Date date;

    @Column(name = "amount", nullable = false)
    private Long amount;

    @Column(name = "type", nullable = false)
    private TransferType type;

    @Column(name = "status", nullable = false)
    private Boolean status;

}
