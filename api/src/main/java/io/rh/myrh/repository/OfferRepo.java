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

        // title, domain, location, stataus, pageNumber, size -> using or operator filter
   // @Query("SELECT o FROM Offer o WHERE o.title LIKE %:title% OR o.domain LIKE %:domain% OR o.location LIKE %:location% OR o.status LIKE %:status%")
    //Page<Offer> searchOffers(@Param("title") String title, @Param("domain") String domain, @Param("location") String location, @Param("status") Status status, Pageable pageable);
    @Query("SELECT o FROM Offer o WHERE " +
            "(:status IS NULL OR o.status = :status) AND " +
            "(:title IS NULL OR o.title LIKE %:title%) AND " +
            "(:domain IS NULL OR o.domain = :domain) AND " +
            "(:location IS NULL OR o.location = :location)")
    Page<Offer> search(
            @Param("title") String title,
            @Param("domain") String domain,
            @Param("status") Status status,
            @Param("location") String location,
            Pageable pageable);
}

