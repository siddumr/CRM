package com.mycompany.myapp.domain;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A Task.
 */
@Document(collection = "task")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Task implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull(message = "must not be null")
    @Field("subject")
    private String subject;

    @Field("due_date")
    private LocalDate due_Date;

    @NotNull(message = "must not be null")
    @Field("status")
    private String status;

    @Field("priority")
    private String priority;

    @Field("related_to")
    private String related_to;

    @Field("task_owner")
    private String task_Owner;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Task id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSubject() {
        return this.subject;
    }

    public Task subject(String subject) {
        this.setSubject(subject);
        return this;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public LocalDate getDue_Date() {
        return this.due_Date;
    }

    public Task due_Date(LocalDate due_Date) {
        this.setDue_Date(due_Date);
        return this;
    }

    public void setDue_Date(LocalDate due_Date) {
        this.due_Date = due_Date;
    }

    public String getStatus() {
        return this.status;
    }

    public Task status(String status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPriority() {
        return this.priority;
    }

    public Task priority(String priority) {
        this.setPriority(priority);
        return this;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getRelated_to() {
        return this.related_to;
    }

    public Task related_to(String related_to) {
        this.setRelated_to(related_to);
        return this;
    }

    public void setRelated_to(String related_to) {
        this.related_to = related_to;
    }

    public String getTask_Owner() {
        return this.task_Owner;
    }

    public Task task_Owner(String task_Owner) {
        this.setTask_Owner(task_Owner);
        return this;
    }

    public void setTask_Owner(String task_Owner) {
        this.task_Owner = task_Owner;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Task)) {
            return false;
        }
        return getId() != null && getId().equals(((Task) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Task{" +
            "id=" + getId() +
            ", subject='" + getSubject() + "'" +
            ", due_Date='" + getDue_Date() + "'" +
            ", status='" + getStatus() + "'" +
            ", priority='" + getPriority() + "'" +
            ", related_to='" + getRelated_to() + "'" +
            ", task_Owner='" + getTask_Owner() + "'" +
            "}";
    }
}
