package com.roadnet.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CommentCreateRequest {

    @NotNull(message = "Comment content is required")
    @Size(min = 1, max = 2000, message = "Comment must be 1-2000 characters")
    private String content;
}
