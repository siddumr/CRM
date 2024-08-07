package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.domain.ContactsAsserts.*;
import static com.mycompany.myapp.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Contacts;
import com.mycompany.myapp.repository.ContactsRepository;
import java.util.UUID;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.reactive.server.WebTestClient;

/**
 * Integration tests for the {@link ContactsResource} REST controller.
 */
@IntegrationTest
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class ContactsResourceIT {

    private static final String DEFAULT_CONTACT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_CONTACT_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_ACCOUNT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_ACCOUNT_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final Integer DEFAULT_PHONE = 1;
    private static final Integer UPDATED_PHONE = 2;

    private static final String DEFAULT_CONTACT_OWNER = "AAAAAAAAAA";
    private static final String UPDATED_CONTACT_OWNER = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/contacts";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private ContactsRepository contactsRepository;

    @Autowired
    private WebTestClient webTestClient;

    private Contacts contacts;

    private Contacts insertedContacts;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Contacts createEntity() {
        Contacts contacts = new Contacts()
            .contact_Name(DEFAULT_CONTACT_NAME)
            .account_Name(DEFAULT_ACCOUNT_NAME)
            .email(DEFAULT_EMAIL)
            .phone(DEFAULT_PHONE)
            .contact_Owner(DEFAULT_CONTACT_OWNER);
        return contacts;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Contacts createUpdatedEntity() {
        Contacts contacts = new Contacts()
            .contact_Name(UPDATED_CONTACT_NAME)
            .account_Name(UPDATED_ACCOUNT_NAME)
            .email(UPDATED_EMAIL)
            .phone(UPDATED_PHONE)
            .contact_Owner(UPDATED_CONTACT_OWNER);
        return contacts;
    }

    @BeforeEach
    public void initTest() {
        contacts = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedContacts != null) {
            contactsRepository.delete(insertedContacts).block();
            insertedContacts = null;
        }
    }

    @Test
    void createContacts() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Contacts
        var returnedContacts = webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(contacts))
            .exchange()
            .expectStatus()
            .isCreated()
            .expectBody(Contacts.class)
            .returnResult()
            .getResponseBody();

        // Validate the Contacts in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertContactsUpdatableFieldsEquals(returnedContacts, getPersistedContacts(returnedContacts));

        insertedContacts = returnedContacts;
    }

    @Test
    void createContactsWithExistingId() throws Exception {
        // Create the Contacts with an existing ID
        contacts.setId("existing_id");

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(contacts))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Contacts in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkContact_NameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        contacts.setContact_Name(null);

        // Create the Contacts, which fails.

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(contacts))
            .exchange()
            .expectStatus()
            .isBadRequest();

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkAccount_NameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        contacts.setAccount_Name(null);

        // Create the Contacts, which fails.

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(contacts))
            .exchange()
            .expectStatus()
            .isBadRequest();

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkEmailIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        contacts.setEmail(null);

        // Create the Contacts, which fails.

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(contacts))
            .exchange()
            .expectStatus()
            .isBadRequest();

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkPhoneIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        contacts.setPhone(null);

        // Create the Contacts, which fails.

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(contacts))
            .exchange()
            .expectStatus()
            .isBadRequest();

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllContacts() {
        // Initialize the database
        insertedContacts = contactsRepository.save(contacts).block();

        // Get all the contactsList
        webTestClient
            .get()
            .uri(ENTITY_API_URL + "?sort=id,desc")
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.[*].id")
            .value(hasItem(contacts.getId()))
            .jsonPath("$.[*].contact_Name")
            .value(hasItem(DEFAULT_CONTACT_NAME))
            .jsonPath("$.[*].account_Name")
            .value(hasItem(DEFAULT_ACCOUNT_NAME))
            .jsonPath("$.[*].email")
            .value(hasItem(DEFAULT_EMAIL))
            .jsonPath("$.[*].phone")
            .value(hasItem(DEFAULT_PHONE))
            .jsonPath("$.[*].contact_Owner")
            .value(hasItem(DEFAULT_CONTACT_OWNER));
    }

    @Test
    void getContacts() {
        // Initialize the database
        insertedContacts = contactsRepository.save(contacts).block();

        // Get the contacts
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, contacts.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(contacts.getId()))
            .jsonPath("$.contact_Name")
            .value(is(DEFAULT_CONTACT_NAME))
            .jsonPath("$.account_Name")
            .value(is(DEFAULT_ACCOUNT_NAME))
            .jsonPath("$.email")
            .value(is(DEFAULT_EMAIL))
            .jsonPath("$.phone")
            .value(is(DEFAULT_PHONE))
            .jsonPath("$.contact_Owner")
            .value(is(DEFAULT_CONTACT_OWNER));
    }

    @Test
    void getNonExistingContacts() {
        // Get the contacts
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_PROBLEM_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingContacts() throws Exception {
        // Initialize the database
        insertedContacts = contactsRepository.save(contacts).block();

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the contacts
        Contacts updatedContacts = contactsRepository.findById(contacts.getId()).block();
        updatedContacts
            .contact_Name(UPDATED_CONTACT_NAME)
            .account_Name(UPDATED_ACCOUNT_NAME)
            .email(UPDATED_EMAIL)
            .phone(UPDATED_PHONE)
            .contact_Owner(UPDATED_CONTACT_OWNER);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, updatedContacts.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(updatedContacts))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Contacts in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedContactsToMatchAllProperties(updatedContacts);
    }

    @Test
    void putNonExistingContacts() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        contacts.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, contacts.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(contacts))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Contacts in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchContacts() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        contacts.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, UUID.randomUUID().toString())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(contacts))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Contacts in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamContacts() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        contacts.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(contacts))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Contacts in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateContactsWithPatch() throws Exception {
        // Initialize the database
        insertedContacts = contactsRepository.save(contacts).block();

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the contacts using partial update
        Contacts partialUpdatedContacts = new Contacts();
        partialUpdatedContacts.setId(contacts.getId());

        partialUpdatedContacts
            .contact_Name(UPDATED_CONTACT_NAME)
            .account_Name(UPDATED_ACCOUNT_NAME)
            .email(UPDATED_EMAIL)
            .contact_Owner(UPDATED_CONTACT_OWNER);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedContacts.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(partialUpdatedContacts))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Contacts in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertContactsUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedContacts, contacts), getPersistedContacts(contacts));
    }

    @Test
    void fullUpdateContactsWithPatch() throws Exception {
        // Initialize the database
        insertedContacts = contactsRepository.save(contacts).block();

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the contacts using partial update
        Contacts partialUpdatedContacts = new Contacts();
        partialUpdatedContacts.setId(contacts.getId());

        partialUpdatedContacts
            .contact_Name(UPDATED_CONTACT_NAME)
            .account_Name(UPDATED_ACCOUNT_NAME)
            .email(UPDATED_EMAIL)
            .phone(UPDATED_PHONE)
            .contact_Owner(UPDATED_CONTACT_OWNER);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedContacts.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(partialUpdatedContacts))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Contacts in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertContactsUpdatableFieldsEquals(partialUpdatedContacts, getPersistedContacts(partialUpdatedContacts));
    }

    @Test
    void patchNonExistingContacts() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        contacts.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, contacts.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(contacts))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Contacts in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchContacts() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        contacts.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, UUID.randomUUID().toString())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(contacts))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Contacts in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamContacts() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        contacts.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(contacts))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Contacts in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteContacts() {
        // Initialize the database
        insertedContacts = contactsRepository.save(contacts).block();

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the contacts
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, contacts.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return contactsRepository.count().block();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected Contacts getPersistedContacts(Contacts contacts) {
        return contactsRepository.findById(contacts.getId()).block();
    }

    protected void assertPersistedContactsToMatchAllProperties(Contacts expectedContacts) {
        assertContactsAllPropertiesEquals(expectedContacts, getPersistedContacts(expectedContacts));
    }

    protected void assertPersistedContactsToMatchUpdatableProperties(Contacts expectedContacts) {
        assertContactsAllUpdatablePropertiesEquals(expectedContacts, getPersistedContacts(expectedContacts));
    }
}
