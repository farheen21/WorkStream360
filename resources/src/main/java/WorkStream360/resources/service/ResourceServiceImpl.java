package WorkStream360.resources.service;
import WorkStream360.resources.entity.Resource;
import WorkStream360.resources.entity.ResourceRole;
import WorkStream360.resources.modal.ResourceByName;
import WorkStream360.resources.modal.ResourceRequest;
import WorkStream360.resources.modal.ResourceResponse;
import WorkStream360.resources.repository.ResourceRepository;
import WorkStream360.resources.repository.ResourceRoleRepository;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.springframework.beans.BeanUtils.copyProperties;

@Service
@Log4j2
@AllArgsConstructor
public class ResourceServiceImpl implements ResourceService {

    @Autowired
    private final ResourceRepository resourceRepository;

    @Autowired
    private final ResourceRoleRepository resourceRoleRepository;
    @Override
    public long addResource(ResourceRequest resourceRequest) {
        log.info("Adding Resource...");
//        ResourceRole resourceRole = ResourceRole.fromString(resourceRequest.getResourceRole());

        ResourceRole resourceRole1 = resourceRoleRepository.findByResourceRole(resourceRequest.getResourceRole())
                .orElseThrow(() -> new IllegalArgumentException("Invalid resource role: " + resourceRequest.getResourceRole()));
        log.info("Got this from client as role: {}", resourceRole1);

//        String resourceRoleString = resourceRoleRepository.findByResourceRole(resourceRequest.getResourceRole())
//                .map(resourceRole -> resourceRole.getResourceRole())
//                .orElseThrow(() -> new IllegalArgumentException("Invalid resource role: " + resourceRequest.getResourceRole()));
//        log.info("Got this from client as role: {}", resourceRoleString);





        Resource resource = Resource.builder()
                .resourceFirstName(resourceRequest.getResourceFirstName())
                .resourceLastName(resourceRequest.getResourceLastName())
                .resourceEmail(resourceRequest.getResourceEmail())
                .resourceReportingManager(resourceRequest.getResourceReportingManager())
                .resource_Role(resourceRole1)
                .resourceLocation(resourceRequest.getResourceLocation())
                .resourceExperience(resourceRequest.getResourceExperience())
                .resourcePhoneNumber(resourceRequest.getResourcePhoneNumber())
                .resourceDateOfBirth(resourceRequest.getResourceDateOfBirth())
                .resourceJoiningDate(resourceRequest.getResourceJoiningDate())
                .build();
        resourceRepository.save(resource);
        log.info("this is new resource going to be create: {}", resource);
        log.info("Resource Created");
        return resource.getResourceId();
    }

    @Override
    public ResourceResponse getResourceById(long resourceId) {
        log.info("Getting the resource information for product id: {}" , resourceId);
        Resource resource = resourceRepository.findById(resourceId).orElseThrow();
        ResourceResponse resourceResponse = new ResourceResponse();
        copyProperties(resource , resourceResponse);
        return resourceResponse;
    }


    @Override
    public ResourceByName getResourceByName(String resourceFirstName, String resourceLastName) {
        Optional<Resource> optionalResource = resourceRepository.findByResourceFirstNameAndResourceLastName(resourceFirstName, resourceLastName);
        if (optionalResource.isPresent()) {
            Resource resource = optionalResource.get();
            ResourceRole resourceRole = resource.getResource_Role();
            String roleName = resourceRole != null ? resourceRole.getResourceRole() : null;
            ResourceByName resourceByName = new ResourceByName();
            resourceByName.setResourceName(resourceFirstName + " " + resourceLastName);
            resourceByName.setRoleName(roleName);
            return resourceByName;
        } else {
            return null;
        }
    }









    @Override
    public List<String> getAllProjectManagers() {
        Long projectManagerRoleId = 1L; // Assuming the role ID for "Project Manager" is 1
        List<Resource> projectManagers = resourceRepository.findByResourceByRoleId(projectManagerRoleId);

        List<String> projectManagerNames = new ArrayList<>();
        for (Resource manager : projectManagers) {
            String fullName = manager.getResourceFirstName() + " " + manager.getResourceLastName();
            projectManagerNames.add(fullName);
        }

        return projectManagerNames;
    }


}
