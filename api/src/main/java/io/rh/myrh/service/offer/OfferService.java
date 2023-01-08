package io.rh.myrh.service.offer;

import io.rh.myrh.dto.OfferDto;
import io.rh.myrh.entity.Offer;
import io.rh.myrh.entity.Status;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface OfferService {
    Optional<Offer> getOfferById(Long id);
    Offer saveOffer(OfferDto offerRequest);
    void acceptOffer(Long id);
    void rejectOffer(Long id);
    void deleteOffer(Long id);
    Page<Offer> getAllOffers(int pageNumber, int pageSize);
    Page<Offer> getAllOffersByCompany(int pageNumber, int pageSize, Long id);

    Page<Offer> getAllAcceptedOffers(int pageNumber, int pageSize);

    Page<Offer> getAllPendingOffers(int pageNumber, int pageSize);
    Page<Offer> getAllRejectedOffers(int pageNumber, int pageSize);
    Page<Offer> getAllOffersByCompanyWithFilter(int pageNumber, int pageSize, Status status);
    Page<Offer> getAllOffersByCompanyId(int pageNumber, int pageSize, Long id);


}
