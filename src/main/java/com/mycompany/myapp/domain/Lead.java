package com.mycompany.myapp.domain;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A Lead.
 */
@Document(collection = "lead")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Lead implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull(message = "must not be null")
    @Field("first_name")
    private String first_name;

    @NotNull(message = "must not be null")
    @Field("last_name")
    private String last_name;

    @NotNull(message = "must not be null")
    @Field("company")
    private String company;

    @NotNull(message = "must not be null")
    @Field("title")
    private String title;

    @NotNull(message = "must not be null")
    @Field("phone")
    private Integer phone;

    @NotNull(message = "must not be null")
    @Field("email")
    private String email;

    @Field("fax")
    private String fax;

    @NotNull(message = "must not be null")
    @Field("website")
    private String website;

    @NotNull(message = "must not be null")
    @Field("industry")
    private String industry;

    @NotNull(message = "must not be null")
    @Field("no_of_employees")
    private Integer no_of_employees;

    @NotNull(message = "must not be null")
    @Field("annual_revenue")
    private Integer annual_Revenue;

    @Field("street")
    private String street;

    @Field("state")
    private String state;

    @Field("zip_code")
    private Integer zip_code;

    @Field("description")
    private String description;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Lead id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirst_name() {
        return this.first_name;
    }

    public Lead first_name(String first_name) {
        this.setFirst_name(first_name);
        return this;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return this.last_name;
    }

    public Lead last_name(String last_name) {
        this.setLast_name(last_name);
        return this;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getCompany() {
        return this.company;
    }

    public Lead company(String company) {
        this.setCompany(company);
        return this;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getTitle() {
        return this.title;
    }

    public Lead title(String title) {
        this.setTitle(title);
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getPhone() {
        return this.phone;
    }

    public Lead phone(Integer phone) {
        this.setPhone(phone);
        return this;
    }

    public void setPhone(Integer phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return this.email;
    }

    public Lead email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFax() {
        return this.fax;
    }

    public Lead fax(String fax) {
        this.setFax(fax);
        return this;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getWebsite() {
        return this.website;
    }

    public Lead website(String website) {
        this.setWebsite(website);
        return this;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getIndustry() {
        return this.industry;
    }

    public Lead industry(String industry) {
        this.setIndustry(industry);
        return this;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public Integer getNo_of_employees() {
        return this.no_of_employees;
    }

    public Lead no_of_employees(Integer no_of_employees) {
        this.setNo_of_employees(no_of_employees);
        return this;
    }

    public void setNo_of_employees(Integer no_of_employees) {
        this.no_of_employees = no_of_employees;
    }

    public Integer getAnnual_Revenue() {
        return this.annual_Revenue;
    }

    public Lead annual_Revenue(Integer annual_Revenue) {
        this.setAnnual_Revenue(annual_Revenue);
        return this;
    }

    public void setAnnual_Revenue(Integer annual_Revenue) {
        this.annual_Revenue = annual_Revenue;
    }

    public String getStreet() {
        return this.street;
    }

    public Lead street(String street) {
        this.setStreet(street);
        return this;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getState() {
        return this.state;
    }

    public Lead state(String state) {
        this.setState(state);
        return this;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Integer getZip_code() {
        return this.zip_code;
    }

    public Lead zip_code(Integer zip_code) {
        this.setZip_code(zip_code);
        return this;
    }

    public void setZip_code(Integer zip_code) {
        this.zip_code = zip_code;
    }

    public String getDescription() {
        return this.description;
    }

    public Lead description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Lead)) {
            return false;
        }
        return getId() != null && getId().equals(((Lead) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Lead{" +
            "id=" + getId() +
            ", first_name='" + getFirst_name() + "'" +
            ", last_name='" + getLast_name() + "'" +
            ", company='" + getCompany() + "'" +
            ", title='" + getTitle() + "'" +
            ", phone=" + getPhone() +
            ", email='" + getEmail() + "'" +
            ", fax='" + getFax() + "'" +
            ", website='" + getWebsite() + "'" +
            ", industry='" + getIndustry() + "'" +
            ", no_of_employees=" + getNo_of_employees() +
            ", annual_Revenue=" + getAnnual_Revenue() +
            ", street='" + getStreet() + "'" +
            ", state='" + getState() + "'" +
            ", zip_code=" + getZip_code() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
