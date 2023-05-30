package WorkStream360.resources.service;

import WorkStream360.resources.modal.ResourceRequest;
import WorkStream360.resources.modal.ResourceResponse;

public interface ResourceSerivce {

    long addResource(ResourceRequest resourceRequest);

    ResourceResponse getResourceById(long resourceId);
}
