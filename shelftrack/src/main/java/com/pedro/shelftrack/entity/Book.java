package com.pedro.shelftrack.entity;
import com.pedro.shelftrack.enums.BookType;
import com.pedro.shelftrack.enums.ReadingStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "books")
@Getter
@Setter
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String author;

    @Enumerated(EnumType.STRING)
    private BookType type;

    private String genre;

    private String publisher;

    private Integer volume;

    @Column(name = "total_volumes")
    private Integer totalVolumes;

    @Enumerated(EnumType.STRING)
    private ReadingStatus status;

    private Integer rating;

    private Boolean owned;

    @Column(name = "purchase_date")
    private LocalDate purchaseDate;

    private BigDecimal price;

    @Column(length = 1000)
    private String notes;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }
}