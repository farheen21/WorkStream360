package WorkStream360.resources.controller;

import WorkStream360.resources.service.ResourceRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("role")
public class ResourceRoleController {

    @Autowired
    ResourceRoleService resourceRoleService;

    @PostMapping("/add-resource-roles")
    public ResponseEntity<Long> createResourceRole(@RequestBody String resourceRoleName) {
        long resourceRoleId = resourceRoleService.createResourceRole(resourceRoleName);
        return new ResponseEntity<>(resourceRoleId, HttpStatus.CREATED);
    }
}
