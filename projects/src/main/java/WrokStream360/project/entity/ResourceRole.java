//package WorkStream360.resources.entity;
//import com.fasterxml.jackson.annotation.JsonCreator;
//import com.fasterxml.jackson.annotation.JsonValue;
//
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//
//public enum ResourceRole{
//
//    PROGRAM_MANAGER,
//    UI_DESIGNER,
//    SOFTWARE_ENGINEER,
//    SALESFORCE_DEV;
//
////    private final String roleName;
////
////    ResourceRole(String roleName) {
////        this.roleName = roleName;
////    }
////
////    @JsonValue
////    public String getRoleName() {
////        return roleName;
////    }
////
////    @JsonCreator
////    public static ResourceRole fromString(String roleName) {
////        for (ResourceRole role : ResourceRole.values()) {
////            if (role.getRoleName().equalsIgnoreCase(roleName)) {
////                return role;
////            }
////        }
////        throw new IllegalArgumentException("Invalid Resource Role: " + roleName);
////    }
//
//}
