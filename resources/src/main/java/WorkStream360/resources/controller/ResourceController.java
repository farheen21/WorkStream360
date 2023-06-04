package WorkStream360.resources.controller;

import WorkStream360.resources.modal.ResourceByName;
import WorkStream360.resources.modal.ResourceRequest;
import WorkStream360.resources.modal.ResourceResponse;
import WorkStream360.resources.service.ResourceService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/resource")
@AllArgsConstructor
public class ResourceController {

    @Autowired
    private final ResourceService resourceService;

    // Create project in DB
    @PostMapping("/add-resource")
    public ResponseEntity<Long> addResource(  @RequestBody ResourceRequest resourceRequest){
        long resourceId = resourceService.addResource(resourceRequest);
        return new ResponseEntity<>( resourceId, HttpStatus.CREATED);
    }

    @GetMapping("/{resourceId}")
    public ResponseEntity<ResourceResponse> getResourceById(@PathVariable long resourceId){
        ResourceResponse resourceResponse = resourceService.getResourceById(resourceId);
        return new ResponseEntity<>(resourceResponse , HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<ResourceByName> searchResourceByFullName(@RequestParam("firstName") String resourceFirstName, @RequestParam("lastName") String resourceLastName) {
        ResourceByName resourceByName = resourceService.getResourceByName(resourceFirstName, resourceLastName);
        if (resourceByName != null) {
            return ResponseEntity.ok(resourceByName);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/projectManagers")
    public List<String> getAllProjectManagers() {
        return resourceService.getAllProjectManagers();
    }
}
