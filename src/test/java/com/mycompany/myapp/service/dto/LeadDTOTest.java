package com.mycompany.myapp.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class LeadDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LeadDTO.class);
        LeadDTO leadDTO1 = new LeadDTO();
        leadDTO1.setId("id1");
        LeadDTO leadDTO2 = new LeadDTO();
        assertThat(leadDTO1).isNotEqualTo(leadDTO2);
        leadDTO2.setId(leadDTO1.getId());
        assertThat(leadDTO1).isEqualTo(leadDTO2);
        leadDTO2.setId("id2");
        assertThat(leadDTO1).isNotEqualTo(leadDTO2);
        leadDTO1.setId(null);
        assertThat(leadDTO1).isNotEqualTo(leadDTO2);
    }
}
