package com.mycompany.myapp.domain;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A Contacts.
 */
@Document(collection = "contacts")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Contacts implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull(message = "must not be null")
    @Field("contact_name")
    private String contact_Name;

    @NotNull(message = "must not be null")
    @Field("account_name")
    private String account_Name;

    @NotNull(message = "must not be null")
    @Field("email")
    private String email;

    @NotNull(message = "must not be null")
    @Field("phone")
    private Integer phone;

    @Field("contact_owner")
    private String contact_Owner;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Contacts id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getContact_Name() {
        return this.contact_Name;
    }

    public Contacts contact_Name(String contact_Name) {
        this.setContact_Name(contact_Name);
        return this;
    }

    public void setContact_Name(String contact_Name) {
        this.contact_Name = contact_Name;
    }

    public String getAccount_Name() {
        return this.account_Name;
    }

    public Contacts account_Name(String account_Name) {
        this.setAccount_Name(account_Name);
        return this;
    }

    public void setAccount_Name(String account_Name) {
        this.account_Name = account_Name;
    }

    public String getEmail() {
        return this.email;
    }

    public Contacts email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getPhone() {
        return this.phone;
    }

    public Contacts phone(Integer phone) {
        this.setPhone(phone);
        return this;
    }

    public void setPhone(Integer phone) {
        this.phone = phone;
    }

    public String getContact_Owner() {
        return this.contact_Owner;
    }

    public Contacts contact_Owner(String contact_Owner) {
        this.setContact_Owner(contact_Owner);
        return this;
    }

    public void setContact_Owner(String contact_Owner) {
        this.contact_Owner = contact_Owner;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Contacts)) {
            return false;
        }
        return getId() != null && getId().equals(((Contacts) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Contacts{" +
            "id=" + getId() +
            ", contact_Name='" + getContact_Name() + "'" +
            ", account_Name='" + getAccount_Name() + "'" +
            ", email='" + getEmail() + "'" +
            ", phone=" + getPhone() +
            ", contact_Owner='" + getContact_Owner() + "'" +
            "}";
    }
}
