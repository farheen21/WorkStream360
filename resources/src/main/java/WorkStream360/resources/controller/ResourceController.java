package WorkStream360.resources.controller;

import WorkStream360.resources.modal.ResourceRequest;
import WorkStream360.resources.modal.ResourceResponse;
import WorkStream360.resources.service.ResourceSerivce;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/resource")
public class ResourceController {

    @Autowired
    private ResourceSerivce resourceSerivce;

    // Create project in DB
    @PostMapping("/add-resource")
    public ResponseEntity<Long> addResource(@RequestBody ResourceRequest resourceRequest){
        long resourceId = resourceSerivce.addResource(resourceRequest);
        return new ResponseEntity<>( resourceId, HttpStatus.CREATED);
    }

    @GetMapping("/{resourceId}")
    public ResponseEntity<ResourceResponse> getResourceById(@PathVariable long resourceId){
        ResourceResponse resourceResponse = resourceSerivce.getResourceById(resourceId);
        return new ResponseEntity<>(resourceResponse , HttpStatus.OK);
    }

}
