package io.rh.myrh.repository;

import io.rh.myrh.entity.Offer;
import io.rh.myrh.entity.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OfferRepo extends JpaRepository<Offer, Long> {
    Optional<Offer> findByUid(String uid);

    @Override
    Page<Offer> findAll(Pageable pageable);

    Page<Offer> findAllByCompany_IdAndStatus(Long id, Status status, Pageable pageable);

    Page<Offer> findAllByStatus(Status status, Pageable pageable);

    Optional<Offer> findByIdAndStatus(Long id, Status status);

    Page<Offer> findAllByCompany_Id(Long id, Pageable pageable);

        @Query("SELECT o FROM Offer o WHERE " +

                "(:title IS NULL OR o.title LIKE %:title%) AND " +
                "(:description IS NULL OR o.description LIKE %:description%) AND " +
                "(:domain IS NULL OR o.domain = :domain) AND " +
                "(:salary IS NULL OR o.salary = :salary) AND " +
                "(:educationLevel IS NULL OR o.education_level = :educationLevel) AND " +
                "(:status IS NULL OR o.status = :status) AND " +
                "(:location IS NULL OR o.location = :location)")
        Page<Offer> search(
                           @Param("title") String title,
                           @Param("description") String description,
                           @Param("domain") String domain,
                           @Param("salary") String salary,
                           @Param("educationLevel") String educationLevel,
                           @Param("status") Status status,
                           @Param("location") String location,
                           Pageable pageable);

}

