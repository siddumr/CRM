package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Contacts;
import com.mycompany.myapp.repository.ContactsRepository;
import com.mycompany.myapp.service.ContactsService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.ForwardedHeaderUtils;
import reactor.core.publisher.Mono;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.reactive.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Contacts}.
 */
@RestController
@RequestMapping("/api/contacts")
public class ContactsResource {

    private static final Logger log = LoggerFactory.getLogger(ContactsResource.class);

    private static final String ENTITY_NAME = "contacts";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ContactsService contactsService;

    private final ContactsRepository contactsRepository;

    public ContactsResource(ContactsService contactsService, ContactsRepository contactsRepository) {
        this.contactsService = contactsService;
        this.contactsRepository = contactsRepository;
    }

    /**
     * {@code POST  /contacts} : Create a new contacts.
     *
     * @param contacts the contacts to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new contacts, or with status {@code 400 (Bad Request)} if the contacts has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public Mono<ResponseEntity<Contacts>> createContacts(@Valid @RequestBody Contacts contacts) throws URISyntaxException {
        log.debug("REST request to save Contacts : {}", contacts);
        if (contacts.getId() != null) {
            throw new BadRequestAlertException("A new contacts cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return contactsService
            .save(contacts)
            .map(result -> {
                try {
                    return ResponseEntity.created(new URI("/api/contacts/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /contacts/:id} : Updates an existing contacts.
     *
     * @param id the id of the contacts to save.
     * @param contacts the contacts to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated contacts,
     * or with status {@code 400 (Bad Request)} if the contacts is not valid,
     * or with status {@code 500 (Internal Server Error)} if the contacts couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public Mono<ResponseEntity<Contacts>> updateContacts(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody Contacts contacts
    ) throws URISyntaxException {
        log.debug("REST request to update Contacts : {}, {}", id, contacts);
        if (contacts.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, contacts.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return contactsRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return contactsService
                    .update(contacts)
                    .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                    .map(
                        result ->
                            ResponseEntity.ok()
                                .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, result.getId()))
                                .body(result)
                    );
            });
    }

    /**
     * {@code PATCH  /contacts/:id} : Partial updates given fields of an existing contacts, field will ignore if it is null
     *
     * @param id the id of the contacts to save.
     * @param contacts the contacts to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated contacts,
     * or with status {@code 400 (Bad Request)} if the contacts is not valid,
     * or with status {@code 404 (Not Found)} if the contacts is not found,
     * or with status {@code 500 (Internal Server Error)} if the contacts couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<Contacts>> partialUpdateContacts(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody Contacts contacts
    ) throws URISyntaxException {
        log.debug("REST request to partial update Contacts partially : {}, {}", id, contacts);
        if (contacts.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, contacts.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return contactsRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<Contacts> result = contactsService.partialUpdate(contacts);

                return result
                    .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                    .map(
                        res ->
                            ResponseEntity.ok()
                                .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, res.getId()))
                                .body(res)
                    );
            });
    }

    /**
     * {@code GET  /contacts} : get all the contacts.
     *
     * @param pageable the pagination information.
     * @param request a {@link ServerHttpRequest} request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of contacts in body.
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<List<Contacts>>> getAllContacts(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        ServerHttpRequest request
    ) {
        log.debug("REST request to get a page of Contacts");
        return contactsService
            .countAll()
            .zipWith(contactsService.findAll(pageable).collectList())
            .map(
                countWithEntities ->
                    ResponseEntity.ok()
                        .headers(
                            PaginationUtil.generatePaginationHttpHeaders(
                                ForwardedHeaderUtils.adaptFromForwardedHeaders(request.getURI(), request.getHeaders()),
                                new PageImpl<>(countWithEntities.getT2(), pageable, countWithEntities.getT1())
                            )
                        )
                        .body(countWithEntities.getT2())
            );
    }

    /**
     * {@code GET  /contacts/:id} : get the "id" contacts.
     *
     * @param id the id of the contacts to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the contacts, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public Mono<ResponseEntity<Contacts>> getContacts(@PathVariable("id") String id) {
        log.debug("REST request to get Contacts : {}", id);
        Mono<Contacts> contacts = contactsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(contacts);
    }

    /**
     * {@code DELETE  /contacts/:id} : delete the "id" contacts.
     *
     * @param id the id of the contacts to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteContacts(@PathVariable("id") String id) {
        log.debug("REST request to delete Contacts : {}", id);
        return contactsService
            .delete(id)
            .then(
                Mono.just(
                    ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build()
                )
            );
    }
}
