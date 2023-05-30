package WorkStream360.resources.service;
import WorkStream360.resources.entity.Resource;
import WorkStream360.resources.entity.ResourceRole;
import WorkStream360.resources.modal.ResourceRequest;
import WorkStream360.resources.modal.ResourceResponse;
import WorkStream360.resources.repository.ResourceRepository;
import WorkStream360.resources.repository.ResourceRoleRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static org.springframework.beans.BeanUtils.copyProperties;

@Service
@Log4j2
public class ResourceServiceImpl implements ResourceSerivce{

    @Autowired
    ResourceRepository resourceRepository;

    @Autowired
    ResourceRoleRepository resourceRoleRepository;
    @Override
    public long addResource(ResourceRequest resourceRequest) {
        log.info("Adding Resource...");
//        ResourceRole resourceRole = ResourceRole.fromString(resourceRequest.getResourceRole());

        ResourceRole resourceRole = resourceRoleRepository.findByResourceRole(resourceRequest.getResourceRole())
                .orElseThrow(() -> new IllegalArgumentException("Invalid resource role: " + resourceRequest.getResourceRole()));


        Resource resource = Resource.builder()
                .resourceFirstName(resourceRequest.getResourceFirstName())
                .resourceLastName(resourceRequest.getResourceLastName())
                .resourceEmail(resourceRequest.getResourceEmail())
                .resourceReportingManager(resourceRequest.getResourceReportingManager())
//                .resourceRole(resourceRequest.getResourceRole())
                .resource_Role(resourceRole)
                .resourceLocation(resourceRequest.getResourceLocation())
                .resourceExperience(resourceRequest.getResourceExperience())
                .resourcePhoneNumber(resourceRequest.getResourcePhoneNumber())
                .resourceDateOfBirth(resourceRequest.getResourceDateOfBirth())
                .resourceJoiningDate(resourceRequest.getResourceJoiningDate())
                .build();
        resourceRepository.save(resource);
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



}
