package io.rh.myrh.service.offer;

import io.rh.myrh.dto.OfferDto;
import io.rh.myrh.entity.Company;
import io.rh.myrh.entity.Offer;
import io.rh.myrh.entity.Status;
import io.rh.myrh.provider.JwtProvider;
import io.rh.myrh.repository.CompanyRepo;
import io.rh.myrh.repository.OfferRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OfferServiceImp implements OfferService {
    private final OfferRepo offerRepo;
    private final JwtProvider jwtProvider;
    private final CompanyRepo companyRepo;
    @Override
    public Optional<Offer> getOfferById(Long id) {
        return offerRepo.findByIdAndStatus(id, Status.ACCEPTED);
    }

    @Override
    public Offer saveOffer(OfferDto offerRequest) {
        Company company = getCompany();
        Offer offer = new Offer();
        offer.setCompany(company);
        offer.setUid(offerRequest.getUid());
        offer.setTitle(offerRequest.getTitle());
        offer.setDescription(offerRequest.getDescription());
        offer.setDomain(offerRequest.getDomain());
        offer.setSalary(offerRequest.getSalary());
        offer.setEducation_level(offerRequest.getEducation_level());
        offer.setStatus(Status.PENDING);
        return offerRepo.save(offer);
    }

    public Company getCompany() {
        String token = jwtProvider.getToken();
        String email = jwtProvider.extrcatUsername(token);
        Optional<Company> company = companyRepo.findByEmail(email);
        return company.get();
    }

    @Override
    public void acceptOffer(Long id) {
        Optional<Offer> offer = offerRepo.findById(id);
        if (offer.isPresent()) {
            offer.get().setStatus(Status.ACCEPTED);
            offerRepo.save(offer.get());
        }
    }

    @Override
    public void rejectOffer(Long id) {

    }

    @Override
    public void deleteOffer(Long id) {

    }
    @Override
    public Page<Offer> getAllOffers(int pageNumber, int pageSize){
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize);
        return offerRepo.findAll(pageRequest);
    }

    @Override
    public Page<Offer> getAllOffersByCompany(int pageNumber, int pageSize, Long id) {
        return offerRepo.findAllByCompany_IdAndStatus(id, Status.ACCEPTED, PageRequest.of(pageNumber, pageSize));
    }

    @Override
    public Page<Offer> getAllAcceptedOffers(int pageNumber, int pageSize) {
        return offerRepo.findAllByStatus(Status.ACCEPTED, PageRequest.of(pageNumber, pageSize));
    }

    @Override
    public Page<Offer> getAllPendingOffers(int pageNumber, int pageSize) {
        return offerRepo.findAllByStatus(Status.PENDING, PageRequest.of(pageNumber, pageSize));
    }

    @Override
    public Page<Offer> getAllRejectedOffers(int pageNumber, int pageSize) {
        return offerRepo.findAllByStatus(Status.REJECTED, PageRequest.of(pageNumber, pageSize));
    }

    @Override
    public Page<Offer> getAllOffersByCompanyWithFilter(int pageNumber, int pageSize, Status status) {
        Long id = getCompany().getId();
        return offerRepo.findAllByCompany_IdAndStatus(id, status, PageRequest.of(pageNumber, pageSize));
    }

    @Override
    public Page<Offer> getAllOffersByCompanyId(int pageNumber, int pageSize, Long id) {
        return offerRepo.findAllByCompany_Id(id, PageRequest.of(pageNumber, pageSize));
    }

    @Override
    public Page<Offer> searchOffers(String query, String domain, String educationLevel, String salary, String location, int pageNumber, int pageSize) {
        return offerRepo.search(query, query, domain, salary, educationLevel, Status.ACCEPTED, location, PageRequest.of(pageNumber, pageSize));
    }


}
