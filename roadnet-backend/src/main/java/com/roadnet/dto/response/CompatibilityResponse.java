package com.roadnet.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompatibilityResponse {

    private Double score;
    private Breakdown breakdown;
    private List<String> reasons;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Breakdown {
        private Double intentions;
        private Double geography;
        private Double interests;
        private Double lifestyle;
        private Double languages;
        private Double distance;
        private Double other;
    }
}
