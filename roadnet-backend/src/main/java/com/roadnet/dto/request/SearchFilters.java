package com.roadnet.dto.request;

import com.roadnet.entity.*;
import lombok.Data;

import java.util.UUID;

@Data
public class SearchFilters {

    private String keyword;
    private String country;
    private String region;
    private Gender gender;
    private MaritalStatus maritalStatus;
    private AccountPurpose accountPurpose;
    private GeographicPreference geographicPreference;
    private UUID intentionId;
    private UUID interestId;
    private UUID languageId;
    private Integer minAge;
    private Integer maxAge;
    private Double latitude;
    private Double longitude;
    private Double maxDistance;
    private Integer page = 0;
    private Integer size = 20;
}
