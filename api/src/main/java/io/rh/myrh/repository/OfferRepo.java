package io.rh.myrh.repository;

import io.rh.myrh.entity.Offer;
import io.rh.myrh.entity.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
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
}

