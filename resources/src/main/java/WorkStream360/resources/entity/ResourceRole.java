package WorkStream360.resources.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity(name = "RESOURCE_ROLE")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResourceRole {

//    @Id
//    @GeneratedValue(strategy = GenerationType.SEQUENCE)
//    private Long resourceRoleId;
//
//    @Column( name = "RESOURCE_ROLE_NAME")
//    private String resourceRole ;
//
//    @OneToMany(mappedBy = "resourceRole")
//    private List<Resource> resources;


    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "resource_role_id")
    private Long resourceRoleId;

    @Column(name = "resource_role_name")
    private String resourceRole;

    @OneToMany(mappedBy = "resource_Role")
    private List<Resource> resources;
}
