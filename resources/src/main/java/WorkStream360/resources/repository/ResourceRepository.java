package WorkStream360.resources.repository;

import WorkStream360.resources.entity.Resource;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResourceRepository extends JpaRepository<Resource , Long> {
}
