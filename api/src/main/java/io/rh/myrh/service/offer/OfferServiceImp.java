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
        offer.setUid(getUid(company.getName()));
        offer.setTitle(offerRequest.getTitle());
        offer.setDescription(offerRequest.getDescription());
        offer.setDomain(offerRequest.getDomain());
        offer.setSalary(offerRequest.getSalary());
        offer.setEducation_level(offerRequest.getEducation_level());
        offer.setLocation(offerRequest.getLocation());
        offer.setStatus(Status.PENDING);
        return offerRepo.save(offer);
    }

    private String getUid(String companyName) {
        String tow = companyName.substring(0, 2);
        String uid = tow + Math.random();
        return tow + "-" + uid;
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
        Optional<Offer> offer = offerRepo.findById(id);
        if (offer.isPresent()) {
            offer.get().setStatus(Status.REJECTED);
            offerRepo.save(offer.get());
        }
    }

    @Override
    public void deleteOffer(Long id) {

    }
    @Override
    public Page<Offer> getAllOffers(Status status,int pageNumber, int pageSize){
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize);
        if (status == null) {
            return offerRepo.findAll(pageRequest);
        }
        return offerRepo.findAllByStatus(status, pageRequest);
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
    // searchOffers(title, domain, location, pageNumber, size);
    public Page<Offer> searchOffers(String title, String domain, String location, int pageNumber, int size) {
        return offerRepo.search(title, domain, Status.ACCEPTED, location, PageRequest.of(pageNumber, size));
    }

    @Override
    public Boolean updateOfferView(Long id) {
        Optional<Offer> offer = offerRepo.findByIdAndStatus(id, Status.ACCEPTED);
        if (offer.isPresent()) {
            offer.get().setViews(offer.get().getViews() + 1);
            offerRepo.save(offer.get());
            return true;
        }
        return false;
    }


}
