package com.servicemarket.servicemarket.model;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@AllArgsConstructor
@Getter
@Setter
@ToString
public class TaskRequest extends Task {
    
    private String location;
    private LocalDateTime deadline;
}
