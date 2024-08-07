package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.repository.TaskRepository;
import com.mycompany.myapp.service.TaskService;
import com.mycompany.myapp.service.dto.TaskDTO;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Task}.
 */
@RestController
@RequestMapping("/api/tasks")
public class TaskResource {

    private static final Logger log = LoggerFactory.getLogger(TaskResource.class);

    private static final String ENTITY_NAME = "task";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TaskService taskService;

    private final TaskRepository taskRepository;

    public TaskResource(TaskService taskService, TaskRepository taskRepository) {
        this.taskService = taskService;
        this.taskRepository = taskRepository;
    }

    /**
     * {@code POST  /tasks} : Create a new task.
     *
     * @param taskDTO the taskDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new taskDTO, or with status {@code 400 (Bad Request)} if the task has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public Mono<ResponseEntity<TaskDTO>> createTask(@Valid @RequestBody TaskDTO taskDTO) throws URISyntaxException {
        log.debug("REST request to save Task : {}", taskDTO);
        if (taskDTO.getId() != null) {
            throw new BadRequestAlertException("A new task cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return taskService
            .save(taskDTO)
            .map(result -> {
                try {
                    return ResponseEntity.created(new URI("/api/tasks/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /tasks/:id} : Updates an existing task.
     *
     * @param id the id of the taskDTO to save.
     * @param taskDTO the taskDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated taskDTO,
     * or with status {@code 400 (Bad Request)} if the taskDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the taskDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public Mono<ResponseEntity<TaskDTO>> updateTask(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody TaskDTO taskDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Task : {}, {}", id, taskDTO);
        if (taskDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, taskDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return taskRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return taskService
                    .update(taskDTO)
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
     * {@code PATCH  /tasks/:id} : Partial updates given fields of an existing task, field will ignore if it is null
     *
     * @param id the id of the taskDTO to save.
     * @param taskDTO the taskDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated taskDTO,
     * or with status {@code 400 (Bad Request)} if the taskDTO is not valid,
     * or with status {@code 404 (Not Found)} if the taskDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the taskDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<TaskDTO>> partialUpdateTask(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody TaskDTO taskDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Task partially : {}, {}", id, taskDTO);
        if (taskDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, taskDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return taskRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<TaskDTO> result = taskService.partialUpdate(taskDTO);

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
     * {@code GET  /tasks} : get all the tasks.
     *
     * @param pageable the pagination information.
     * @param request a {@link ServerHttpRequest} request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tasks in body.
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<List<TaskDTO>>> getAllTasks(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        ServerHttpRequest request
    ) {
        log.debug("REST request to get a page of Tasks");
        return taskService
            .countAll()
            .zipWith(taskService.findAll(pageable).collectList())
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
     * {@code GET  /tasks/:id} : get the "id" task.
     *
     * @param id the id of the taskDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the taskDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public Mono<ResponseEntity<TaskDTO>> getTask(@PathVariable("id") String id) {
        log.debug("REST request to get Task : {}", id);
        Mono<TaskDTO> taskDTO = taskService.findOne(id);
        return ResponseUtil.wrapOrNotFound(taskDTO);
    }

    /**
     * {@code DELETE  /tasks/:id} : delete the "id" task.
     *
     * @param id the id of the taskDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteTask(@PathVariable("id") String id) {
        log.debug("REST request to delete Task : {}", id);
        return taskService
            .delete(id)
            .then(
                Mono.just(
                    ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build()
                )
            );
    }
}
