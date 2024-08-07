package com.mycompany.myapp.service.mapper;

import static com.mycompany.myapp.domain.MeetingAsserts.*;
import static com.mycompany.myapp.domain.MeetingTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class MeetingMapperTest {

    private MeetingMapper meetingMapper;

    @BeforeEach
    void setUp() {
        meetingMapper = new MeetingMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getMeetingSample1();
        var actual = meetingMapper.toEntity(meetingMapper.toDto(expected));
        assertMeetingAllPropertiesEquals(expected, actual);
    }
}
