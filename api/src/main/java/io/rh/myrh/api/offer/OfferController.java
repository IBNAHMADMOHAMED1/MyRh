package io.rh.myrh.api.offer;

import io.rh.myrh.dto.OfferDto;
import io.rh.myrh.entity.Offer;
import io.rh.myrh.entity.Status;
import io.rh.myrh.repository.CompanyRepo;
import io.rh.myrh.repository.OfferRepo;
import io.rh.myrh.service.offer.OfferServiceImp;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class OfferController {
    private final OfferServiceImp offerService;
    @GetMapping("private/offers")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Page<Offer>> getAllOffers(
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "2") int size
    ) {
        Page<Offer> page = offerService.getAllOffers(pageNumber, size);
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(page);
    }
    // public offers list offer accept
    @GetMapping("public/offers")
    public ResponseEntity<Page<Offer>> getOffers(
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "2") int size
    ) {
        Page<Offer> page = offerService.getAllAcceptedOffers(pageNumber, size);
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(page);
    }

    @PostMapping("private/offer/create")
    @PreAuthorize("hasRole('ROLE_COMPANY')")
    public ResponseEntity<Offer> postOffers(@RequestBody OfferDto offerRequest) {
        if (offerRequest.getUid() == null || offerRequest.getTitle() == null || offerRequest.getDescription() == null || offerRequest.getDomain() == null || offerRequest.getSalary() == null || offerRequest.getEducation_level() == null) {
            return ResponseEntity.badRequest().build();
        }
        Offer newOffer = offerService.saveOffer(offerRequest);
        return ResponseEntity.ok(newOffer);
    }

    // get offer by id
    @GetMapping("public/offer/{id}")
    public ResponseEntity<Offer> getOfferById(@PathVariable Long id) {
        Offer offer = offerService.getOfferById(id).get();
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(offer);
    }
    // get offer by company
    @GetMapping("public/offers/{company_id}")
    public ResponseEntity<Page<Offer>> getOfferByCompanyId(@PathVariable Long company_id, @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "2") int size) {
        Page<Offer> page = offerService.getAllOffersByCompany(pageNumber, size, company_id);
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(page);
    }
    // method for admin to accept offer by id
    @PutMapping("private/offer/accept/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Offer> acceptOffer(@PathVariable Long id) {
        offerService.acceptOffer(id);
        return ResponseEntity.ok().build();
    }
    // method for admin to reject offer by id
    @PutMapping("private/offer/reject/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Offer> rejectOffer(@PathVariable Long id) {
        offerService.rejectOffer(id);
        return ResponseEntity.ok().build();
    }
    // method for admin to get all pending offers
    @GetMapping("private/offers/pending")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Page<Offer>> getAllPendingOffers(
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "2") int size
    ) {
        Page<Offer> page = offerService.getAllPendingOffers(pageNumber, size);
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(page);
    }
    // method for admin to get all rejected offers
    @GetMapping("private/offers/rejected")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Page<Offer>> getAllRejectedOffers(
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "2") int size
    ) {
        Page<Offer> page = offerService.getAllRejectedOffers(pageNumber, size);
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(page);
    }
    // method to get all offers for a company logged in with filter and pagination
    // http://localhost:8080/api/v1/private/offers/company?status=ACCEPTED&pageNumber=0&size=2
    @GetMapping("private/offers/company")
    @PreAuthorize("hasRole('ROLE_COMPANY')")
    public ResponseEntity<Page<Offer>> getAllOffersByCompany(
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "2") int size,
            @RequestParam(defaultValue = "all") String status
    ) {
        if (status.equals("all")) {
            Long company_id = offerService.getCompany().getId();
            Page<Offer> page = offerService.getAllOffersByCompanyId(pageNumber, size, company_id);
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(page);
        } else {
            Status offerStatus;
            if (status.equals("ACCEPTED")) {
                offerStatus = Status.ACCEPTED;
            } else if (status.equals("PENDING")) {
                offerStatus = Status.PENDING;
            } else if (status.equals("REJECTED")) {
                offerStatus = Status.REJECTED;
            } else {
                Page<Offer> page = offerService.getAllOffersByCompanyId(pageNumber, size, offerService.getCompany().getId());
                return ResponseEntity.badRequest().contentType(MediaType.APPLICATION_JSON).body(page);
            }
            Page<Offer> page = offerService.getAllOffersByCompanyWithFilter(pageNumber, size, offerStatus);
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(page);
        }
    }
    @GetMapping("public/offers/search")
    // http://localhost:8080/api/v1/public/offers/search?title=java&domain=IT&education_level=MASTER&salary=1000
    public  Page<Offer> searchOffers(
            @RequestParam(name = "q", required = false) String query, // query - search by title and description
            @RequestParam(name = "domain", required = false) String domain,
            @RequestParam(name = "education_level", required = false) String educationLevel,
            @RequestParam(name = "salary", required = false) String salary,
            @RequestParam(name = "location", required = false) String location,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "20") int size) {
       return offerService.searchOffers(query, domain, educationLevel, salary, location, page, size);
    }

}
