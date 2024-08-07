package com.mycompany.myapp.domain;

import java.util.UUID;

public class TaskTestSamples {

    public static Task getTaskSample1() {
        return new Task()
            .id("id1")
            .subject("subject1")
            .status("status1")
            .priority("priority1")
            .related_to("related_to1")
            .task_Owner("task_Owner1");
    }

    public static Task getTaskSample2() {
        return new Task()
            .id("id2")
            .subject("subject2")
            .status("status2")
            .priority("priority2")
            .related_to("related_to2")
            .task_Owner("task_Owner2");
    }

    public static Task getTaskRandomSampleGenerator() {
        return new Task()
            .id(UUID.randomUUID().toString())
            .subject(UUID.randomUUID().toString())
            .status(UUID.randomUUID().toString())
            .priority(UUID.randomUUID().toString())
            .related_to(UUID.randomUUID().toString())
            .task_Owner(UUID.randomUUID().toString());
    }
}
