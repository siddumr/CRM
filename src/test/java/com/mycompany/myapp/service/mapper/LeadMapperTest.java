package com.mycompany.myapp.service.mapper;

import static com.mycompany.myapp.domain.LeadAsserts.*;
import static com.mycompany.myapp.domain.LeadTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class LeadMapperTest {

    private LeadMapper leadMapper;

    @BeforeEach
    void setUp() {
        leadMapper = new LeadMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getLeadSample1();
        var actual = leadMapper.toEntity(leadMapper.toDto(expected));
        assertLeadAllPropertiesEquals(expected, actual);
    }
}
