package com.roadnet.repository;

import com.roadnet.entity.Report;
import com.roadnet.entity.ReportStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ReportRepository extends JpaRepository<Report, UUID> {

    List<Report> findByStatus(ReportStatus status);

    List<Report> findByReporterId(UUID reporterId);

    long countByStatus(ReportStatus status);
}
