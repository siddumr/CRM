package com.mycompany.myapp.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.Task} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TaskDTO implements Serializable {

    private String id;

    @NotNull(message = "must not be null")
    private String subject;

    private LocalDate due_Date;

    @NotNull(message = "must not be null")
    private String status;

    private String priority;

    private String related_to;

    private String task_Owner;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public LocalDate getDue_Date() {
        return due_Date;
    }

    public void setDue_Date(LocalDate due_Date) {
        this.due_Date = due_Date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getRelated_to() {
        return related_to;
    }

    public void setRelated_to(String related_to) {
        this.related_to = related_to;
    }

    public String getTask_Owner() {
        return task_Owner;
    }

    public void setTask_Owner(String task_Owner) {
        this.task_Owner = task_Owner;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TaskDTO)) {
            return false;
        }

        TaskDTO taskDTO = (TaskDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, taskDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TaskDTO{" +
            "id='" + getId() + "'" +
            ", subject='" + getSubject() + "'" +
            ", due_Date='" + getDue_Date() + "'" +
            ", status='" + getStatus() + "'" +
            ", priority='" + getPriority() + "'" +
            ", related_to='" + getRelated_to() + "'" +
            ", task_Owner='" + getTask_Owner() + "'" +
            "}";
    }
}
