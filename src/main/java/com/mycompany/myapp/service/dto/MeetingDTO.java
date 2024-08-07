package com.mycompany.myapp.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.Meeting} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class MeetingDTO implements Serializable {

    private String id;

    @NotNull(message = "must not be null")
    private String title;

    private ZonedDateTime from;

    private ZonedDateTime to;

    private String realated_to;

    private String contact_name;

    @NotNull(message = "must not be null")
    private String host;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public ZonedDateTime getFrom() {
        return from;
    }

    public void setFrom(ZonedDateTime from) {
        this.from = from;
    }

    public ZonedDateTime getTo() {
        return to;
    }

    public void setTo(ZonedDateTime to) {
        this.to = to;
    }

    public String getRealated_to() {
        return realated_to;
    }

    public void setRealated_to(String realated_to) {
        this.realated_to = realated_to;
    }

    public String getContact_name() {
        return contact_name;
    }

    public void setContact_name(String contact_name) {
        this.contact_name = contact_name;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MeetingDTO)) {
            return false;
        }

        MeetingDTO meetingDTO = (MeetingDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, meetingDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MeetingDTO{" +
            "id='" + getId() + "'" +
            ", title='" + getTitle() + "'" +
            ", from='" + getFrom() + "'" +
            ", to='" + getTo() + "'" +
            ", realated_to='" + getRealated_to() + "'" +
            ", contact_name='" + getContact_name() + "'" +
            ", host='" + getHost() + "'" +
            "}";
    }
}
