package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.LeadTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class LeadTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Lead.class);
        Lead lead1 = getLeadSample1();
        Lead lead2 = new Lead();
        assertThat(lead1).isNotEqualTo(lead2);

        lead2.setId(lead1.getId());
        assertThat(lead1).isEqualTo(lead2);

        lead2 = getLeadSample2();
        assertThat(lead1).isNotEqualTo(lead2);
    }
}
