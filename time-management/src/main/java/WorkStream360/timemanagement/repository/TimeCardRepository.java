package WorkStream360.timemanagement.repository;

import WorkStream360.timemanagement.entity.TimeCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimeCardRepository extends JpaRepository<TimeCard , Long> {

    List<TimeCard> findByProjectId(Long projectId);
}
