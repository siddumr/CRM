package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;

public class ContactsTestSamples {

    private static final Random random = new Random();
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static Contacts getContactsSample1() {
        return new Contacts()
            .id("id1")
            .contact_Name("contact_Name1")
            .account_Name("account_Name1")
            .email("email1")
            .phone(1)
            .contact_Owner("contact_Owner1");
    }

    public static Contacts getContactsSample2() {
        return new Contacts()
            .id("id2")
            .contact_Name("contact_Name2")
            .account_Name("account_Name2")
            .email("email2")
            .phone(2)
            .contact_Owner("contact_Owner2");
    }

    public static Contacts getContactsRandomSampleGenerator() {
        return new Contacts()
            .id(UUID.randomUUID().toString())
            .contact_Name(UUID.randomUUID().toString())
            .account_Name(UUID.randomUUID().toString())
            .email(UUID.randomUUID().toString())
            .phone(intCount.incrementAndGet())
            .contact_Owner(UUID.randomUUID().toString());
    }
}
