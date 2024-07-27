package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Lead;
import com.mycompany.myapp.service.dto.LeadDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Lead} and its DTO {@link LeadDTO}.
 */
@Mapper(componentModel = "spring")
public interface LeadMapper extends EntityMapper<LeadDTO, Lead> {}
