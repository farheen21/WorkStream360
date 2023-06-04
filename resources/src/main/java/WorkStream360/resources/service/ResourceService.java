package WorkStream360.resources.service;

import WorkStream360.resources.entity.Resource;
import WorkStream360.resources.modal.ResourceByName;
import WorkStream360.resources.modal.ResourceRequest;
import WorkStream360.resources.modal.ResourceResponse;

import java.util.List;

public interface ResourceService {

    long addResource(ResourceRequest resourceRequest);

    ResourceResponse getResourceById(long resourceId);

    ResourceByName getResourceByName(String resourceFirstName , String resourceLastName);

//    List<String> getAllProjectManagers();

//    List<String> getAllProjectManagers();


    List<String> getAllProjectManagers();

    List<String> getAllEngagementLeaders();
}
