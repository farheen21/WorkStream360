package WorkStream360.resources.repository;

import WorkStream360.resources.entity.Resource;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ResourceRepository extends JpaRepository<Resource , Long> {
//    Optional<Resource> findByResourceFirstName(String resourceFirstName);
    Optional<Resource> findByResourceFirstNameAndResourceLastName(String resourceFirstName, String resourceLastName);

//    List<Resource> findAllByResource_Role(String roleName);
//    List<Resource> findAllByResource_Role_ResourceRole(String resourceRole);

//    List<Resource> findByResource_Role_ResourceRoleId(Long projectManagerRoleId);
//    List<Resource> findByResource_Role_ResourceRoleId(Long roleId);

//    List<Resource> findByResource_Role_ResourceRoleId(Long projectManagerRoleId);

    List<Resource> findByResourceByRoleId(Long projectManagerRoleId);



}
