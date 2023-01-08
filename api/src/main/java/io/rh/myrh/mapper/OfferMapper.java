package io.rh.myrh.mapper;

import io.rh.myrh.dto.OfferDto;
import io.rh.myrh.entity.Offer;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface OfferMapper {
    OfferMapper INSTANCE = Mappers.getMapper(OfferMapper.class);

    OfferDto offerToOfferDto(Offer offer);
}
