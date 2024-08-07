package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Contacts;
import com.mycompany.myapp.repository.ContactsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link com.mycompany.myapp.domain.Contacts}.
 */
@Service
public class ContactsService {

    private static final Logger log = LoggerFactory.getLogger(ContactsService.class);

    private final ContactsRepository contactsRepository;

    public ContactsService(ContactsRepository contactsRepository) {
        this.contactsRepository = contactsRepository;
    }

    /**
     * Save a contacts.
     *
     * @param contacts the entity to save.
     * @return the persisted entity.
     */
    public Mono<Contacts> save(Contacts contacts) {
        log.debug("Request to save Contacts : {}", contacts);
        return contactsRepository.save(contacts);
    }

    /**
     * Update a contacts.
     *
     * @param contacts the entity to save.
     * @return the persisted entity.
     */
    public Mono<Contacts> update(Contacts contacts) {
        log.debug("Request to update Contacts : {}", contacts);
        return contactsRepository.save(contacts);
    }

    /**
     * Partially update a contacts.
     *
     * @param contacts the entity to update partially.
     * @return the persisted entity.
     */
    public Mono<Contacts> partialUpdate(Contacts contacts) {
        log.debug("Request to partially update Contacts : {}", contacts);

        return contactsRepository
            .findById(contacts.getId())
            .map(existingContacts -> {
                if (contacts.getContact_Name() != null) {
                    existingContacts.setContact_Name(contacts.getContact_Name());
                }
                if (contacts.getAccount_Name() != null) {
                    existingContacts.setAccount_Name(contacts.getAccount_Name());
                }
                if (contacts.getEmail() != null) {
                    existingContacts.setEmail(contacts.getEmail());
                }
                if (contacts.getPhone() != null) {
                    existingContacts.setPhone(contacts.getPhone());
                }
                if (contacts.getContact_Owner() != null) {
                    existingContacts.setContact_Owner(contacts.getContact_Owner());
                }

                return existingContacts;
            })
            .flatMap(contactsRepository::save);
    }

    /**
     * Get all the contacts.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    public Flux<Contacts> findAll(Pageable pageable) {
        log.debug("Request to get all Contacts");
        return contactsRepository.findAllBy(pageable);
    }

    /**
     * Returns the number of contacts available.
     * @return the number of entities in the database.
     *
     */
    public Mono<Long> countAll() {
        return contactsRepository.count();
    }

    /**
     * Get one contacts by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Mono<Contacts> findOne(String id) {
        log.debug("Request to get Contacts : {}", id);
        return contactsRepository.findById(id);
    }

    /**
     * Delete the contacts by id.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    public Mono<Void> delete(String id) {
        log.debug("Request to delete Contacts : {}", id);
        return contactsRepository.deleteById(id);
    }
}
