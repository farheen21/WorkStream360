package WrokStream360.project.repository;

import WrokStream360.project.entity.ResourceInProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ResourcesInProjectRepository extends JpaRepository<ResourceInProject, Long> {
    @Modifying
    @Query("DELETE FROM ResourceInProject rip WHERE rip.project.projectId = :projectId")
    void deleteByProjectId(@Param("projectId") long projectId);
}
