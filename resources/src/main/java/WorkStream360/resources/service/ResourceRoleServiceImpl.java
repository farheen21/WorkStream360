package WorkStream360.resources.service;


import WorkStream360.resources.entity.ResourceRole;
import WorkStream360.resources.repository.ResourceRoleRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Log4j2
public class ResourceRoleServiceImpl implements ResourceRoleService {

    @Autowired
    ResourceRoleRepository resourceRoleRepository;

    @Override
//    public long createResourceRole(String resourceRoleName) {
//        return 0;
//    }

    public long createResourceRole(String resourceRoleName) {
        log.info("Resource Role Creating");
        ResourceRole resourceRole = new ResourceRole();
        resourceRole.setResourceRole(resourceRoleName);

        resourceRoleRepository.save(resourceRole);
        log.info("Resource Role Created");

        return resourceRole.getResourceRoleId();
    }

}
