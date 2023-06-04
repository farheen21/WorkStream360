package WorkStream360.resources.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table( name = "roles_table")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResourceRole {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "role_id")
    private Long resourceRoleId;

    @Column (name = "role")
    private String resourceRole;

    @OneToMany(mappedBy = "resource_Role", cascade = CascadeType.ALL)
    private List<Resource> resources = new ArrayList<>();
}
