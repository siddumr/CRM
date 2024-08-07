package com.mycompany.myapp.domain;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A Meeting.
 */
@Document(collection = "meeting")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Meeting implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull(message = "must not be null")
    @Field("title")
    private String title;

    @Field("from")
    private ZonedDateTime from;

    @Field("to")
    private ZonedDateTime to;

    @Field("realated_to")
    private String realated_to;

    @Field("contact_name")
    private String contact_name;

    @NotNull(message = "must not be null")
    @Field("host")
    private String host;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Meeting id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public Meeting title(String title) {
        this.setTitle(title);
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public ZonedDateTime getFrom() {
        return this.from;
    }

    public Meeting from(ZonedDateTime from) {
        this.setFrom(from);
        return this;
    }

    public void setFrom(ZonedDateTime from) {
        this.from = from;
    }

    public ZonedDateTime getTo() {
        return this.to;
    }

    public Meeting to(ZonedDateTime to) {
        this.setTo(to);
        return this;
    }

    public void setTo(ZonedDateTime to) {
        this.to = to;
    }

    public String getRealated_to() {
        return this.realated_to;
    }

    public Meeting realated_to(String realated_to) {
        this.setRealated_to(realated_to);
        return this;
    }

    public void setRealated_to(String realated_to) {
        this.realated_to = realated_to;
    }

    public String getContact_name() {
        return this.contact_name;
    }

    public Meeting contact_name(String contact_name) {
        this.setContact_name(contact_name);
        return this;
    }

    public void setContact_name(String contact_name) {
        this.contact_name = contact_name;
    }

    public String getHost() {
        return this.host;
    }

    public Meeting host(String host) {
        this.setHost(host);
        return this;
    }

    public void setHost(String host) {
        this.host = host;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Meeting)) {
            return false;
        }
        return getId() != null && getId().equals(((Meeting) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Meeting{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", from='" + getFrom() + "'" +
            ", to='" + getTo() + "'" +
            ", realated_to='" + getRealated_to() + "'" +
            ", contact_name='" + getContact_name() + "'" +
            ", host='" + getHost() + "'" +
            "}";
    }
}
