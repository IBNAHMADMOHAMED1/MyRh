package io.rh.myrh.api.offer;

import io.rh.myrh.dto.OfferDto;
import io.rh.myrh.dto.OfferResponse;
import io.rh.myrh.dto.OffersResponse;
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
    @GetMapping("public/offers")
    public ResponseEntity<OffersResponse> getOffers(
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "2") int size
    ) {
        Page<Offer> page = offerService.getAllAcceptedOffers(pageNumber, size);
        OffersResponse offerResponse = new OffersResponse();
        offerResponse.setSuccess(true);
        offerResponse.setData(page);
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(offerResponse);
    }

    @PostMapping("private/offer/create")
    @PreAuthorize("hasRole('ROLE_COMPANY')")
    public ResponseEntity<OfferResponse> postOffers(@RequestBody OfferDto offerRequest) {
        OfferResponse offerResponse = new OfferResponse();
        if (offerRequest.getTitle() == null || offerRequest.getDescription() == null || offerRequest.getDomain() == null || offerRequest.getSalary() == null || offerRequest.getEducation_level() == null) {
            offerResponse.setMessage("Please fill all the fields");
            offerResponse.setSuccess(false);
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(offerResponse);
        }
        Offer newOffer = offerService.saveOffer(offerRequest);
        offerResponse.setMessage("Offer created successfully");
        offerResponse.setSuccess(true);
        offerResponse.setData(newOffer);
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(offerResponse);
    }

    // get offer by id
    @GetMapping("public/offer/{id}")
    public ResponseEntity<OfferResponse> getOfferById(@PathVariable Long id) {
        Offer offer = offerService.getOfferById(id).get();
        OfferResponse offerResponse = new OfferResponse();
        if (offer.getTitle() == null) {
            offerResponse.setMessage("Offer not found");
            offerResponse.setSuccess(false);
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(offerResponse);
        }
        offerResponse.setSuccess(true);
        offerResponse.setData(offer);
        offerResponse.setMessage("Offer found");
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(offerResponse);
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
    public ResponseEntity<OffersResponse> getAllOffersByCompany(
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "2") int size,
            @RequestParam(defaultValue = "all") String status
    ) {
        OffersResponse offerResponse = new OffersResponse();

        if (status.equals("all")) {
            Long company_id = offerService.getCompany().getId();
            Page<Offer> page = offerService.getAllOffersByCompanyId(pageNumber, size, company_id);
            offerResponse.setMessage("All offers");
            offerResponse.setSuccess(true);
            offerResponse.setData(page);
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(offerResponse);
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
                offerResponse.setMessage("All offers");
                offerResponse.setSuccess(true);
                offerResponse.setData(page);
                return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(offerResponse);
            }
            Page<Offer> page = offerService.getAllOffersByCompanyWithFilter(pageNumber, size, offerStatus);
            offerResponse.setMessage("All offers");
            offerResponse.setSuccess(true);
            offerResponse.setData(page);
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(offerResponse);
        }
    }
    @GetMapping("public/offers/search")
    public  ResponseEntity<OffersResponse> searchOffers(
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "2") int size,
            @RequestParam(name = "title", required = false) String title,
            @RequestParam(name = "domain", required = false) String domain,
            @RequestParam(name = "location", required = false) String location) {
        // http://localhost:8080/api/v1/public/offers/search?pageNumber=0&size=2&title=java&domain=IT&location=London
       Page<Offer> offers = offerService.searchOffers(title, domain, location, pageNumber, size);
        OffersResponse offerResponse = new OffersResponse();
        offerResponse.setMessage("All offers");
        offerResponse.setSuccess(true);
        offerResponse.setData(offers);
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(offerResponse);
    }

}
