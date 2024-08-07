package com.mycompany.myapp.domain;

import java.util.UUID;

public class MeetingTestSamples {

    public static Meeting getMeetingSample1() {
        return new Meeting().id("id1").title("title1").realated_to("realated_to1").contact_name("contact_name1").host("host1");
    }

    public static Meeting getMeetingSample2() {
        return new Meeting().id("id2").title("title2").realated_to("realated_to2").contact_name("contact_name2").host("host2");
    }

    public static Meeting getMeetingRandomSampleGenerator() {
        return new Meeting()
            .id(UUID.randomUUID().toString())
            .title(UUID.randomUUID().toString())
            .realated_to(UUID.randomUUID().toString())
            .contact_name(UUID.randomUUID().toString())
            .host(UUID.randomUUID().toString());
    }
}
