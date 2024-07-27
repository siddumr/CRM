package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;

public class LeadTestSamples {

    private static final Random random = new Random();
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static Lead getLeadSample1() {
        return new Lead()
            .id("id1")
            .first_name("first_name1")
            .last_name("last_name1")
            .company("company1")
            .title("title1")
            .phone(1)
            .email("email1")
            .fax("fax1")
            .website("website1")
            .industry("industry1")
            .no_of_employees(1)
            .annual_Revenue(1)
            .street("street1")
            .state("state1")
            .zip_code(1)
            .description("description1");
    }

    public static Lead getLeadSample2() {
        return new Lead()
            .id("id2")
            .first_name("first_name2")
            .last_name("last_name2")
            .company("company2")
            .title("title2")
            .phone(2)
            .email("email2")
            .fax("fax2")
            .website("website2")
            .industry("industry2")
            .no_of_employees(2)
            .annual_Revenue(2)
            .street("street2")
            .state("state2")
            .zip_code(2)
            .description("description2");
    }

    public static Lead getLeadRandomSampleGenerator() {
        return new Lead()
            .id(UUID.randomUUID().toString())
            .first_name(UUID.randomUUID().toString())
            .last_name(UUID.randomUUID().toString())
            .company(UUID.randomUUID().toString())
            .title(UUID.randomUUID().toString())
            .phone(intCount.incrementAndGet())
            .email(UUID.randomUUID().toString())
            .fax(UUID.randomUUID().toString())
            .website(UUID.randomUUID().toString())
            .industry(UUID.randomUUID().toString())
            .no_of_employees(intCount.incrementAndGet())
            .annual_Revenue(intCount.incrementAndGet())
            .street(UUID.randomUUID().toString())
            .state(UUID.randomUUID().toString())
            .zip_code(intCount.incrementAndGet())
            .description(UUID.randomUUID().toString());
    }
}
