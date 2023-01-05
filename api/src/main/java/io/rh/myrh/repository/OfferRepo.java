package io.rh.myrh.repository;

import io.rh.myrh.entity.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OfferRepo extends JpaRepository<Offer, Long> {
    Optional<Offer> findByUid(String uid);
}
