package com.mycompany.myapp.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.Lead} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class LeadDTO implements Serializable {

    private String id;

    @NotNull(message = "must not be null")
    private String first_name;

    @NotNull(message = "must not be null")
    private String last_name;

    @NotNull(message = "must not be null")
    private String company;

    @NotNull(message = "must not be null")
    private String title;

    @NotNull(message = "must not be null")
    private Integer phone;

    @NotNull(message = "must not be null")
    private String email;

    private String fax;

    @NotNull(message = "must not be null")
    private String website;

    @NotNull(message = "must not be null")
    private String industry;

    @NotNull(message = "must not be null")
    private Integer no_of_employees;

    @NotNull(message = "must not be null")
    private Integer annual_Revenue;

    private String street;

    private String state;

    private Integer zip_code;

    private String description;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getPhone() {
        return phone;
    }

    public void setPhone(Integer phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public Integer getNo_of_employees() {
        return no_of_employees;
    }

    public void setNo_of_employees(Integer no_of_employees) {
        this.no_of_employees = no_of_employees;
    }

    public Integer getAnnual_Revenue() {
        return annual_Revenue;
    }

    public void setAnnual_Revenue(Integer annual_Revenue) {
        this.annual_Revenue = annual_Revenue;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Integer getZip_code() {
        return zip_code;
    }

    public void setZip_code(Integer zip_code) {
        this.zip_code = zip_code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LeadDTO)) {
            return false;
        }

        LeadDTO leadDTO = (LeadDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, leadDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LeadDTO{" +
            "id='" + getId() + "'" +
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
