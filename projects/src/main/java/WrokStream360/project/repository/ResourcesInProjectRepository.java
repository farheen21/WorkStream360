package WrokStream360.project.repository;

import WrokStream360.project.entity.ResourceInProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResourcesInProjectRepository extends JpaRepository<ResourceInProject, Long> {
}
