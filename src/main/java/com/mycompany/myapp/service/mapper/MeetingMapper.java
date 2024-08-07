package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Meeting;
import com.mycompany.myapp.service.dto.MeetingDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Meeting} and its DTO {@link MeetingDTO}.
 */
@Mapper(componentModel = "spring")
public interface MeetingMapper extends EntityMapper<MeetingDTO, Meeting> {}
