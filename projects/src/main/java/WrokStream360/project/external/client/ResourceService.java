package WrokStream360.project.external.client;
import WorkStream360.SharedLibrary.ApiResponse.ResourceByName;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "RESOURCE-SERVICE")
public interface ResourceService {

    @GetMapping("/resource/search")
     ResponseEntity<ResourceByName> searchResourceByFullName(@RequestParam("firstName") String resourceFirstName, @RequestParam("lastName") String resourceLastName);
}
