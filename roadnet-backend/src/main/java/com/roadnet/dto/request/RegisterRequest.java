package com.roadnet.dto.request;

import com.roadnet.entity.*;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Set;
import java.util.UUID;

@Data
public class RegisterRequest {

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    @NotBlank(message = "Display name is required")
    @Size(min = 2, max = 50, message = "Display name must be 2-50 characters")
    private String displayName;

    @NotNull(message = "Date of birth is required")
    private LocalDate dateOfBirth;

    @NotNull(message = "Gender is required")
    private Gender gender;

    @NotBlank(message = "Country of origin is required")
    private String countryOfOrigin;

    private String region;

    @NotNull(message = "Account purpose is required")
    private AccountPurpose accountPurpose;

    private AccountType accountType;

    private Set<UUID> intentions;

    private Set<UUID> interests;

    private Set<UUID> languages;

    private GeographicPreference geographicPreference;

    @Size(max = 2000, message = "Bio must be under 2000 characters")
    private String bio;

    private String profession;

    private MaritalStatus maritalStatus;
}
