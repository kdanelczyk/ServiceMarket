package com.servicemarket.servicemarket.model;

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
public class TaskOffer extends Task {

    private String offeredBy;
}
