package WorkStream360.resources.repository;

import WorkStream360.resources.entity.ResourceRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResourceRoleRepository extends JpaRepository<ResourceRole , Long> {
//    Optional<ResourceRole> findByResourceRole(ResourceRole resourceRole);
     Optional<ResourceRole> findByResourceRole(String resourceRole);


}


//public interface ResourceRoleRepository extends JpaRepository<ResourceRole, Long> {
//    Optional<ResourceRole> findByResourceRole(String resourceRole);
//}
